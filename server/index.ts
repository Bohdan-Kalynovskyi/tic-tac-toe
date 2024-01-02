import console from 'console';
import compression from 'compression'; // compresses requests
import cors from 'cors';
import errorHandler from 'errorhandler';
import express from 'express';
import http from 'http';
import { onShutdown } from 'node-graceful-shutdown';
import { WebSocket, WebSocketServer } from 'ws';

import { PORT } from './config/config';
import { registerEndpoints } from './registerEndpoints';
import { allPlayers, chosenPlayers, currentPlayerRef, setNextPlayer, winSizeRef } from './endpoints/data';
import chalk from 'chalk';
import { IPlayer } from '../client/src/types/data.type';

export const app = express();

app.use(cors());
app.use(errorHandler()); // what is it doing?
app.use(compression());
app.use(express.static('client/build'));
app.use(express.json());

const server = http.createServer(app);

server.listen(PORT, () => console.log(`🚀 Server at port ${PORT}`));

registerEndpoints();

/////////////////////////////////////////////////////

const ws = new WebSocketServer({ port: 8001 });
const allConnections: WebSocket[] = [];

const broadcast = (message: string) => allConnections.forEach(_ws => _ws.send(message));
// const broadcastExcept = (message: string, exception: WebSocket) =>
//   allConnections.filter(w => w !== exception).forEach(_ws => _ws.send(message));

ws.on('connection', _ws => {
  allConnections.push(_ws);
  console.log('newConnection', allConnections.length);

  let thisPlayer: IPlayer | null = null;

  setTimeout(
    () => {
      _ws.send(
        JSON.stringify({
          action: 'chosen',
          data: { currentPlayer: currentPlayerRef.current, chosenPlayers },
        })
      );
      _ws.send(JSON.stringify({ action: 'resize', data: winSizeRef.current }));
    }, // time to re-render App and Game
    250
  );

  _ws.on('error', e => console.error(e));

  _ws.on('message', message => {
    try {
      const { action, data }: { action: string; data: any } = JSON.parse(message.toString());

      switch (action) {
        case 'choose':
          {
            const player = parseInt(data as string);
            if (isNaN(player) || player < 0 || player >= allPlayers.length) {
              throw new Error('player index out of range or invalid');
            }
            if (chosenPlayers.includes(player)) {
              throw new Error('this player was already chosen');
            }
            chosenPlayers.push(player);
            thisPlayer = player;
            if (currentPlayerRef.current === null) {
              currentPlayerRef.current = player;
            }
            broadcast(
              JSON.stringify({
                action: 'chosen',
                data: { currentPlayer: currentPlayerRef.current, chosenPlayers },
              })
            );
          }
          break;

        case 'resize':
          {
            const diff = parseInt(data as string);
            const planned = winSizeRef.current + diff;
            if ((diff !== -1 && diff !== 1) || planned < 3 || planned > 5) {
              throw new Error('wrong diff');
            }
            winSizeRef.current = planned;
            broadcast(JSON.stringify({ action: 'resize', data: winSizeRef.current }));
          }
          break;

        case 'step':
          {
            const currPlayer = currentPlayerRef.current;
            const { x, y, player }: { x: number; y: number; player: number } = data;
            if (player !== currPlayer || player !== thisPlayer) {
              throw new Error('wrong player');
            }
            setNextPlayer();
            broadcast(
              JSON.stringify({
                action: 'step',
                data: { x, y, nextPlayer: currentPlayerRef.current, playerJustPlayed: currPlayer },
              })
            );
          }
          break;

        case 'reset':
          currentPlayerRef.current = null;
          chosenPlayers.splice(0, chosenPlayers.length);
          thisPlayer = null;
          broadcast(JSON.stringify({ action: 'reset' }));
          break;
      }
    } catch (e) {
      const err = e as Error;
      console.error(chalk.red(err.message, err.cause));
      _ws.send(JSON.stringify({ action: 'error', data: err.message }));
    }

    onShutdown(() => broadcast(JSON.stringify({ action: 'server_restart' })));
  });
});

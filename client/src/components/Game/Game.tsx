import style from './Game.module.scss';

import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { IGrid, IPlayer, WinLine } from '../../types/data.type';
import { getEmptyGrid, getVictory } from './util';
import { Grid } from '../Grid/Grid';
import { CurrentPlayer } from '../CurrentPlayer/CurrentPlayer';
import { PlayerWon } from '../PlayerWon/PlayerWon';
import { ChoosePlayer } from '../ChoosePlayer/ChoosePlayer';
import { Profile } from '../Profile/Profile';
import { http } from '../../util/apiServiceRequest';
import { API_URL } from '../../constants/apiEndpoints';

type IProps = {
  size: number;
  ws: WebSocket;
};

export const Game: React.FC<IProps> = ({ size, ws }: IProps) => {
  const [players, setPlayers] = useState<IPlayer[] | null>(null);
  const [grid, setGrid] = useState<IGrid>(getEmptyGrid(size));
  const [winSize, setWinSize] = useState<number | null>(null);
  const [chosenPlayers, setChosenPlayers] = useState<IPlayer[]>([]);
  const [chosenPlayer, setChosenPlayer] = useState<IPlayer | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState<IPlayer | null>(null);
  const [winLine, setWinLine] = useState<WinLine | null>(null);

  const yourTurn = currentPlayer === chosenPlayer;

  useEffect(() => {
    http
      .get(API_URL.init)
      .then(({ chosen, allPlayers, winLength }) => {
        const { currentPlayer: _currentPlayer, chosenPlayers: _chosenPlayers } = chosen;
        if (currentPlayer !== _currentPlayer) {
          setCurrentPlayer(_currentPlayer);
        }
        setChosenPlayers(_chosenPlayers);
        setPlayers(allPlayers);
        setWinSize(winLength);
      })
      .catch(e => toast.error(e));
  }, []);

  const onChoosePlayer = useCallback(
    (player: IPlayer) => {
      setChosenPlayer(player);
      ws.send(JSON.stringify({ action: 'choose', data: player }));
    },
    [ws]
  );

  useEffect(() => {
    ws.onmessage = message => {
      const { action, data } = JSON.parse(message.data);

      switch (action) {
        case 'resize':
          setWinSize(parseInt(data));
          break;

        case 'chosen':
          const { currentPlayer: _currentPlayer, chosenPlayers: _chosenPlayers } = data;
          if (currentPlayer !== _currentPlayer) {
            setCurrentPlayer(_currentPlayer);
          }
          setChosenPlayers(_chosenPlayers);
          break;

        case 'step':
          const { x, y, nextPlayer, playerJustPlayed } = data;
          grid[y][x] = playerJustPlayed;
          setGrid(grid);

          const victory = getVictory(grid, playerJustPlayed, size, winSize!);
          if (victory) {
            setWinLine(victory);
          } else {
            setCurrentPlayer(nextPlayer);
          }
          break;

        // eslint-ignore-next-line no-fallthrough
        // @ts-ignore
        case 'server_restart':
          toast.error('server restarted');
        case 'reset':
          setGrid(getEmptyGrid(size));
          setChosenPlayers([]);
          setCurrentPlayer(null);
          setChosenPlayer(null);
          setWinLine(null);
          break;

        case 'error':
          toast.error(data);
          break;
      }
    };
  }, [currentPlayer, grid, size, winSize, ws]);

  const onChangeSize = useCallback(
    (diff: number) => {
      ws.send(JSON.stringify({ action: 'resize', data: diff }));
    },
    [ws]
  );

  const onGridClick = useCallback(
    (x: number, y: number) => {
      ws.send(JSON.stringify({ action: 'step', data: { x, y, player: chosenPlayer } }));
    },
    [ws, chosenPlayer]
  );

  const onReset = useCallback(() => {
    ws.send(JSON.stringify({ action: 'reset' }));
  }, [ws]);

  return (
    players && (
      <div className={style.game}>
        {chosenPlayer === null ? (
          <ChoosePlayer
            winSize={winSize}
            players={players}
            chosenPlayersIndexes={chosenPlayers}
            onChoose={onChoosePlayer}
            onChangeSize={onChangeSize}
          />
        ) : (
          currentPlayer !== null && (
            <>
              <Profile isActive={yourTurn} chosenPlayer={chosenPlayer} onReset={onReset} />
              <Grid
                yourTurn={yourTurn}
                playersCount={chosenPlayers.length}
                grid={grid}
                winLine={winLine}
                onClick={onGridClick}
              />
              {winLine ? (
                <PlayerWon player={currentPlayer} />
              ) : (
                <CurrentPlayer isActive={yourTurn} winSize={winSize!} player={currentPlayer} />
              )}
            </>
          )
        )}
      </div>
    )
  );
};

import 'react-toastify/dist/ReactToastify.css';
import style from './App.module.scss';

import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

import { TOAST_CONFIG } from '../constants/toastConfig';
import { Game } from './Game/Game';
import { IPlayer } from '../types/data.type';
import { http } from '../util/apiServiceRequest';
import { API_URL } from '../constants/apiEndpoints';

export const App: React.FC = () => {
  const [players, setPlayers] = useState<IPlayer[] | null>(null);
  const [ws, setWs] = useState<WebSocket | null>(null);

  const connectSocket = () => {
    const l = window.location;
    const ws = new WebSocket(`ws://${l.hostname}:8001`);

    ws.onerror = err => toast.error(err.type); // consider reconnect

    const listener = (message: MessageEvent) => {
      const { action } = JSON.parse(message.data);
      if (action === 'server_restart') {
        ws.removeEventListener('message', listener);
        ws.close();
        setTimeout(connectSocket, 2000);
      }
    };
    ws.addEventListener('message', listener);
    setWs(ws);
  };

  useEffect(() => {
    http
      .get(API_URL.allPlayers)
      .then(setPlayers)
      .catch(e => toast.error(e));

    connectSocket();
  }, []);

  return (
    <>
      <div className={style.app}>{players && ws && <Game players={players} size={9} ws={ws} />}</div>
      <ToastContainer {...TOAST_CONFIG} />
    </>
  );
};

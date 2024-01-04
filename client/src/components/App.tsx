import 'react-toastify/dist/ReactToastify.css';
import style from './App.module.scss';

import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

import { TOAST_CONFIG } from '../constants/toastConfig';
import { Game } from './Game/Game';

export const App: React.FC = () => {
  const [ws, setWs] = useState<WebSocket | null>(null);

  const connectSocket = () => {
    const ws = new WebSocket(`ws://${window.location.hostname}:8001`);

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

  useEffect(connectSocket, []);

  return (
    <>
      <div className={style.app}>{ws && <Game size={9} ws={ws} />}</div>
      <ToastContainer {...TOAST_CONFIG} />
    </>
  );
};

import style from './CurrentPlayer.module.scss';

import React, { FC } from 'react';
import c from 'classnames';

import { IPlayer } from '../../types/data.type';
import { Cell } from '../Cell/Cell';

type IProps = {
  isActive: boolean;
  winSize: number;
  player: IPlayer;
};

export const CurrentPlayer: FC<IProps> = ({ isActive, winSize, player }: IProps) => {
  const className = c(style.currentPlayer, { [style.active]: isActive });
  return (
    <div className={className}>
      {isActive ? <b>Your turn!</b> : <>Current player:</>}
      <br />
      <br />
      <br />
      <Cell player={player} />
      <br />
      <br />
      <br />
      <small style={{ color: '#777', textShadow: '0 0 1px rgba(255,255,255,.7)' }}>
        Win length: <big>{winSize}</big>
      </small>
    </div>
  );
};

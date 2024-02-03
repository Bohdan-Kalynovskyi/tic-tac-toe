import style from './CurrentPlayer.module.scss';

import React, { FC } from 'react';
import c from 'classnames';

import { IPlayer } from '../../types/data.type';
import { Cell } from '../Cell/Cell';

type IProps = {
  isActive: boolean;
  winSize: number;
  isWaiting: boolean;
  player: IPlayer;
};

export const CurrentPlayer: FC<IProps> = ({ isActive, isWaiting, winSize, player }: IProps) => {
  const className = c(style.currentPlayer, { [style.active]: isActive });
  return (
    <div className={className}>
      {isActive ? (
        isWaiting ? (
          <div className={style.wait4Others}>Waiting for others to join</div>
        ) : (
          <b>Your turn!</b>
        )
      ) : (
        <>Current player:</>
      )}
      {!isWaiting && (
        <>
          <br />
          <br />
          <br />
          <Cell player={player} />
          <br />
          <br />
        </>
      )}
      <small style={{ color: '#777', textShadow: '0.5px 0.5px 1px white' }}>
        <small>Length to win:</small> <big>{winSize}</big>
      </small>
    </div>
  );
};

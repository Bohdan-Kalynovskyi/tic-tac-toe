import style from './CurrentPlayer.module.scss';

import React, { FC } from 'react';
import c from 'classnames';

import { IPlayer } from '../../types/data.type';
import { Cell } from '../Cell/Cell';

type IProps = {
  isActive: boolean;
  player: IPlayer;
};

export const CurrentPlayer: FC<IProps> = ({ isActive, player }: IProps) => {
  const className = c(style.currentPlayer, { [style.active]: isActive });
  return (
    <div className={className}>
      {isActive ? <b>Your turn!</b> : <>Current player:</>}
      <br />
      <br />
      <br />
      <Cell player={player} />
    </div>
  );
};

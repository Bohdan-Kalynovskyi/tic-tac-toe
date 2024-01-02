import style from './PlayerWon.module.scss';

import React, { FC } from 'react';
import { IPlayer } from '../../types/data.type';
import { Cell } from '../Cell/Cell';

type IProps = {
  player: IPlayer;
};

export const PlayerWon: FC<IProps> = ({ player }: IProps) => {
  return (
    <div className={style.currentPlayer}>
      <Cell player={player} />
      <br />
      <br />
      Won!
    </div>
  );
};

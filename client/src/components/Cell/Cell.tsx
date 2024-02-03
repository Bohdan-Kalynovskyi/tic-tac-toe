import style from './Cell.module.scss';

import React, { FC } from 'react';
import { IPlayer, NO_PLAYER } from '../../types/data.type';

type IProps = {
  player: IPlayer | typeof NO_PLAYER;
  onClick?: () => void;
};

export const Cell: FC<IProps> = ({ player, onClick }: IProps) => {
  switch (player) {
    case IPlayer.X:
      return <div style={{ lineHeight: '41px' }}>X</div>;
    case IPlayer.Circle:
      return <span>O</span>;
    case IPlayer.Cat:
      return <span>🐱</span>;
    case IPlayer.Dog:
      return <span>🐶</span>;
    case IPlayer.Flower:
      return <span>🌸</span>;
    case IPlayer.Whale:
      return <span>🐳</span>;
    default:
      return (
        <div className={onClick ? style.clickable : undefined} style={{ lineHeight: '41px' }} onClick={onClick}>
           
        </div>
      );
  }
};

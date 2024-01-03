import style from './Profile.module.scss';

import React, { FC } from 'react';
import c from 'classnames';
import { Cell } from '../Cell/Cell';
import { IPlayer } from '../../types/data.type';
import { Button } from 'antd';

type IProps = {
  isActive: boolean;
  chosenPlayer: IPlayer;
  onReset: () => void;
};

export const Profile: FC<IProps> = ({ isActive, chosenPlayer, onReset }: IProps) => {
  const className = c(style.profile, { [style.active]: isActive });
  return (
    <div className={className}>
      You:
      <Cell player={chosenPlayer} />
      <Button type="primary" style={{ marginLeft: 6 }} onClick={onReset}>
        Reset
      </Button>
    </div>
  );
};

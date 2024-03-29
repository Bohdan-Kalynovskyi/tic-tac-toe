import style from './ChoosePlayer.module.scss';

import React from 'react';
import { IPlayer, PlayerSymbols } from '../../types/data.type';
import { Button, Radio, RadioChangeEvent } from 'antd';

type IProps = {
  winSize: number | null;
  players: IPlayer[];
  chosenPlayersIndexes: number[];
  onChoose: (x: IPlayer) => void;
  onChangeSize: (diff: 1 | -1) => void;
};

export const ChoosePlayer: React.FC<IProps> = ({
  winSize,
  players,
  chosenPlayersIndexes,
  onChoose,
  onChangeSize,
}: IProps) => {
  const onChange = ({ target }: RadioChangeEvent) => onChoose(target.value);
  const fontSize = window.innerWidth > 330 ? 35 : 32;

  return (
    <div className={style.modal}>
      <h1 style={{ margin: 30 }}>Choose your fighter</h1>
      <Radio.Group
        buttonStyle="solid"
        optionType="button"
        style={{ marginTop: 172, transform: 'rotate(90deg)' }}
        onChange={onChange}
      >
        {players.map(player => (
          <Radio
            className={style.hoverButton}
            disabled={chosenPlayersIndexes.includes(player)}
            key={player}
            value={player}
          >
            <div style={{ fontSize, transform: 'rotate(-90deg)' }}>{PlayerSymbols[player]}</div>
          </Radio>
        ))}
      </Radio.Group>
      <Button className={style.less} onClick={() => onChangeSize(-1)} disabled={winSize === null || winSize <= 3}>
        -
      </Button>
      <Button className={style.more} onClick={() => onChangeSize(1)} disabled={winSize === null || winSize >= 5}>
        +
      </Button>
      <div className={style.explain}>
        ← less
        <b className={style.playersCount}>
          Win length: <big style={{ display: 'inline-block', paddingLeft: 1 }}>{winSize}</big>
        </b>
        more →
      </div>
    </div>
  );
};

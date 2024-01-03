import style from './PlayerWon.module.scss';

import React, { FC, useEffect } from 'react';
import { IPlayer } from '../../types/data.type';
import { Cell } from '../Cell/Cell';

type IProps = {
  player: IPlayer;
};

export const PlayerWon: FC<IProps> = ({ player }: IProps) => {
  useEffect(() => {
    // https://codepen.io/daybrush/pen/zWMeJW
    const customTimingFunction = [0.48, 0.01, 0.25, 1];
    // @ts-ignore
    const scene1 = new Scene(
      {
        '#sun': {
          0: { 'border-width': '100px', transform: 'scale(0, 0)' },
          1: { 'border-width': '0px', transform: 'scale(1, 1)' },
        },
        '#sun2': {
          0: { transform: 'scale(0, 0)', 'border-width': '100px' },
          0.9: { transform: 'scale(0.9, 0.9)', 'border-width': '0px' },
        },
      },
      {
        easing: customTimingFunction,
        selector: true,
        playSpeed: 1,
      }
    );

    for (let i = 1; i <= 8; ++i) {
      scene1
        .newItem(`.sun_afterimage:nth-child(${i})`, {
          easing: customTimingFunction,
          selector: true,
        })
        .set({
          0: {
            transform: { rotate: i * 45 + 'deg', translate: '40px, 0px', scale: '0,1' },
            width: '120px',
          },
          1.8: { transform: { translate: '140px, 0px', scale: '1,1' }, width: '0px' },
        });
    }
    scene1.setTime(0).play();
  }, []);

  return (
    <div className={style.won}>
      <Cell player={player} />
      <br />
      <br />
      <big>Won!</big>
      <div className="scene1">
        <div id="sun" className="sun"></div>
        <div id="sun2" className="sun"></div>
        <div className="sun_afterimages">
          <div className="sun_afterimage"></div>
          <div className="sun_afterimage"></div>
          <div className="sun_afterimage"></div>
          <div className="sun_afterimage"></div>
          <div className="sun_afterimage"></div>
          <div className="sun_afterimage"></div>
          <div className="sun_afterimage"></div>
          <div className="sun_afterimage"></div>
        </div>
      </div>
    </div>
  );
};

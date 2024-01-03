import style from './Grid.module.scss';

import React, { FC } from 'react';
import c from 'classnames';

import { IGrid, WinLine } from '../../types/data.type';
import { Cell } from '../Cell/Cell';

const fontSize = 32;
const cellSize = 36;
const clockSize = 190;

type IProps = {
  yourTurn: boolean;
  playersCount: number;
  grid: IGrid;
  winLine: WinLine | null;
  onClick: (x: number, y: number) => void;
};

export const Grid: FC<IProps> = ({ yourTurn, playersCount, grid, winLine, onClick }: IProps) => {
  const width = (cellSize + 6) * grid.length + 6;
  const clockCenter = (width - clockSize) / 2;
  const className = c(style.grid, { [style.blocked]: !yourTurn || playersCount === 1 || winLine });

  return (
    <div className={style.wrapper}>
      {playersCount === 1 && (
        <div
          className={style.hourGlass}
          style={{ left: clockCenter, top: clockCenter + 7, width: clockSize, height: clockSize }}
        />
      )}
      <table className={className} style={{ fontSize, width }}>
        <tbody>
          {grid.map((row, y) => {
            return (
              <tr key={y}>
                {row.map((cell, x) => {
                  const isWinCell = winLine?.some(([_y, _x]) => _y === y && _x === x);
                  return (
                    <td key={x} className={isWinCell ? style.win : undefined}>
                      <Cell player={cell} onClick={() => onClick(x, y)} />
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

import { IGrid, IPlayer, NO_PLAYER, WinLine } from '../../types/data.type';

export const Arr = (size: number) => Array(size).fill(0);

export function getEmptyGrid(size: number): IGrid {
  const rows = new Array(size);
  for (let i = 0; i < size; i++) {
    rows[i] = new Array(size).fill(NO_PLAYER);
  }

  return rows;
}

export function getVictory(grid: IGrid, currentPlayer: IPlayer, size: number, winSize: number): WinLine | undefined {
  const margin = size - winSize + 1;

  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      let horizontalCount = 0;
      let verticalCount = 0;
      let diagonalCount = 0;
      let diagonal2Count = 0;
      for (let i = 0; i < winSize; i++) {
        if (x < margin && grid[y][x + i] === currentPlayer) {
          horizontalCount += 1;
        }
        if (y < margin && grid[y + i][x] === currentPlayer) {
          verticalCount += 1;
        }
        if (x < margin && y < margin && grid[y + i][x + i] === currentPlayer) {
          diagonalCount += 1;
        }
        if (x < margin && y < margin && grid[y + winSize - i - 1][x + i] === currentPlayer) {
          diagonal2Count += 1;
        }
      }
      if (horizontalCount === winSize) {
        return Arr(winSize).map((_, z) => [y, x + z]);
      }
      if (verticalCount === winSize) {
        return Arr(winSize).map((_, z) => [y + z, x]);
      }
      if (diagonalCount === winSize) {
        return Arr(winSize).map((_, z) => [y + z, x + z]);
      }
      if (diagonal2Count === winSize) {
        return Arr(winSize).map((_, z) => [y + winSize - z - 1, x + z]);
      }
    }
  }
}

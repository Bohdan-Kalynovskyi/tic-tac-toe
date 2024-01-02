// type ArrayElement<ArrayType extends readonly unknown[]> = ArrayType extends readonly (infer ElementType)[]
//   ? ElementType
//   : never;

export enum IPlayer {
  X,
  Circle,
  Cat,
  Dog,
  Flower,
  Star,
}

export const NO_PLAYER = -1;

export const PlayerSymbols = ['X', 'O', '🐱', '🐶', '🌸', '🐳'];

export type IGrid = (IPlayer | typeof NO_PLAYER)[][];

export type WinLine = [number, number][];

export interface IState {
  isStarted: boolean;
  players: IPlayer[];
  activePlayer: IPlayer | null;
  grid: IGrid;
}

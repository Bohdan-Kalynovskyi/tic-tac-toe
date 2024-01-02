import { IPlayer } from '../../client/src/types/data.type';

export const allPlayers = [
  IPlayer.X,
  IPlayer.Circle,
  IPlayer.Dog,
  IPlayer.Cat,
  IPlayer.Flower,
  IPlayer.Whale,
];

export const chosenPlayers: IPlayer[] = [];

export const winSizeRef = { current: 3 };

export const currentPlayerRef: { current: IPlayer | null } = { current: null };

export const setNextPlayer = () => {
  let currentIndex = chosenPlayers.indexOf(currentPlayerRef.current);
  if (currentIndex === -1 || chosenPlayers.length < 2) {
    throw new Error('error when setNextPlayer');
  }
  if (currentIndex < chosenPlayers.length - 1) {
    currentIndex++;
  } else {
    currentIndex = 0;
  }

  currentPlayerRef.current = chosenPlayers[currentIndex];
};

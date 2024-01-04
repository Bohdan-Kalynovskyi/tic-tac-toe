import { Request, Response } from 'express';
import { allPlayers, chosenPlayers, currentPlayerRef, winSizeRef } from './data';

export const init = (req: Request, res: Response) => {
  res.json({
    allPlayers,
    chosen: { currentPlayer: currentPlayerRef.current, chosenPlayers },
    winLength: winSizeRef.current,
  });
};

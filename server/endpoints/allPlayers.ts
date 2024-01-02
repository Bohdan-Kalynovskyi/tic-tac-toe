import { Request, Response } from 'express';
import { allPlayers } from './data';

export const getAllPlayers = (req: Request, res: Response) => {
  res.json(allPlayers);
};

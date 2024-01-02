import { app } from './';

import { API_URL } from '../client/src/constants/apiEndpoints';
import { getAllPlayers } from './endpoints/allPlayers';

export const registerEndpoints = () => {
  app.get(API_URL.allPlayers, getAllPlayers);
};

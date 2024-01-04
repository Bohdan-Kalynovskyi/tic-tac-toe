import { app } from './';

import { API_URL } from '../client/src/constants/apiEndpoints';
import { init } from './endpoints/allPlayers';

export const registerEndpoints = () => {
  app.get(API_URL.init, init);
};

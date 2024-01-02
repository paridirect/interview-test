import { createRestApi } from '../../create-rest-api';
import { setRouteCreateAccount } from './routes/create-game';
import { setRouteListGames } from './routes/list-games';

export const createGamesApi = () => {
  const rest = createRestApi();

  setRouteCreateAccount(rest);
  setRouteListGames(rest);

  return rest;
};

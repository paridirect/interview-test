import { createGamesApi } from './apis/games';
import { createRestApi } from './create-rest-api';
import { injectDependencies } from './middlewares/inject-dependencies';

export const createApp = (deps: Dependencies) =>
  createRestApi()
    .basePath('/api')
    .use('*', injectDependencies(deps))
    .options('*', (c) => c.json(undefined, 204))
    .route('/games', createGamesApi());

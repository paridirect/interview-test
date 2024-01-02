import { CreateGameUseCase, GameInMemoryRepository } from '@paridirect/business';
import { LoggerFactory } from '@paridirect/toolbox';

/**
 * Creates a container that holds all dependencies for the application.
 * @param env The environment established values. Can be the environment variables or bindings, depending on the runtime.
 */
export const createDependencies = (env: AppEnv): Dependencies => {
  const appName = env.APP_NAME;
  const logger = LoggerFactory.create({ appName });

  const gameRepo = new GameInMemoryRepository();
  const createGame = new CreateGameUseCase(gameRepo);

  return {
    logger,
    createGame,
  };
};

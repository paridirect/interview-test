import type { Logger } from '@paridirect/toolbox';
import type { CreateGameUseCase, GameRepository } from '@paridirect/business';

declare global {
  /**
   * The dependencies for this app.
   */
  interface Dependencies {
    logger: Logger;
    gameRepo: GameRepository;
    // use cases
    createGame: CreateGameUseCase;
  }
}

export {};

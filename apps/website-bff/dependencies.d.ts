import type { Logger } from '@paridirect/toolbox';
import type { CreateGameUseCase } from '@paridirect/business';

declare global {
  /**
   * The dependencies for this app.
   */
  interface Dependencies {
    logger: Logger;
    // use cases
    createGame: CreateGameUseCase;
  }
}

export {};

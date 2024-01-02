import type { Logger } from '@paridirect/toolbox';

declare global {
  /**
   * The dependencies for this app.
   */
  interface Dependencies {
    logger: Logger;
    // use cases
  }
}

export {};

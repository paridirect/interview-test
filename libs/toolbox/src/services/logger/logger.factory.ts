import { ConsoleLogger } from './implementations/logger.console';
import { type Logger } from './logger';

/**
 * static Logger abstraction and helpers for logger instances.
 */
export class LoggerFactory {
  /**
   * Create a Logger instance with the current implementation.
   */
  static create<BaseType extends Record<string, any> = Record<string, any>>(
    baseContext: Record<string, any> = {}
  ): Logger<BaseType> {
    return new ConsoleLogger(baseContext);
  }

  /**
   * Create a new logger with same interface, but with enriched data out of the box as default context.
   * Useful for debugging, link adding consumer and controllers metadata such as correlationId, topic name, etc.
   */
  static enrichContext<BaseType extends Record<string, any> = Record<string, any>>(
    logger: Logger,
    addedContext: BaseType
  ): Logger {
    return {
      log(message, context?, level?) {
        logger.log(message, { ...context, ...addedContext }, level);
      },
      debug(message, ...context: (BaseType | undefined)[]) {
        logger.debug(message, ...context, addedContext);
      },
      info(message, ...context: (BaseType | undefined)[]) {
        logger.info(message, ...context, addedContext);
      },
      warn(message, ...context: (BaseType | undefined)[]) {
        logger.warn(message, ...context, addedContext);
      },
      error(message, ...context: (BaseType | undefined)[]) {
        logger.error(message, ...context, addedContext);
      },
    };
  }
}

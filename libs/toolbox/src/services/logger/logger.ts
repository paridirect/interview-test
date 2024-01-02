/**
 * Allowed Logger levels.
 */
export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
}

/**
 * Base Logger class to be extended by the actual logger implementations.
 */
export abstract class Logger<BaseType extends Record<string, any> = Record<string, any>> {
  /**
   * General log method.
   *
   * @param message The message to log.
   * @param context The object is structured to send as a log context.
   * @param level The level of the log.
   */
  abstract log(message: string, context?: BaseType, level?: LogLevel): void;

  /**
   * Debug level log method.
   *
   * @param message The message to log.
   * @param context The object is structured to send as a log context.
   */
  debug(message: string, ...context: (BaseType | undefined)[]) {
    return this.log(message, mergeContexts(context), LogLevel.DEBUG);
  }

  /**
   * Warn level log method.
   *
   * @param message The message to log.
   * @param context The object is structured to send as a log context.
   */
  warn(message: string, ...context: (BaseType | undefined)[]) {
    return this.log(message, mergeContexts(context), LogLevel.WARN);
  }

  /**
   * Error level log method.
   *
   * @param message The message to log.
   * @param context The object is structured to send as a log context.
   */
  error(message: string, ...context: (BaseType | undefined)[]) {
    return this.log(message, mergeContexts(context), LogLevel.ERROR);
  }

  /**
   * Info level log method.
   *
   * @param message The message to log.
   * @param context The object is structured to send as a log context.
   */
  info(message: string, ...context: (BaseType | undefined)[]) {
    return this.log(message, mergeContexts(context), LogLevel.INFO);
  }
}

const handleSpread = <T extends Record<string, any>>(context: T | undefined): T => {
  if (!context) return {} as T;
  if ('toJSON' in context) return context['toJSON']();
  return context;
};

export const mergeContexts = <T extends Record<string, any>>(contexts: (T | undefined)[]): T =>
  contexts.reduce((acc, curr) => ({ ...acc, ...handleSpread(curr) }), {}) as T;

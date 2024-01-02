import { ConsoleLogger } from './implementations/logger.console';
import { LoggerFactory } from './logger.factory';

describe('LoggerFactory', () => {
  test('should create a logger with the correct implementation', () => {
    const logger = LoggerFactory.create();
    expect(logger).toBeInstanceOf(ConsoleLogger);
  });

  test('should enrich context with added data', () => {
    const logger = LoggerFactory.create();
    const addedContext = { userId: '123', correlationId: 'abc' };
    const enrichedLogger = LoggerFactory.enrichContext(logger, addedContext);

    const logSpy = vi.spyOn(logger, 'log');
    const debugSpy = vi.spyOn(logger, 'debug');
    const infoSpy = vi.spyOn(logger, 'info');
    const warnSpy = vi.spyOn(logger, 'warn');
    const errorSpy = vi.spyOn(logger, 'error');

    enrichedLogger.log('test log message');
    enrichedLogger.debug('test debug message');
    enrichedLogger.info('test info message');
    enrichedLogger.warn('test warn message');
    enrichedLogger.error('test error message');
    enrichedLogger.debug('test debug message', {});

    expect(logSpy).toHaveBeenCalledWith('test log message', addedContext);
    expect(debugSpy).toHaveBeenCalledWith('test debug message', addedContext);
    expect(infoSpy).toHaveBeenCalledWith('test info message', addedContext);
    expect(warnSpy).toHaveBeenCalledWith('test warn message', addedContext);
    expect(errorSpy).toHaveBeenCalledWith('test error message', addedContext);
  });
});

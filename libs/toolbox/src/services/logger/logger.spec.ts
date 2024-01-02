import { Logger, type LogLevel } from './logger';

class ConcreteLogger extends Logger {
  log<T>(message: string, context?: T, level?: LogLevel): void {
    // Concrete implementation for testing purposes.
  }
}

describe('Logger', () => {
  let logger: ConcreteLogger;

  beforeEach(() => {
    logger = new ConcreteLogger();
  });

  test('should have correct name', () => {
    expect(logger).toBeInstanceOf(ConcreteLogger);
  });
});

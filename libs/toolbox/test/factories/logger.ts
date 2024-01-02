import type { Logger } from '../../src/services/logger/logger';

export class LoggerTestFactory {
  /**
   * Create a Logger mock instance for tests.
   */
  static createMock(): Logger {
    return {
      log: vi.fn(),
      debug: vi.fn(),
      info: vi.fn(),
      warn: vi.fn(),
      error: vi.fn(),
    };
  }
}

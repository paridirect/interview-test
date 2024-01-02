import { LogLevel, Logger } from '../logger';

export class ConsoleLogger<BaseType extends Record<string, any> = Record<string, any>> extends Logger<BaseType> {
  constructor(private readonly baseContext?: Partial<BaseType>) {
    super();
  }

  log<T extends BaseType>(message: string, context?: T, level = LogLevel.INFO): void {
    console[level](JSON.stringify({ ...this.baseContext, ...context, m: message, t: Date.now(), l: level }));
  }
}

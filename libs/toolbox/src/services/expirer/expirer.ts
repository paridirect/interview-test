import { clone } from '../../utils/object';

/**
 * A class that holds a value for a certain amount of time before clearing it.
 * It can be set to clear the value on a timer, or manually.
 * It relies on a timer to automatically clear the value, But it also has an expiration time
 * that can be used to check if the value is expired. Useful for caching in environments
 * where the timer may not be reliable.
 */
export class Expirer<T = any> {
  private currentValue?: T;
  /**
   * Timeout for clearing the current value
   */
  private timer?: ReturnType<typeof setTimeout>;
  /**
   * Time in epoch milliseconds when the current value expires
   */
  private nextExpiration: number;
  private readonly defaultValue?: T;
  private readonly ms: number;
  private readonly onClear?: () => void;

  constructor({ defaultValue, initialValue, expiration, onClear }: ExpirerOptions<T>) {
    this.defaultValue = defaultValue;
    this.ms = expiration;
    this.nextExpiration = Date.now();
    if (initialValue) this.set(initialValue);
    if (onClear) this.onClear = () => onClear();
  }

  get value() {
    if (Date.now() > this.nextExpiration) {
      this.clear();
      return this.defaultValue;
    }
    return clone(this.currentValue ?? this.defaultValue);
  }

  set(value: T) {
    this.currentValue = value;
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.clear();
    }, this.ms);
    this.nextExpiration = Date.now() + this.ms;
  }

  clear() {
    if (!this.timer) return;
    clearTimeout(this.timer);
    delete this.timer;
    this.currentValue = undefined;
    this.onClear?.();
  }
}

export interface ExpirerOptions<T = any> {
  /**
   * In milliseconds
   */
  expiration: number;
  initialValue?: T;
  defaultValue?: T;
  onClear?: () => void;
}

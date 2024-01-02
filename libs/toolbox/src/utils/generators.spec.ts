import { randomWord, randomInt, randomDate } from './generators';

describe.each(new Array(10).fill(undefined))('Random Generators', () => {
  it('randomFullName generates a string', () => {
    const name = randomWord();
    expect(typeof name).toBe('string');
    expect(name).not.toBe('');
  });

  it('randomFloat generates a float within range', () => {
    const options = { min: 1, max: 5, precision: 2 };
    const num = randomInt(options);
    expect(typeof num).toBe('number');
    expect(num).toBeGreaterThanOrEqual(options.min);
    expect(num).toBeLessThanOrEqual(options.max);
  });

  it('randomDate generates a date within range', () => {
    const options = { from: new Date(2000, 0, 1), to: new Date(2020, 11, 31) };
    const date = randomDate(options);
    expect(date).toBeInstanceOf(Date);
    expect(date.getTime()).toBeGreaterThanOrEqual(options.from.getTime());
    expect(date.getTime()).toBeLessThanOrEqual(options.to.getTime());
  });
});

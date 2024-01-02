import { sleep } from '../../utils/promise';
import { Expirer } from './expirer';

describe(Expirer.name, () => {
  it('should set and clear', async () => {
    const expirer = new Expirer({ defaultValue: 2, expiration: 100 });

    expect(expirer.value).toBe(2);
    expirer.set(5);
    expect(expirer.value).toBe(5);
    await sleep(150);
    expect(expirer.value).toBe(2);

    expirer.set(5);
    expirer.clear();
    expect(expirer.value).toBe(2);
    expect(() => expirer.clear()).not.toThrow();
  });

  it('should set and clear with onClear', async () => {
    const onClear = vi.fn();
    const expirer = new Expirer({
      expiration: 100,
      onClear,
    });

    expirer.set(5);
    expect(expirer.value).toBe(5);
    await sleep(150);
    expect(expirer.value).toBeUndefined();
    expect(onClear).toBeCalledTimes(1);

    expirer.set(5);
    expirer.clear();
    expect(expirer.value).toBeUndefined();
    expect(onClear).toBeCalledTimes(2);
  });

  it('should set and clear with onClear and initialValue', async () => {
    const expirer = new Expirer({
      expiration: 100,
      initialValue: 5,
      defaultValue: 2,
    });

    expect(expirer.value).toBe(5);
    await sleep(150);
    expect(expirer.value).toBe(2);

    expirer.set(4);
    expect(expirer.value).toBe(4);
    expirer.clear();
    expect(expirer.value).toBe(2);
  });
});

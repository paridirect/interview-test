import { sleep } from './promise';

describe('Promise utils unit tests', () => {
  it('should sleep for 50ms', async () => {
    const start = Date.now();
    await sleep(100);
    const end = Date.now();
    expect(end - start).toBeGreaterThanOrEqual(50);
  });
});

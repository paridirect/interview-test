import { createSortableUid, createRandomUid } from './id';

describe(createSortableUid.name, () => {
  it('should return a string', () => {
    const uid = createSortableUid();
    expect(typeof uid).toBe('string');
  });

  it('should return a UUID v7 string', () => {
    const uid = createSortableUid();
    const uuidV7Regex = /^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    expect(uuidV7Regex.test(uid)).toBe(true);
  });
});

describe(createRandomUid.name, () => {
  it('should return a string', () => {
    const uid = createRandomUid();
    expect(typeof uid).toBe('string');
  });

  it('should return a UUID v4 string', () => {
    const uid = createRandomUid();
    const uuidV4Regex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    expect(uuidV4Regex.test(uid)).toBe(true);
  });
});

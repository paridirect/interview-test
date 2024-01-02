import { randomUUID } from 'uncrypto';

export type UUID = `${string}-${string}-${string}-${string}-${string}`;

/**
 * Creates a new random Unique UUID.
 * @returns A new Unique UUID
 */
export const createRandomUid = (): UUID => randomUUID();

import { uuidv7 } from 'uuidv7';
import { randomUUID } from 'uncrypto';

export type UUID = `${string}-${string}-${string}-${string}-${string}`;

/**
 * Creates a new sortable UUID that can be sorted by date.
 * @returns A new sortable UUID
 */
export const createSortableUid = (): UUID => uuidv7() as UUID;

/**
 * Creates a new random Unique UUID.
 * @returns A new Unique UUID
 */
export const createRandomUid = (): UUID => randomUUID();

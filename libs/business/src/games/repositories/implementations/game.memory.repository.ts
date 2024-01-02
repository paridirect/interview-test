import { GetManyOrder, cloneDeep, sleep } from '@paridirect/toolbox';

import type { GameProps } from '../../entities';
import { type GameRepository, type GameGetManyOptions, type GameGetManyOutput } from '../game.interface';

export class GameInMemoryRepository implements GameRepository {
  private store: Map<string, GameProps[]> = new Map();

  async getMany({ provider, cursor, limit, order }: GameGetManyOptions): Promise<GameGetManyOutput> {
    let items = this.store.get(provider) ?? [];

    if (cursor) {
      const cursorIndex = items.findIndex((v) => v.gameId === cursor);
      if (cursorIndex !== -1) {
        items = items.slice(cursorIndex + 1);
      }
    }

    if (order) {
      items = items.toSorted((a, b) => {
        if (order === GetManyOrder.ASC) {
          return a.createdAt.getTime() - b.createdAt.getTime();
        } else {
          return b.createdAt.getTime() - a.createdAt.getTime();
        }
      });
    }

    if (limit !== undefined) {
      items = items.slice(0, limit);
    }

    await sleep(5000);

    return { items: items.map(cloneDeep), cursor: items[items.length - 1]?.gameId ?? null };
  }

  async create(entity: GameProps): Promise<void> {
    const items = this.store.get(entity.providerId) ?? [];
    items.push(entity);
    this.store.set(entity.providerId, items);
  }
}

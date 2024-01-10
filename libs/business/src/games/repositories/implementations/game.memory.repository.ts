import { GetManyOrder, cloneDeep, sleep } from '@paridirect/toolbox';

import type { GameProps } from '../../entities';
import { type GameRepository, type GameGetManyOptions, type GameGetManyOutput } from '../game.interface';

export class GameInMemoryRepository implements GameRepository {
  private store: Map<string, GameProps[]> = new Map();

  async getMany({ providerId, category, cursor, limit, order }: GameGetManyOptions): Promise<GameGetManyOutput> {
    let items = providerId ? this.store.get(providerId) ?? [] : Array.from(this.store.values()).flat();

    if (cursor) {
      const cursorIndex = items.findIndex((v) => v.gameId === cursor);
      if (cursorIndex !== -1) {
        items = items.slice(cursorIndex);
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

    if (category !== undefined) {
      items = items.filter((v) => v?.category === category);
    }

    if (limit !== undefined) {
      items = items.slice(0, limit);
    }

    await sleep(5000);

    return { items: items.map(cloneDeep), cursor: items[items.length]?.gameId ?? null };
  }

  async create(entity: GameProps): Promise<void> {
    const items = this.store.get(entity.providerId) ?? [];
    items.push(entity);
    this.store.set(entity.providerId, items);
  }
}

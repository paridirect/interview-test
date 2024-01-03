import { type GetManyOrder } from '@paridirect/toolbox';
import { type GameProps } from '../entities';

export interface GameRepository {
  create(entity: GameProps): Promise<void>;
  getMany(filter: GameGetManyOptions): Promise<GameGetManyOutput>;
}

export interface GameGetManyOptions {
  providerId?: string;
  limit?: number;
  order?: GetManyOrder;
  cursor?: string | null;
}

export interface GameGetManyOutput {
  items: GameProps[];
  cursor: string | null;
}

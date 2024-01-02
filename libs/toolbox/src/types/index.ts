export type Primitive = string | number | boolean | bigint | symbol | undefined | null;

export enum GetManyOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export interface UseCase<I = unknown, O = unknown> {
  execute(input: I): Promise<O>;
}

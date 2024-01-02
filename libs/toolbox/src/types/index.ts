export type Primitive = string | number | boolean | bigint | symbol | undefined | null;

export interface UseCase<I = unknown, O = unknown> {
  execute(input: I): Promise<O>;
}

export enum GetManyOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export enum ErrorCause {
  BAD_INPUT = 'bad_input',
  NOT_FOUND = 'not_found',
  UNAUTHORIZED = 'unauthorized',
  FORBIDDEN = 'forbidden',
  CONFLICT = 'conflict',
  INTERNAL = 'internal',
}

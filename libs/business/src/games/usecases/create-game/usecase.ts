import { type UseCase, createSortableUid, ErrorCause } from '@paridirect/toolbox';

import type { CreateGameUseCaseInput, CreateGameUseCaseOutput } from './types';
import { type GameRepository } from '../../repositories';
import { type GameProps } from '../../entities';

export class CreateGameUseCase implements UseCase {
  constructor(private readonly repo: GameRepository) {}

  async execute(input: CreateGameUseCaseInput): Promise<CreateGameUseCaseOutput> {
    if (input.name.length < 3 || input.name.length > 25)
      throw new Error('Game name must be between 3 and 25 characters', { cause: ErrorCause.BAD_INPUT });

    const transactionAgreement: GameProps = {
      ...input,
      gameId: createSortableUid(),
      createdAt: new Date(),
    };

    await this.repo.create(transactionAgreement);
  }
}

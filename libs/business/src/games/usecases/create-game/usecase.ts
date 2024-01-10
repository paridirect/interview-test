import { type UseCase, createRandomUid, ErrorCause } from '@paridirect/toolbox';

import type { CreateGameUseCaseInput, CreateGameUseCaseOutput } from './types';
import { type GameRepository } from '../../repositories';
import { type GameProps, existingCategories } from '../../entities';

export class CreateGameUseCase implements UseCase {
  constructor(private readonly repo: GameRepository) {}

  async execute(input: CreateGameUseCaseInput): Promise<CreateGameUseCaseOutput> {
    if (input.name.length < 3 || input.name.length > 25)
      throw new Error('Game name must be between 3 and 25 characters', { cause: ErrorCause.BAD_INPUT });

    if (input.description.length < 10 || input.name.length > 150)
      throw new Error('Game name must be between 10 and 150 characters', { cause: ErrorCause.BAD_INPUT });

    if (!existingCategories.has(input.category))
      throw new Error('Game category does not exist', { cause: ErrorCause.NOT_FOUND });

    const transactionAgreement: GameProps = {
      ...input,
      gameId: createRandomUid(),
      createdAt: new Date(),
    };

    await this.repo.create(transactionAgreement);
  }
}

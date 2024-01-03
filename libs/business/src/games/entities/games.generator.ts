import { createRandomUid, randomDate, randomWord, randomInt, randomSentence } from '@paridirect/toolbox';
import { type GameProps } from './game.props';
import { type GameRepository } from '../repositories';

/**
 * Generate a game properties.
 * @returns The generated game.
 */
export const generateGame = (): GameProps => {
  const from = new Date();
  from.setMonth(from.getMonth() - 3);
  const createdAt = randomDate({ from: from, to: new Date() });

  return {
    providerId: createRandomUid(),
    gameId: createRandomUid(),
    name: randomWord(),
    description: randomSentence(),
    createdAt,
  };
};

/**
 * Generate an array of game properties.
 * @returns An array of generated games.
 */
export const generateGames = (): GameProps[] => {
  const games: GameProps[] = [];
  const gameLength = randomInt({ min: 50, max: 100 });

  for (let i = 0; i < gameLength; i++) {
    games.push(generateGame());
  }

  return games;
};

/**
 * Seed games into a repository.
 * @param repo The repository to seed.
 * @param games The games to seed.
 */
export const seedGames = async (repo: GameRepository, games: GameProps[]) => {
  for (const game of games) {
    await repo.create(game);
  }
};

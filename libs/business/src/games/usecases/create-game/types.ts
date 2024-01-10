export interface CreateGameUseCaseInput {
  providerId: string;
  name: string;
  description: string;
  category: string;
}

export type CreateGameUseCaseOutput = void;

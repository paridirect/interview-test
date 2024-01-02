import { inject, provide, ref, type Ref } from 'vue';
import type { GameProps } from '../types';

export interface GamesLoader {
  games: Ref<GameProps[]>;
  loading: Ref<boolean>;
  loadGames: () => Promise<void>;
}

export const useGamesLoader = () => {
  const injected = inject<GamesLoader>('games-loader');
  if (injected) return injected;

  const loadGames = async () => {
    // const games = await fetch('/api/games').then((res) => res.json());
    // composable.games.value = games;
    composable.loading.value = false;
  };

  const composable = {
    games: ref([{ name: 'test', description: 'Some game description' }]),
    loading: ref(true),
    loadGames,
  };

  provide<GamesLoader>('games-loader', composable);

  return composable;
};

import { ref, type Ref } from 'vue';
import type { GameProps } from '../types';
import { provideSingleContext } from '../utils/single-context-provider';

export interface GamesLoader {
  games: Ref<GameProps[]>;
  loading: Ref<boolean>;
  loadGames: () => Promise<void>;
}

export const useGamesLoader = () =>
  provideSingleContext<GamesLoader>('games-loader', () => {
    const loadGames = async () => {
      const response = await fetch('http://127.0.0.1:3000/api/games');
      const json = await response.json();
      composable.games.value = json.items;
      composable.loading.value = false;
    };

    const composable = {
      games: ref([{ name: 'test', description: 'Some game description' }]),
      loading: ref(true),
      loadGames,
    };

    return composable;
  });

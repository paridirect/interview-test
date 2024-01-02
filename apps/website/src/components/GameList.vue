<script setup lang="ts">
import { onMounted } from 'vue';
import GameCard from '../components/GameCard.vue';
import { useGamesLoader } from '../composables/games-loader';

const gamesLoader = useGamesLoader();
onMounted(() => {
  gamesLoader.loadGames();
});
</script>

<template>
  <div v-if="gamesLoader.loading.value" class="games-loading">Loading...</div>
  <div v-else class="games-list">
    <GameCard v-for="game in gamesLoader.games.value" :key="game.name" :game="game" />
  </div>
</template>

<style scoped>
.games-loading {
  align-items: center;
  display: flex;
  justify-content: center;
}
.games-list {
  align-items: flex-start;
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr;
}
@media screen and (min-width: 768px) {
  .games-list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>

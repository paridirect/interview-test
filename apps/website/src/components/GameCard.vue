<script setup lang="ts">
import type { GameProps } from '../types';

const { game } = defineProps<{
  game: GameProps;
}>();
</script>

<template>
  <span class="button-pill rounded shadow">
    <span>
      {{ game.name }}
      <span>{{ game.description }}</span>
    </span>
  </span>
</template>
<style scoped>
.games-list {
  align-items: flex-start;
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr;
  margin-top: 2rem;
}
.button-pill {
  padding: 1.5rem 2rem;
  transition-duration: 300ms;
  transition-property:
    background-color,
    border-color,
    color,
    fill,
    stroke,
    opacity,
    box-shadow,
    transform,
    filter,
    backdrop-filter,
    -webkit-backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  align-items: center;
  display: flex;
}
.button-pill svg {
  transition-property:
    background-color,
    border-color,
    color,
    fill,
    stroke,
    opacity,
    box-shadow,
    transform,
    filter,
    backdrop-filter,
    -webkit-backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
  flex-shrink: 0;
  width: 3rem;
}
.button-pill > span {
  letter-spacing: -0.025em;
  font-weight: 400;
  font-size: 1.125rem;
  line-height: 1.75rem;
  padding-left: 1rem;
  padding-right: 1rem;
}
.button-pill span span {
  display: block;
  font-size: 0.875rem;
  font-weight: 300;
  line-height: 1.25rem;
}
.button-pill:hover svg,
.button-pill:hover {
  background-color: #00cab0;
}
</style>

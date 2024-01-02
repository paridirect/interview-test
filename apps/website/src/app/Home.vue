<script setup lang="ts">
import Logo from '../components/Logo.vue';
import GameList from '../components/GameList.vue';
import Footer from '../components/Footer.vue';

defineProps<{
  title: string;
}>();
</script>

<template>
  <div class="wrapper">
    <div class="container">
      <div class="logo">
        <Logo style="max-width: 300px" />
      </div>
      <div style="padding-top: 2rem">
        <GameList />
      </div>
      <Footer />
    </div>
  </div>
</template>

<style scoped>
.logo {
  display: flex;
  justify-content: center;
}
.wrapper {
  width: 100%;
}
.container {
  margin-left: auto;
  margin-right: auto;
  max-width: 768px;
  padding-bottom: 3rem;
  padding-left: 1rem;
  padding-right: 1rem;
  color: rgba(55, 65, 81, 1);
  width: 100%;
}
</style>

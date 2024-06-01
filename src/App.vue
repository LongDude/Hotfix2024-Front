<template>
  <v-layout class="rounded rounded-md">
    <app-header />
    <v-main v-if="userStore.user">
      <router-view />
    </v-main>
  </v-layout>
</template>

<script setup>
import AppHeader from './components/AppHeader.vue';
import { useUserStore } from '@/stores/user';
import { onBeforeMount } from 'vue'; 

const userStore = useUserStore();

onBeforeMount(() => {
  userStore.authUser();
})
  //
</script>

<style lang="scss">
.main-page {
  padding: 10px;
}
</style>

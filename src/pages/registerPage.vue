<template>
    <section class="register-page main-page">
        <h1>Register</h1>
    </section>
</template>

<script setup>
import { onBeforeMount } from 'vue';
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();

onBeforeMount(() => {
  if (userStore.hasUser) {
    router.push('/')
  }

})
</script>

<style lang="scss"></style>
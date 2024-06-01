<template>
  <header>
    <v-navigation-drawer v-model="drawer">
      <template v-if="userStore.hasUser">
        <v-list-item :title="fullName"></v-list-item>
        <v-divider></v-divider>
      </template>
      <v-list>
        <v-list-item v-for="link of links" :key="link.name" link :to="link.to">
          {{ link.name }}
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :elevation="2">
      <template v-slot:prepend>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      </template>

      <!-- <v-app-bar-title>
        <router-link to="/">Главная</router-link>
      </v-app-bar-title> -->

      <v-btn
        v-if="userStore.hasUser"
        text="Выйти"
        class="ml-1"
        @click="userStore.logout"
      ></v-btn>
      <!-- <auth-dialog v-else class="ml-1" /> -->
    </v-app-bar>
  </header>
</template>

<script setup>
import { useUserStore } from "@/stores/user";
import { computed, ref } from "vue";

const userStore = useUserStore();
const drawer = ref(true);

const fullName = computed(() => `${userStore.user?.first_name} ${userStore.user?.last_name}` );

const links = computed(() => {
  const arr = [
    {
      name: "Главная",
      to: "/",
    },
  ];

  if (!userStore.hasUser) {
    arr.push({
      name: "Войти",
      to: "/auth",
    });

    arr.push({
      name: "Зарегистрироваться",
      to: "/register",
    });
  }

  return arr;
});

</script>

<style lang="scss" scoped></style>

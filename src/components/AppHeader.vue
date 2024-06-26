<template>
  <header>
    <v-navigation-drawer v-model="drawer">
      <template v-if="userStore.hasUser">
        <v-list-item :title="fullName" link to="/profile"></v-list-item>
        <v-divider></v-divider>
      </template>
      <v-list>
        <v-list-item v-for="link of links" :key="link.name" link :to="link.to">
          {{ link.name }}
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon
        @click="drawer = true"
        class="d-flex d-sm-none"
      ></v-app-bar-nav-icon>
      <router-link to="/" class="ml-1">
        <v-toolbar-title class="d-none d-sm-flex">
        <v-icon>mdi-airplane</v-icon>
        AviaD
      </v-toolbar-title>
      </router-link>


      <v-spacer></v-spacer>

      <v-btn @click="toggleTheme" icon>
        <v-icon>mdi-theme-light-dark</v-icon>
      </v-btn>

      <router-link v-if="userStore.hasUser" to="/profile" class="ml-1">
        <span class="mdi mdi-account ml-1 person-icon"></span>
      </router-link>

      <v-btn
        v-if="userStore.hasUser"
        text="Выйти"
        class="ml-1"
        @click="userStore.logout"
      >
        Выйти
        <v-icon class="ml-1">mdi-exit-to-app</v-icon>
      </v-btn>

      <div v-else>
        <v-btn to="/auth" text="Войти" class="ml-1 mr-1">
          Войти
          <v-icon class="ml-1">mdi-login</v-icon>
        </v-btn>

        <v-btn to="/register" text="Зарегистрироваться" class="ml-1">
          Зарегистрироваться
          <v-icon class="ml-1">o</v-icon>
        </v-btn>
      </div>
    </v-app-bar>
  </header>
</template>

<script setup>
import { useUserStore } from "@/stores/user";
import { computed, ref } from "vue";
import { useTheme } from "vuetify";

const theme = useTheme();

const userStore = useUserStore();
const drawer = ref(false);

const fullName = computed(
  () =>
    userStore.hasUser &&
    `${userStore.user?.firstName} ${userStore.user?.lastName}`
);

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

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
  localStorage.setItem("theme", theme.global.name.value);
}

onMounted(() => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    theme.global.name.value = savedTheme;
  }
});
</script>

<style lang="scss" scoped></style>

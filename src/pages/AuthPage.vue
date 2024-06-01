<template>
  <section class="auth-page main-page">
    <form action="" method="post">
      <v-card
        class="mx-auto pa-12 pb-8"
        elevation="8"
        max-width="448"
        rounded="lg"
      >
        <label for="login" class="text-subtitle-1 text-medium-emphasis pointer"
          >Логин</label
        >

        <v-text-field
          v-model="login"
          id="login"
          density="compact"
          placeholder="Адрес электронной почты"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
          :disabled="loading"
        ></v-text-field>

        <label
          for="password"
          class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between pointer"
        >
          Пароль
        </label>

        <v-text-field
          v-model="password"
          id="password"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          density="compact"
          placeholder="Пароль"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          :disabled="loading"
          @click:append-inner="visible = !visible"
        ></v-text-field>

        <v-btn
          class="mb-8"
          color="blue"
          size="large"
          variant="tonal"
          block
          :disabled="loading"
          @click="apply"
        >
          Войти
        </v-btn>

        <v-card-text class="text-center">
          <router-link
            class="text-blue text-decoration-none"
            to="/register"
            rel="noopener noreferrer"
            target="_blank"
          >
            Зарегистрироваться <v-icon icon="mdi-chevron-right"></v-icon>
          </router-link>
        </v-card-text>
      </v-card>
    </form>
  </section>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import { useUserStore } from "@/stores/user";
import { useRouter, RouterLink } from "vue-router";

const userStore = useUserStore();
const router = useRouter();

const login = ref("");
const password = ref("");
const loading = ref(false);
const visible = ref(false);

const apply = async () => {
  loading.value = true;
  await userStore.authUser(login.value, password.value);
  loading.value = false;
  if (userStore.hasUser) router.push("/");
};

onBeforeMount(() => {
  if (userStore.hasUser) {
    router.push("/");
  }
});
</script>

<style lang="scss"></style>

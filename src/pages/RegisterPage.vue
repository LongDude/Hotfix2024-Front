<template>
  <section class="register-page main-page">
    <form action="" method="post">
      <v-card
        class="mx-auto pa-12 pb-8"
        elevation="8"
        max-width="448"
        rounded="lg"
      >
        <label for="login" class="text-subtitle-1 text-medium-emphasis pointer"
          >Электронный адрес</label
        >

        <v-text-field
          v-model="login"
          id="login"
          density="compact"
          placeholder="Адрес электронной почты"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
          :disabled="loading"
          :color="!emailValid && 'error'"
          :base-color="!emailValid && 'error'"
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
          :color="!hasPassword && 'error'"
          :base-color="!hasPassword && 'error'"
          @click:append-inner="visible = !visible"
        ></v-text-field>

        <label
          for="first_name"
          class="text-subtitle-1 text-medium-emphasis pointer"
          >Имя</label
        >

        <v-text-field
          v-model="firstName"
          id="first_name"
          density="compact"
          placeholder="Имя"
          variant="outlined"
          :disabled="loading"
        ></v-text-field>

        <label
          for="last_name"
          class="text-subtitle-1 text-medium-emphasis pointer"
          >Фамилия</label
        >

        <v-text-field
          v-model="lastName"
          id="last_name"
          density="compact"
          placeholder="Фамилия"
          variant="outlined"
          :disabled="loading"
        ></v-text-field>

        <label for="gender" class="text-subtitle-1 text-medium-emphasis pointer"
          >Пол</label
        >

        <v-switch
          id="gender"
          v-model="gender"
          color="primary"
          :label="gender ? 'Муж' : 'Жен'"
          hide-details
        ></v-switch>

        <label for="phone" class="text-subtitle-1 text-medium-emphasis pointer"
          >Телефон</label
        >

        <v-text-field
          v-model="phone"
          id="phone"
          density="compact"
          placeholder="Телефон"
          variant="outlined"
          :disabled="loading"
        ></v-text-field>

        <v-btn
          class="mb-8"
          color="blue"
          size="large"
          variant="tonal"
          block
          :disabled="loading || !emailValid || !hasPassword"
          @click="register"
        >
          Зарегистрироваться
        </v-btn>

        <v-card-text class="text-center">
          <router-link
            class="text-blue text-decoration-none"
            to="/auth"
            rel="noopener noreferrer"
          >
            Войти <v-icon icon="mdi-chevron-right"></v-icon>
          </router-link>
        </v-card-text>
      </v-card>
    </form>
  </section>
</template>

<script setup>
import { onBeforeMount } from "vue";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";
import { UserApi } from "@/api/UserApi";

const userStore = useUserStore();
const router = useRouter();

const loading = ref(false);
const visible = ref(false);
const login = ref("");
const password = ref("");
const firstName = ref("");
const lastName = ref("");
const gender = ref(false);
const phone = ref("");

const emailValid = computed(() => {
  const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  return pattern.test(login.value);
})

const hasPassword = computed(() => password.value.length >= 2);

const register = async () => {
  loading.value = true;
  const response = await UserApi.register({
    login: login.value,
    password: password.value,
    firstName: firstName.value,
    lastName: lastName.value,
    gender: gender.value,
    phone: phone.value,
  });

  if (response) {
    await userStore.authUser(login.value, password.value);
  }

  loading.value = false;
  if (userStore.hasUser) {
    router.push("/");
  }
};

onBeforeMount(async () => {
  if (userStore.hasUser) {
    router.push("/");
  }
});
</script>

<style lang="scss"></style>

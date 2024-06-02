<template>
  <section class="profile-page main-page">
    <h1>Profile</h1>

    <form action="" method="post">
      <v-card
        class="mx-auto pa-12 pb-8"
        elevation="8"
        max-width="448"
        rounded="lg"
      >
        <label
          for="password"
          class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between pointer"
        >
          Пароль*
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
          :color="!hasPassword && 'error'"
          :base-color="!hasPassword && 'error'"
        ></v-text-field>

        <label
          for="newPassword"
          class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between pointer"
        >
          Новый пароль
        </label>

        <v-text-field
          v-model="newPassword"
          id="newPassword"
          :append-inner-icon="newVisible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="newVisible ? 'text' : 'password'"
          density="compact"
          placeholder="Новый пароль"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          :disabled="loading"
          @click:append-inner="newVisible = !newVisible"
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
          :disabled="loading || !canChanged"
          @click="apply"
        >
          Изменить
        </v-btn>
      </v-card>
    </form>

    <h2>История пользователя</h2>
    <request-table :requests="requests" />
  </section>
</template>

<script setup>
import { onBeforeMount } from "vue";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";
import { UserApi } from "@/api/UserApi";
import RequestTable from "./profile/RequestTable.vue";

const userStore = useUserStore();
const router = useRouter();

const requests = ref(null);

const user = computed(() => userStore.user);
const loading = ref(false);
const visible = ref(false);
const newVisible = ref(false);
const login = ref(user.value.login);
const password = ref("");
const newPassword = ref("");
const firstName = ref(user.value.firstName);
const lastName = ref(user.value.lastName);
const gender = ref(!!user.value.gender);
const phone = ref(user.value.phone);

const hasPassword = computed(() => password.value.length >= 2);

const canChanged = computed(
  () =>
    hasPassword.value &&
    (user.value.login !== login.value ||
      user.value.firstName !== firstName.value ||
      user.value.lastName !== lastName.value ||
      !!user.value.gender !== gender.value ||
      user.value.phone !== phone.value ||
      (newPassword.value.length >= 2 && newPassword.value !== password.value))
);

const apply = async () => {
  loading.value = true;
  const changedUser = await UserApi.changeProfile({
    login: login.value,
    password: password.value,
    newPassword: newPassword.value,
    firstName: firstName.value,
    lastName: lastName.value,
    gender: gender.value,
    phone: phone.value,
  });

  if (changedUser) await userStore.updateUser(changedUser);

  loading.value = false;
};

onBeforeMount(async () => {
  if (!userStore.hasUser) {
    router.push("/");
  }

  requests.value = await UserApi.getRequests();
});
</script>

<style lang="scss"></style>

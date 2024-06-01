import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { UserApi } from '@/api';
import { USER_STORAGE_NAME } from '@/const';

const initialUser = () => ({});

export const useUserStore = defineStore('user', () => {
  const user = ref(null);
  const hasUser = computed(() => !!user.value?.first_name);

  function updateUser(newUser) {
    user.value = newUser;
    sessionStorage.setItem(USER_STORAGE_NAME, JSON.stringify({ ...newUser }));
  }

  async function authUser(
    users_email,
    users_password,
  ) {
    let foundedUser = null;

    if (users_email && users_password) {
      foundedUser = await UserApi.login(users_email, users_password);
    } else {
      const sessionUserStr = sessionStorage.getItem(USER_STORAGE_NAME);
      if (sessionUserStr) {
        const sessionUser = JSON.parse(sessionUserStr);
        const token = sessionUser.token;

        if (token) foundedUser = await UserApi.getUser();
      } else {
        user.value = initialUser();
      }
    }

    if (foundedUser) updateUser(foundedUser);
    else sessionStorage.removeItem(USER_STORAGE_NAME);

    return foundedUser;
  }

  async function logout() {
    await UserApi.logout();
    sessionStorage.removeItem(USER_STORAGE_NAME);
    updateUser(initialUser());
  }

  return { user, logout, hasUser, authUser };
});

import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { UserApi } from "@/api";
import { USER_STORAGE_NAME, TOKEN_STORAGE_NAME } from "@/const";

const initialUser = () => ({});

export const useUserStore = defineStore("user", () => {
  const user = ref(null);
  const hasUser = computed(() => !!user.value?.firstName);

  function updateUser(newUser) {
    user.value = newUser;
    sessionStorage.setItem(USER_STORAGE_NAME, JSON.stringify({ ...newUser }));
  }

  async function authUser(users_email, users_password) {
    let foundedUser = null;

    if (users_email && users_password) {
      const response = await UserApi.login(users_email, users_password);
      const token = response?.token;
      if (!token) return;

      await sessionStorage.setItem(TOKEN_STORAGE_NAME, token);
      foundedUser = await UserApi.getUser();
    } else {
      const sessionUserStr = sessionStorage.getItem(USER_STORAGE_NAME);
      if (sessionUserStr) {
        const sessionUser = JSON.parse(sessionUserStr);
        foundedUser = sessionUser;
        // const token = sessionUser.token;

        // if (token) foundedUser = await UserApi.getUser();
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
    sessionStorage.removeItem(TOKEN_STORAGE_NAME);
    updateUser(initialUser());
  }

  return { user, logout, hasUser, authUser, updateUser };
});

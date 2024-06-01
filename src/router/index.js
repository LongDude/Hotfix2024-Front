import AuthPage from "@/pages/AuthPage.vue";
import HomePage from "@/pages/HomePage.vue";
import RegisterPage from "@/pages/RegisterPage.vue";
import ProfilePage from "@/pages/ProfilePage.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/auth", component: AuthPage, name: "auth" },
    { path: "/register", component: RegisterPage, name: "register" },
    { path: "/profile", component: ProfilePage, name: "profile" },
    { path: "", component: HomePage, name: "home" },
  ],
});

export default router;

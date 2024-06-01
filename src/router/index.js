import AuthPage from "@/pages/AuthPage.vue";
import HomePage from "@/pages/HomePage.vue";
import RegisterPage from "@/pages/registerPage.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/auth", component: AuthPage, name: "auth" },
    { path: "/register", component: RegisterPage, name: "register" },
    { path: "", component: HomePage, name: "home" },
  ],
});

export default router;

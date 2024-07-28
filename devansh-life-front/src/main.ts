import { createApp } from "vue";
import App from "./App.vue";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-next/dist/bootstrap-vue-next.css";
import { createRouter, createWebHistory } from "vue-router";
import ProjectList from "./components/pages/ProjectList.vue";
import ProjectCreate from "./components/pages/ProjectCreate.vue";
import ProjectEdit from "./components/pages/ProjectEdit.vue";
import ProjectShow from "./components/pages/ProjectShow.vue";
import UserRegidtrationForm from "./components/pages/UserRegisterForm.vue";

axios.defaults.baseURL = "http://localhost:8180";
const app = createApp(App);
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: ProjectList,
      children: [
        {
          path: "users",
          component: UserRegidtrationForm,
        },
      ],
    },
    { path: "/create", component: ProjectCreate },
    { path: "/edit/:id", component: ProjectEdit },
    { path: "/show/:id", component: ProjectShow },
    { path: "/modal", component: UserRegidtrationForm },
  ],
});

createApp(App).use(router).mount("#app");

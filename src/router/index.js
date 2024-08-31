import { createRouter, createWebHistory } from "vue-router";
import beforeEach from "./beforeEach";

import TheContainer from "../components/TheContainer.vue";

const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: "active-link",
  routes: [
    {
      path: "/",
      name: "login",
      component: () => import("../views/auth/LoginView.vue"),
    },
    {
      path: "/register",
      name: "Cadastro",
      component: () => import("../views/auth/RegisterView.vue"),
    },
    {
      path: "/recover-password/:hash",
      name: "recover-password",
      component: () => import("../views/auth/RecoverPassword.vue"),
    },

    {
      path: "/home",
      component: TheContainer,
      meta: { requiresAuth: true },
      children: [
        {
          path: "",
          name: "Disciplinas",
          component: () =>
            import("../views/INSTITUICAO/discipline/DisciplinesView.vue"),
        },
        {
          path: "/professors",
          name: "Professores",
          component: () =>
            import("../views/INSTITUICAO/professors/ProfessorsView.vue"),
        },
        {
          path: "/students",
          name: "Alunos",
          component: () =>
            import("../views/INSTITUICAO/students/StudentsView.vue"),
        },
      ],
    },
    {
      path: "/:catchAll(.*)*",
      component: () => import("../views/NotFound.vue"),
    },
  ],

  scrollBehavior() {
    return { top: 0 };
  },
});

router.beforeEach(beforeEach);

export default router;

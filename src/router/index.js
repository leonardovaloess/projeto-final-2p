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
          path: "/course/:course_id/disciplines",
          name: "Disciplinas",
          component: () =>
            import("../views/INSTITUICAO/disciplines/DisciplineView.vue"),
        },
        {
          path: "/course",
          name: "Cursos",
          component: () => import("../views/INSTITUICAO/course/CourseView.vue"),
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
        {
          path: "/profile",
          name: "Perfil",
          component: () => import("../views/user/UserView.vue"),
        },
        {
          path: "/myDisciplines",
          name: "Minhas Disciplinas",
          component: () =>
            import("../views/my-disciplines/MyDisciplinesView.vue"),
        },
        {
          path: "/myStudents",
          name: "Meus Alunos",
          component: () =>
            import("../views/my-disciplines/MyDisciplinesView.vue"),
        },
        {
          path: "/discipline/:disciplina_id",
          name: "Disciplina",
          component: () => import("../views/discipline/DisciplineView.vue"),
        },
      ],
    },
    {
      path: "/:catchAll(.*)*",
      name: "NotFound",
      component: () => import("../views/NotFound.vue"),
    },
    {
      path: "/401",
      name: "NotFound2",
      component: () => import("../views/NotFound2.vue"),
    },
  ],

  scrollBehavior() {
    return { top: 0 };
  },
});

router.beforeEach(beforeEach);

export default router;

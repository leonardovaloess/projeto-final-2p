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
      path: "/recover-password",
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
          path: "/myDisciplines/:curso_id",
          name: "Disciplinas do Curso",
          component: () =>
            import(
              "../views/my-course-disciplines/MyCourseDisciplinesView.vue"
            ),
        },
        {
          path: "/myCourses",
          name: "Meus Cursos",
          component: () => import("../views/my-courses/MyCoursesView.vue"),
        },
        {
          path: "/myStudents",
          name: "Meus Alunos",
          component: () => import("../views/my-students/MyStudentsView.vue"),
        },
        {
          path: "/student-performance/:aluno_id",
          name: "Desempenho do Aluno",
          component: () =>
            import("../views/student-performance/StudentPerformance.vue"),
        },

        {
          path: "/discipline/:disciplina_id",
          name: "Disciplina",
          component: () => import("../views/discipline/DisciplineView.vue"),
        },
        {
          path: "/task/:task_id",
          name: "Tarefa",
          component: () => import("../views/task/TaskView.vue"),
        },
        {
          path: "/task-board",
          name: "Quadro de Tarefas",
          component: () => import("../views/board/BoardView.vue"),
        },
        {
          path: "/warning/:warning_id",
          name: "Aviso",
          component: () => import("../views/warning/WarningView.vue"),
        },
        {
          path: "/submit/:submit_id",
          name: "Envio",
          component: () => import("../views/submit/SubmitView.vue"),
        },
        {
          path: "/grades",
          name: "Notas",
          component: () => import("../views/boletim/GradesContainer.vue"),
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

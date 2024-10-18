import { ref } from "vue";
const links1 = ref([
  {
    label: "Usuário",
    opened: true,
    childreen: [
      {
        name: "Perfil",
        path: "/profile",
      },
    ],
  },
]);

const links2 = ref([
  {
    label: "Home",
    opened: true,
    childreen: [
      {
        name: "Disciplinas",
        path: "/myDisciplines",
      },
      {
        name: "Alunos",
        path: "/myStudents",
      },
    ],
  },
  {
    label: "Usuário",
    opened: true,
    childreen: [
      {
        name: "Perfil",
        path: "/profile",
      },
    ],
  },
]);

const links3 = ref([
  {
    label: "Home",
    opened: true,
    childreen: [
      {
        name: "Cursos",
        path: "/course",
      },
      {
        name: "Professores",
        path: "/professors",
      },

      {
        name: "Alunos",
        path: "/students",
      },
    ],
  },
  {
    label: "Usuário",
    opened: true,
    childreen: [
      {
        name: "Perfil",
        path: "/profile",
      },
    ],
  },
]);

export { links1, links2, links3 };

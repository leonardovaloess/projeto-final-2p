import { ref } from "vue";

const links = ref([
  {
    label: "Home",
    opened: true,
    childreen: [
      {
        name: "Disciplinas",
        path: "/home",
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
        path: "/home/profile",
      },
    ],
  },
]);

export default links;

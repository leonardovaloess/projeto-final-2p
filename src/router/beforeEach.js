export default async (to) => {
  // Define o título da página (opcional)
  // document.title = `${to.name} - TCE PR`;

  const token = localStorage.getItem("token-auth");
  const user_type_id = localStorage.getItem("user_type_id");

  // Mapeamento de rotas permitidas por tipo de usuário
  const userRoutes = {
    1: [
      "Perfil",
      "Disciplina",
      "Tarefa",
      "Aviso",
      "Meus Cursos",
      "Disciplinas do Curso",
      "Quadro de Tarefas",
    ], // Rotas permitidas para user_type_id = 1
    2: [
      "Perfil",
      "Minhas Disciplinas",
      "Disciplina",
      "Meus Alunos",
      "Desempenho do Aluno",
      "Tarefa",
      "Aviso",
    ], // Rotas permitidas para user_type_id = 2
    3: ["Cursos", "Alunos", "Professores", "Perfil", "Disciplinas"], // Rotas permitidas para user_type_id = 3
  };

  // Redireciona para o home se estiver logado e tentar acessar a página de login
  if (to.name === "login" && token) {
    return { path: `/profile` };
  }

  // Verifica se a rota exige autenticação
  if (to.meta.requiresAuth) {
    if (!token) {
      return { name: "login" }; // Redireciona para login se não estiver autenticado
    }

    // Verifica se o tipo de usuário tem permissão para acessar a rota
    const allowedRoutes = userRoutes[user_type_id] || [];
    if (!allowedRoutes.includes(to.name)) {
      return { name: "NotFound2" }; // Redireciona para uma página de erro de permissão
    }

    return true;
  }

  return true; // Permite navegação para rotas que não exigem autenticação
};

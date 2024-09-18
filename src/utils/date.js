function formatDate(isoString) {
  // Cria um objeto Date a partir da string ISO
  const date = new Date(isoString);

  // Extrai o dia, mês e ano
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Mês é zero-indexado
  const year = date.getFullYear();

  // Formata a data no padrão dd/mm/yyyy
  return `${day}/${month}/${year}`;
}

export default formatDate;

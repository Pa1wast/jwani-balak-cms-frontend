export async function getKleshNotes(companyId: string, page = 1, limit = 10000) {
  const apiUrl = `http://localhost:8080/invoice?companyId=${companyId}&page=${page}&limit=${limit}`;
  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error('Could not get klesh notes');
  }

  const data = await response.json();

  return data;
}

export async function getKleshNotes(companyId: string, page = 1, limit = 10000) {
  const apiUrl = `http://85.217.171.125:8080/klesh?companyId=${companyId}&page=${page}&limit=${limit}`;
  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error('Could not get klesh notes');
  }

  const data = await response.json();

  return data;
}

export async function getCompanies(page = 1, limit = 10000) {
  const apiUrl = `http://localhost:8080/company?page=${page}&limit=${limit}`;
  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error('Could not get companies');
  }

  const data = await response.json();

  return data;
}

export async function getCompanies() {
  const apiUrl = 'http://85.217.171.125:8080/company?page=1&limit=10000';
  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error('Could not get companies');
  }

  const data = await response.json();

  return data;
}

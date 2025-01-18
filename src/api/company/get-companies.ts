export async function getCompanies() {
  const apiUrl = 'http://localhost:8080/company';
  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error('Could get companies');
  }

  const data = await response.json();

  return data;
}

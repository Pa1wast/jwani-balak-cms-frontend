export async function getCompany(companyId: string) {
  const apiUrl = `http://localhost:8080/company/${companyId}`;
  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error('Could get company');
  }

  const data = await response.json();

  return data;
}

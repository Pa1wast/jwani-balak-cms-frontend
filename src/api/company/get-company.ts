export async function getCompany(companyId: string) {
  const apiUrl = `http://85.217.171.125:8080/company/${companyId}`;
  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error('Could not get company');
  }

  const data = await response.json();

  return data;
}

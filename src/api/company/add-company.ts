import { NewCompany } from '@/types/company';

export async function addCompanyApi(newCompany: NewCompany) {
  const apiUrl = 'http://localhost:8080/company';

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newCompany),
  });

  if (!response.ok) {
    throw new Error('Could not add company');
  }

  const data = await response.json();

  return data;
}

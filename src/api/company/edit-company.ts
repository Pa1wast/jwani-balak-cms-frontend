import { NewCompany } from '@/types/company';

export async function editCompanyApi({
  companyId,
  updatedCompany,
}: {
  companyId: string;
  updatedCompany: NewCompany;
}) {
  const apiUrl = `http://localhost:8080/company/${companyId}`;

  const response = await fetch(apiUrl, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedCompany),
  });

  if (!response.ok) {
    throw new Error('Could not update company');
  }

  const data = await response.json();

  return data;
}

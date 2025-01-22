import { NewCompany } from '@/types/company';

export async function updateCompanyApi({
  companyId,
  updatedCompany,
}: {
  companyId: string;
  updatedCompany: NewCompany;
}) {
  const apiUrl = `http://localhost:8080/company/${companyId}`;

  const formData = new FormData();
  formData.append('companyName', updatedCompany.companyName);
  formData.append('address', updatedCompany.address);

  if (updatedCompany.logo) {
    formData.append('logo', updatedCompany.logo);
  }

  const response = await fetch(apiUrl, {
    method: 'PATCH',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Could not update company');
  }

  const data = await response.json();

  return data;
}

import { NewCompany } from '@/types/company';

export async function addCompanyApi(newCompany: NewCompany) {
  const apiUrl = 'http://localhost:8080/company';

  const formData = new FormData();
  formData.append('companyName', newCompany.companyName);
  formData.append('address', newCompany.address);

  if (newCompany.logo) {
    formData.append('logo', newCompany.logo);
  }

  const response = await fetch(apiUrl, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Could not add company');
  }

  const data = await response.json();

  return data;
}

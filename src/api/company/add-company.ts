import { API_URL } from '@/lib/api-url';
import { NewCompany } from '@/types/company';

export async function addCompanyApi(newCompany: NewCompany) {
  const apiUrl = `${API_URL}/company`;

  const formData = new FormData();
  formData.append('companyName', newCompany.companyName);
  formData.append('address', newCompany.address);

  if (newCompany.logo) {
    formData.append('logo', newCompany.logo);
  }

  const response = await fetch(apiUrl, {
    method: 'POST',
    credentials: 'include',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Could not add company');
  }

  const data = await response.json();

  return data;
}

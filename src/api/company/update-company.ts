import { API_URL } from '@/lib/api-url';
import { NewCompany } from '@/types/company';

export async function updateCompanyApi({
  companyId,
  updatedCompany,
}: {
  companyId: string;
  updatedCompany: NewCompany;
}) {
  const apiUrl = `${API_URL}/company/${companyId}`;

  const formData = new FormData();
  formData.append('companyName', updatedCompany.companyName);
  formData.append('address', updatedCompany.address);

  if (updatedCompany.logo) {
    formData.append('logo', updatedCompany.logo);
  }

  const response = await fetch(apiUrl, {
    method: 'PATCH',
    credentials: 'include',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Could not update company');
  }

  const data = await response.json();

  return data;
}

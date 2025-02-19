import { API_URL } from '@/lib/api-url';

export async function getTransactions(companyId: string, page = 1, limit = 10000) {
  const apiUrl = `${API_URL}/transaction?companyId=${companyId}&page=${page}&limit=${limit}`;
  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error('Could not get transactions');
  }

  const data = await response.json();

  return data;
}

import { API_URL } from '@/lib/api-url';

export async function getExchangeRateApi() {
  const apiUrl = `${API_URL}/exchange`;
  const response = await fetch(apiUrl, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Could not get exchange rate');
  }

  const data = await response.json();

  return data;
}

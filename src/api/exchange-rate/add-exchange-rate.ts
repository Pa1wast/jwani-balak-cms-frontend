import { API_URL } from '@/lib/api-url';

export async function addExchangeRateApi(exchangeRate: number) {
  const apiUrl = `${API_URL}/exchange`;
  const response = await fetch(apiUrl, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ rate: exchangeRate }),
  });

  if (!response.ok) {
    throw new Error('Could not add exchange rate');
  }

  const data = await response.json();

  return data;
}

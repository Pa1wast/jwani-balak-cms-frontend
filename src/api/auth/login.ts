import { API_URL } from '@/lib/api-url';

export async function loginApi(passcode: string) {
  const response = await fetch(API_URL, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ passcode }),
  });

  if (!response.ok) {
    throw new Error('Could not login');
  }

  const data = await response.json();

  return data;
}

export async function loginApi(passcode: string) {
  const apiUrl = 'http://localhost:8085';

  const response = await fetch(apiUrl, {
    method: 'POST',
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

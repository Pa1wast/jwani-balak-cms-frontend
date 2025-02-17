import bcrypt from 'bcryptjs';

export async function loginApi(passcode: string) {
  const apiUrl = 'http://localhost:8080/login';

  const hashedPasscode = await bcrypt.hash(passcode, 10);

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ hashedPasscode }),
  });

  if (!response.ok) {
    throw new Error('Could not login');
  }

  const data = await response.json();

  return data;
}

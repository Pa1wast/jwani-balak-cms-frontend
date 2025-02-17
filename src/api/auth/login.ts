export async function loginApi(passcode) {
  const apiUrl = 'http://localhost:8080/login';

  const hashedPasscode = await bcrypt.hash(password, 10);

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ passcode: 'passcode1234' }),
  });

  if (!response.ok) {
    throw new Error('Could not login');
  }

  const data = await response.json();

  return data;
}

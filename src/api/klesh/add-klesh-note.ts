import { API_URL } from '@/lib/api-url';
import { NewKleshNote } from '@/types/klesh-note';

export async function addKleshNoteApi(newKleshNote: NewKleshNote) {
  const apiUrl = `${API_URL}/klesh`;

  const response = await fetch(apiUrl, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newKleshNote),
  });

  if (!response.ok) {
    throw new Error('Could not add klesh note');
  }

  const data = await response.json();

  return data;
}

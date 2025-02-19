import { API_URL } from '@/lib/api-url';

export async function getKleshNote(kleshNoteId: string) {
  const apiUrl = `${API_URL}/klesh/${kleshNoteId}`;
  const response = await fetch(apiUrl, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Could not get klesh note');
  }

  const data = await response.json();

  return data;
}

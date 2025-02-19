import { API_URL } from '@/lib/api-url';

export async function getKleshNote(kleshNoteId: string) {
  const apiUrl = `${API_URL}/klesh/${kleshNoteId}`;
  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error('Could not get klesh note');
  }

  const data = await response.json();

  return data;
}

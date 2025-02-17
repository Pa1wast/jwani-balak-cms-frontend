import { NewKleshNote } from '@/types/klesh-note';

export async function addKleshNoteApi(newKleshNote: NewKleshNote) {
  const apiUrl = 'http://85.217.171.125:8080/klesh';

  const response = await fetch(apiUrl, {
    method: 'POST',
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

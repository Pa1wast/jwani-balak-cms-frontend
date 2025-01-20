import { NewKleshNote } from '@/types/klesh-note';

export async function addKleshNoteApi(newKleshNote: NewKleshNote) {
  const apiUrl = 'http://localhost:8080/klesh';

  console.log(newKleshNote);

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

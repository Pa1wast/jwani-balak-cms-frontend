import { UpdatedKleshNote } from '@/types/klesh-note';

export async function updateKleshNoteApi({
  kleshNoteId,
  updatedKleshNote,
}: {
  kleshNoteId: string;
  updatedKleshNote: UpdatedKleshNote;
}) {
  const apiUrl = `http://85.217.171.125:8080/klesh/${kleshNoteId}`;

  const response = await fetch(apiUrl, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedKleshNote),
  });

  if (!response.ok) {
    throw new Error('Could not update klesh note');
  }

  const data = await response.json();

  return data;
}

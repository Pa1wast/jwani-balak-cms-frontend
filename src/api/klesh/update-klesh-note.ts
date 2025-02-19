import { API_URL } from '@/lib/api-url';
import { UpdatedKleshNote } from '@/types/klesh-note';

export async function updateKleshNoteApi({
  kleshNoteId,
  updatedKleshNote,
}: {
  kleshNoteId: string;
  updatedKleshNote: UpdatedKleshNote;
}) {
  const apiUrl = `${API_URL}/klesh/${kleshNoteId}`;

  const response = await fetch(apiUrl, {
    method: 'PATCH',
    credentials: 'include',
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

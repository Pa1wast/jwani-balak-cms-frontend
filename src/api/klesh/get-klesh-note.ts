export async function getKleshNote(kleshNoteId: string) {
  const apiUrl = `http://localhost:8080/klesh/${kleshNoteId}`;
  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error('Could not get klesh note');
  }

  const data = await response.json();

  return data;
}

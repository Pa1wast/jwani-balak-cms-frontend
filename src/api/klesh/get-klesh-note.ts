export async function getKleshNote(kleshNoteId: string) {
  const apiUrl = `http://85.217.171.125:8080/klesh/${kleshNoteId}`;
  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error('Could not get klesh note');
  }

  const data = await response.json();

  return data;
}

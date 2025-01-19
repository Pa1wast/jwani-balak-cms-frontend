export async function deleteKleshNoteApi(kleshNoteId: string) {
  const apiUrl = `http://localhost:8080/klesh/${kleshNoteId}`;
  console.log('lol');
  const response = await fetch(apiUrl, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Could not delete klesh note');
  }

  if (response.status !== 204) {
    const data = await response.json();
    return data;
  }

  return {};
}

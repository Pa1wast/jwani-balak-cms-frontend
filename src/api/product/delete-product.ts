export async function deleteProductApi(productId: string) {
  const apiUrl = `http://localhost:8080/product/${productId}`;

  const response = await fetch(apiUrl, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Could not delete product');
  }

  if (response.status !== 204) {
    const data = await response.json();
    return data;
  }

  return {};
}

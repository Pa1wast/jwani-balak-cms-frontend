export function stripHtmlTags(content: string) {
  const div = document.createElement('div');
  div.innerHTML = content;
  return div.innerText || div.textContent || '';
}

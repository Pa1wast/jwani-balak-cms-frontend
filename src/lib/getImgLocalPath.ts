import { API_URL } from './api-url';

export function getCompanyImgLocalPath(image: string) {
  return `${API_URL}/img/${image}`;
}

export function getUploadedInvoiceImgLocalPath(image: string) {
  return `${API_URL}/uploadedInvoicesImg/${image}`;
}

export function isImage(filePath: string): boolean {
  const imageExtensions = [
    '.jpg',
    '.jpeg',
    '.png',
    '.gif',
    '.bmp',
    '.webp',
    '.svg',
    '.tiff',
    '.ico',
  ];

  const lowerCasePath = filePath.toLowerCase();

  return imageExtensions.some(ext => lowerCasePath.endsWith(ext));
}

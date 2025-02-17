export function getCompanyImgLocalPath(image: string) {
  return `http://85.217.171.125:8080/img/${image}`;
}

export function getUploadedInvoiceImgLocalPath(image: string) {
  return `http://85.217.171.125:8080/uploadedInvoicesImg/${image}`;
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

export function getPastMonths(range: number) {
  const months = [];
  const date = new Date();
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  if (range === 0) {
    return monthNames;
  }

  for (let i = 0; i < range; i++) {
    months.unshift(monthNames[date.getMonth()]);
    date.setMonth(date.getMonth() - 1);
  }

  return months;
}

export function formatDate(dateString: string) {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

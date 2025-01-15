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
    return monthNames; // Return all months if range is 0
  }

  for (let i = 0; i < range; i++) {
    months.unshift(monthNames[date.getMonth()]);
    date.setMonth(date.getMonth() - 1);
  }

  return months;
}

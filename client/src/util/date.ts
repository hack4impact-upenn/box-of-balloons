function formatDate(rawDate: string) {
  if (!rawDate) {
    return '';
  }

  const date = new Date(rawDate);

  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
}

// eslint-disable-next-line import/prefer-default-export
export { formatDate };

export function convertDate(date) {
  const newDate = new Date(date);
  return newDate.toString().substring(0, 21);
}

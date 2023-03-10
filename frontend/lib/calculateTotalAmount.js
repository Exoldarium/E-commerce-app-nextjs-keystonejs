export function calculateTotalAmount(amount) {
  return amount.reduce((tally, number) => tally + number.quantity, 0);
}

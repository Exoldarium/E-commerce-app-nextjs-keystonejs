function formatMoney(cents: number) {
  const currency = {
    style: 'currency',
    currency: 'USD',
  };
  const amount = cents / 100;

  const formatter = new Intl.NumberFormat('en-US', currency).format(amount);
  return formatter;
}

export default formatMoney;
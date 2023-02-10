function formatMoney(input) {
  const currency = {
    style: 'currency',
    currency: 'USD',
  };
  const amount = input / 100;

  const formatter = new Intl.NumberFormat('en-US', currency).format(amount);
  return formatter;
}

export default formatMoney;

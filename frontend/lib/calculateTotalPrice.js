export default function calculateTotalPrice(cartItems) {
  return cartItems.reduce((tally, cartItem) => {
    if (!cartItem.product) {
      return tally;
    }
    return tally + cartItem.quantity * cartItem.product.price;
  }, 0);
}

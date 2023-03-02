import { KeystoneContext } from "@keystone-6/core/types";

async function removeFromCart(
  root: any,
  { productId }: { productId: string },
  context: KeystoneContext,
) {
  console.log("removing from cart");
  const session = context.session;

  if (session) {
    // query current users cart
    const allCartItems = await context.db.CartItem.findMany({
      where: {
        user: { id: { equals: session.itemId } },
        product: { id: { equals: productId } },
      }
    })

    const [existingCartItem] = allCartItems;
    // if the current item is in the cart, decrease quantity by 1
    if (existingCartItem) {
      console.log(existingCartItem);
      console.log(
        `There are already ${existingCartItem.quantity} items in your cart`
      );
      return context.db.CartItem.updateOne({
        where: { id: existingCartItem.id },
        data: { quantity: existingCartItem.quantity - 1 },
      });
    }
  }
}

export default removeFromCart;
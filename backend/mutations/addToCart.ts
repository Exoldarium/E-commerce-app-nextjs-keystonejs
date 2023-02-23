import { KeystoneContext } from "@keystone-6/core/types";

async function addToCart(
  root: any,
  { productId }: { productId: string },
  context: KeystoneContext,
) {
  console.log("adding to cart");
  const session = context.session;

  // check if the user is logged in
  if (!session.itemId) {
    throw new Error('You must be logged in to do this');
  }

  // query current users cart
  const allCartItems = await context.db.CartItem.findMany({
    where: {
      user: { id: { equals: session.itemId } },
      product: { id: { equals: productId } },
    }
  })

  const [existingCartItem] = allCartItems;
  // if the current item is in the cart, increment quantity by 1
  if (existingCartItem) {
    console.log(existingCartItem);
    console.log(
      `There are already ${existingCartItem.quantity} items in your cart`
    );
    return context.db.CartItem.updateOne({
      where: { id: existingCartItem.id },
      data: { quantity: existingCartItem.quantity + 1 },
    });
  }
  // if it isnt, create a new cart item
  return context.db.CartItem.createOne({
    data: {
      product: { connect: { id: productId } },
      user: { connect: { id: session.itemId } },
    },
  });
}

export default addToCart;
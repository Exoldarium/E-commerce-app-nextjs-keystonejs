import { KeystoneContext } from "@keystone-6/core/types";
import stripeConfig from "../lib/stripe";

interface Arguments {
  token: string
}

async function checkout(
  root: any,
  { token }: Arguments,
  context: KeystoneContext,
) {
  const session = context.session;

  if (!session) {
    throw new Error('Sorry you must be signed in to do this!');
  }

  // query the current user
  const user = await context.query.User.findOne({
    where: { id: session.itemId },
    query: 'id name email cart { id quantity product { name price description id photo { id image { id publicUrlTransformed } } } }',
  });
  console.dir(user, { depth: null });

  // filter the the object then calculate the total price
  const cartItems: any[] = user.cart.filter((cartItem: any) => cartItem.product);
  const amount = cartItems.reduce(function (tally, cartItem) {
    return tally + cartItem.quantity * cartItem.product.price;
  }, 0);
  console.log(amount);

  // create charge using stripe
  const charge = await stripeConfig.paymentIntents.create({
    amount,
    currency: 'USD',
    confirm: true,
    payment_method: token,
  }).catch(
    err => {
      console.log(err);
      throw new Error(err.message);
    });
  console.log(charge);

  // map the order items to the cart so we can pass it to Order.ts
  const orderItems = cartItems.map((cartItem) => {
    const orderItem = {
      name: cartItem.product.name,
      description: cartItem.product.description,
      price: cartItem.product.price,
      quantity: cartItem.quantity,
      photo: { connect: { id: cartItem.product.photo.id } },
    }
    return orderItem;
  });

  // create the order
  const order = await context.db.Order.createOne({
    data: {
      total: charge.amount,
      charge: charge.id,
      items: { create: orderItems },
      user: { connect: { id: session.itemId } },
    }
  });

  // delete cart items if the checkout is success
  await context.query.CartItem.deleteMany({
    where: user.cart.map((cartItem: any) => ({ id: cartItem.id })),
  });

  return order;
}

export default checkout;
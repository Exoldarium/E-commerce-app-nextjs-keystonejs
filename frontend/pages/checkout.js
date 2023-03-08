// import Head from 'next/head';
// import { useUser } from '../components/User';

// export function CartItem({ item }) {
//   return (
//     <div>
//       <p>{item.product.name}</p>
//       <p>{item.quantity}</p>
//       <p>{item.product.price}</p>
//     </div>
//   );
// }

// export default function CheckoutPage() {
//   const user = useUser();
//   const cartItems = user?.cart;
//   console.log(cartItems);
//   return (
//     <>
//       <Head>
//         <title>56 Sugar Gumpaste</title>
//       </Head>
//       {cartItems.map((cartItem) => (
//         <CartItem id={cartItem.id} item={cartItem} />
//       ))}
//     </>
//   );
// }

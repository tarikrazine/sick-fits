/* eslint-disable */
import type { KeystoneContext } from '@keystone-6/core/types';

async function addToCart(
  root: any,
  { productID }: { productID: string },
  context: KeystoneContext
): Promise<any> {
  const session = context.session;

  if (!session.itemId) {
    throw new Error('You must be logged in to do this!');
  }

  console.log('session.itemId', session.itemId);
  console.log('productID', productID);

  const allCartItems = await context.prisma.cartItem.findMany({
    where: {
      user: { id: session.itemId },
      product: { id: productID },
    },
  });

  const [cartItem] = allCartItems;

  if (cartItem) {
    console.log(`There are already ${cartItem.quantity}, increment by 1!`);

    return context.prisma.cartItem.update({
      where: {
        id: cartItem.id,
      },
      data: {
        quantity: cartItem.quantity + 1,
      },
    });
  }

  // No cart item found, create a new one!

  return context.prisma.cartItem.create({
    data: {
      product: { connect: { id: productID } },
      user: { connect: { id: session.itemId } },
    },
  });
}

export default addToCart;

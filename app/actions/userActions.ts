'use server';

import { connectMongo } from '../lib/db';
import UserCart from '../mongodb/models/cart';
import { getAuthSession } from '../api/auth/[...nextauth]/route';

type CartItem = {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
  };

// Save Cart Data
export const saveCart = async (cart: CartItem[]) => {
  const session = await getAuthSession();
  if(!session){
    return;
  }
  await connectMongo();
  try {
    const existingUserCart = await UserCart.findOne({ email: session.user?.email });
    if (existingUserCart) {
      existingUserCart.cart = cart;
      await existingUserCart.save();
    } else {
      const newUserCart = new UserCart({ email:session.user?.email, cart });
      await newUserCart.save();
    }
    return { message: 'Cart saved successfully' };
  } catch (error) {
    console.error('Error saving cart:', error);
    throw new Error('Error saving cart');
  }
};

// Fetch Cart Data
export const fetchCart = async () => {
  const session = await getAuthSession();
  if(!session){
    return;
  }
  await connectMongo();
  try {
    const userCart = await UserCart.findOne({ email: session.user?.email });
    return userCart ? JSON.parse(JSON.stringify(userCart?.cart)) : [];
  } catch (error) {
    console.error('Error fetching cart:', error);
    throw new Error('Error fetching cart');
  }
};
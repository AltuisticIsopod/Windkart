'use server';
import { v4 as uuidv4 } from 'uuid';
import { connectMongo } from '../lib/db';
import UserCart from '../mongodb/models/cart';
import UserOrder from '../mongodb/models/order';
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

export const fetchOrders = async () => {
  const session = await getAuthSession();
  if(!session){
    return;
  }
  await connectMongo();
  try {
    const userOrder = await UserOrder.findOne({ email: session.user?.email });
    console.log(userOrder,"sfdfd");
    return userOrder ? JSON.parse(JSON.stringify(userOrder?.orders)) : [];
  } catch (error) {
    console.error('Error fetching order:', error);
    throw new Error('Error fetching order');
  }
};

export const checkoutOrder = async (items: CartItem[],orderTotal:number) => {
  const session = await getAuthSession();
  if (!session) {
    return { message: 'User not authenticated' };
  }
  await connectMongo();
  try {
    const existingUserOrders = await UserOrder.findOne({ email: session.user?.email });
    const newOrder = {
      id: uuidv4(),
      items:items,
      orderTotal:orderTotal
    };
    if (existingUserOrders) {
      existingUserOrders.orders.push(newOrder);
      await existingUserOrders.save();
    } else {
      // Create a new record if no previous orders exist
      const newUserOrder = new UserOrder({
        email: session.user?.email,
        orders: [newOrder],
      });
      await newUserOrder.save();
    }
    return { message: 'Order Placed successfully' };
  } catch (error) {
    console.error('Error saving order:', error);
    throw new Error('Error saving order');
  }
};
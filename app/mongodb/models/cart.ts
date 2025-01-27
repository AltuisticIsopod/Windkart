import mongoose, { Schema, Document } from 'mongoose';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface UserCart extends Document {
  email: string;
  cart: CartItem[];
}
export const CartItemSchema = new Schema<CartItem>({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  image: { type: String, required: true },
});

const UserCartSchema = new Schema<UserCart>({
  email: { type: String, required: true, unique: true },
  cart: [CartItemSchema],
});

export default mongoose.models.UserCart || mongoose.model<UserCart>('UserCart', UserCartSchema);
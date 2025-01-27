import mongoose, { Schema, Document } from 'mongoose';
import { CartItem,CartItemSchema } from './cart';


export interface OrderItem {
    id: String;
    items: CartItem[];
    orderTotal: number;
}

// export interface OrderItem {
//   id: number;
//   order: Order; 
// }

export interface UserOrder extends Document {
  email: string;
  orders: OrderItem[];
}

const OrderItemSchema = new Schema<OrderItem>({
  id: { type: String, required: true },
  items: [CartItemSchema],
  orderTotal:{type:Number,required:true}
});

const UserOrderSchema = new Schema<UserOrder>({
  email: { type: String, required: true, unique: true },
  orders: [OrderItemSchema],
});

export default mongoose.models.UserOrder || mongoose.model<UserOrder>('UserOrder', UserOrderSchema);
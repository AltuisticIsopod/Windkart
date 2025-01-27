"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect
} from "react";
import { saveCart,fetchCart } from "../actions/userActions";

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

type CartContextType = {
  cart: CartItem[];
  setCart: (cart: CartItem[]) => void;
  addToCart: (item: CartItem) => Promise<void>;
  removeFromCart: (id: number) => Promise<void>;
  clearCart: () => Promise<void>;
  onLoad:()=>Promise<CartItem[]>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const onLoad= async () =>{
    const res = await fetchCart();
    setCart(res||[]);
    return res;
  }
  useEffect(()=>{
    onLoad();
  },[])

  const addToCart = async (item: CartItem) => {
    const existingItem = cart.find((i) => i.id === item.id);
    let updatedCart;
    if (existingItem) {
      updatedCart = cart.map((i) =>
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      );
    } else {
      updatedCart = [...cart, { ...item, quantity: 1 }];
    }
    setCart(updatedCart);
    try {
      await saveCart(updatedCart);
    } catch (error) {
      console.error("Failed to save cart:", error);
    }
  };

  const removeFromCart = async (id: number) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    try {
      await saveCart(updatedCart);
    } catch (error) {
      console.error("Failed to save cart:", error);
    }
  };

  // Clear the entire cart
  const clearCart = async () => {
    const updatedCart: CartItem[] = [];
    setCart(updatedCart);
    try {
      await saveCart(updatedCart);
    } catch (error) {
      console.error("Failed to save cart:", error);
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, setCart, addToCart, removeFromCart, clearCart, onLoad }}
    >
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
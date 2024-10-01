"use client"
import { useCart } from '../context/CartContext';

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();

  const handleCheckout = () => {
    alert('Order placed successfully!');
    clearCart();
  };

  return (
    <div>
      <h1>Checkout</h1>
      <h2>Order Summary</h2>
      {cart?.map((item) => (
        <div key={item.id}>
          <h3>{item.name}</h3>
          <p>${item.price}</p>
          <p>Quantity: {item.quantity}</p>
        </div>
      ))}
      <button onClick={handleCheckout}>Place Order</button>
    </div>
  );
}
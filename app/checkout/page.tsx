"use client";
import { useCart } from '../context/CartContext';
import Link from 'next/link';

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();

  // Calculate the total price
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = () => {
    alert('Order placed successfully!');
    clearCart();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      <h1 className="text-4xl font-bold mb-6 text-blue-600">Checkout</h1>

      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-3xl">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Order Summary</h2>

        {/* Cart Items */}
        {cart.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between border-b pb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-gray-600">Price: ${item.price.toFixed(2)}</p>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                </div>
                <div className="text-lg font-semibold text-gray-800">
                  ${ (item.price * item.quantity).toFixed(2) }
                </div>
              </div>
            ))}

            {/* Total Price */}
            <div className="flex justify-between items-center mt-6 border-t pt-4">
              <h2 className="text-xl font-semibold text-gray-800">Total:</h2>
              <p className="text-xl font-semibold text-gray-800">${totalPrice.toFixed(2)}</p>
            </div>

            {/* Checkout Button */}
            <div className="flex justify-between mt-8">
              <Link href="/cart">
                <button className="px-6 py-3 bg-gray-500 text-white font-semibold rounded-full hover:bg-gray-600 transition duration-300">
                  Back to Cart
                </button>
              </Link>
              <button
                onClick={handleCheckout}
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition duration-300"
              >
                Place Order
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
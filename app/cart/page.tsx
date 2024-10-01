"use client";
import { useCart } from "../context/CartContext";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  // Calculate the total price
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      <h1 className="text-4xl font-bold mb-8 text-blue-600">Your Cart</h1>
      {cart.length === 0 ? (
        <p className="text-gray-600 text-lg">Your cart is empty</p>
      ) : (
        <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-3xl">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between mb-6 border-b pb-4"
            >
              <div className="flex items-center">
                <div className="w-16 h-16 bg-gray-200 rounded-lg mr-4 flex-shrink-0">
                  <picture>
                    <img
                      src={item.image || "/placeholder.png"}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </picture>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {item.name}
                  </h2>
                  <p className="text-gray-600">
                    Price: ${item.price.toFixed(2)}
                  </p>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700 font-semibold transition duration-300"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="flex justify-between items-center mt-6 border-t pt-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Total: ${totalPrice.toFixed(2)}
            </h2>
          </div>

          <div className="flex justify-between mt-8">
            <button
              onClick={clearCart}
              className="px-6 py-3 bg-red-500 text-white font-semibold rounded-full hover:bg-red-600 transition duration-300"
            >
              Clear Cart
            </button>
            <Link href="/checkout">
              <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition duration-300">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

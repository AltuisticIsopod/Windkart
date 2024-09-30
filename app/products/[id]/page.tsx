'use client';

import { useParams, useRouter } from 'next/navigation';
import { useCart } from '../../context/CartContext';

const products = [
  { id: 1, name: 'Product 1', price: 100, quantity: 0 },
  { id: 2, name: 'Product 2', price: 200, quantity: 0 },
];

export default function ProductPage() {
  const router = useRouter();
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  const { addToCart } = useCart();

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <h1 className="text-2xl font-bold text-red-600">Product Not Found</h1>
          <button
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300"
            onClick={() => router.push('/products')}
          >
            Go Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">{product.name}</h1>
        <p className="text-xl text-gray-800 mb-4">${product.price}</p>
        <p className="text-gray-600 mb-6">
          This is a great product that you can add to your cart. It&apos;s a fantastic choice for anyone looking for quality and value.
        </p>
        <button
          onClick={() => addToCart(product)}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
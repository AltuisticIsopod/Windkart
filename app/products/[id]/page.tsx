"use client";

import { useParams, useRouter } from "next/navigation";
import { useProductStore } from "../../store/ProductStore"; // Import Zustand store
import { useCart } from "../../context/CartContext";

export default function ProductPage() {
  const router = useRouter();
  const { id } = useParams(); // Get the dynamic product id from the URL
  const { getProductById } = useProductStore(); // Access the store to get product by id
  const product = getProductById(Number(id)); // Get the product using the id
  const { addToCart } = useCart();

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <h1 className="text-2xl font-bold text-red-600">Product Not Found</h1>
          <button
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300"
            onClick={() => router.push("/products")}
          >
            Go Back to Products
          </button>
        </div>
      </div>
    );
  }

  const cartItem = {
    id: product.id!,
    name: product.title!,
    price: product.price!,
    image: product.image!,
    quantity: 1,
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <picture>
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-64 object-cover mb-4"
          />
        </picture>
        <h1 className="text-3xl font-bold text-blue-600 mb-4">
          {product.title}
        </h1>
        <p className="text-xl text-gray-800 mb-4">${product.price}</p>
        <p className="text-gray-600 mb-6">{product.description}</p>
        <button
          onClick={() => addToCart(cartItem)} // Pass the cartItem to addToCart
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

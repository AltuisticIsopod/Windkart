"use client";

import { useRouter } from "next/navigation"; 
import { useCart } from "../context/CartContext"; 

interface ProductCardProps {
  id: number;
  title: string;
  price: number;
  image: string;
}

export default function ProductCard({ id, title, price, image }: ProductCardProps) {
  const { addToCart } = useCart();
  const router = useRouter();

  const handleAddToCart = () => {
    const productToAdd = {
      id,
      name: title,
      price,
      quantity: 1,
      image,
    };

    addToCart(productToAdd);
  };

  const handleViewDetails = () => {
    router.push(`/products/${id}`); 
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer transform hover:scale-105 flex flex-col h-full">
      <div onClick={handleViewDetails} className="cursor-pointer">
        <picture>
          <img
            src={image}
            alt={title}
            className="w-full h-48 object-cover mb-4 rounded-lg"
          />
        </picture>
      </div>
      <div className="flex-grow">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
        <p className="text-lg text-gray-600 mb-4">${price}</p>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={handleViewDetails}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300"
        >
          View Details
        </button>
        <button
          onClick={handleAddToCart}
          className="w-full bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition duration-300"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
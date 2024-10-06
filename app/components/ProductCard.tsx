"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext"; // Import your CartContext

interface ProductCardProps {
  id: number;
  title: string;
  price: number;
  image: string;
}

export default function ProductCard({id,title,price,image}: ProductCardProps) {
  const { addToCart } = useCart();

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

  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer transform hover:scale-105 flex flex-col h-full">
      <Link href={`/products/${id}`}>
        <picture>
          {" "}
          <img
            src={image}
            alt={title}
            className="w-full h-48 object-cover mb-4 rounded-lg"
          />
        </picture>
      </Link>
      <div className="flex-grow">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
        <p className="text-lg text-gray-600 mb-4">${price}</p>
      </div>
      <div className="flex space-x-2">
        <Link href={`/products/${id}`} className="w-full">
          <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300">
            View Details
          </button>
        </Link>
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

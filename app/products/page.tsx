'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function ProductListPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("null");

  // Fetch product data from FakeStoreAPI when component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        setError("error");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-4xl font-bold text-blue-600 text-center mb-8">
          Our Products
        </h1>
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`}>
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer transform hover:scale-105 flex flex-col h-full">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-cover mb-4 rounded-lg"
                />
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {product.title}
                </h2>
                <p className="text-lg text-gray-600 mb-4">${product.price}</p>
                <div className="mt-auto">
                  <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300">
                    View Details
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div> */}
      </div>
    </div>
  );
}
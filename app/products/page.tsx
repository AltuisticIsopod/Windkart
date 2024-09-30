import Link from 'next/link';

const products = [
  { id: 1, name: 'Product 1', price: 100 },
  { id: 2, name: 'Product 2', price: 200 },
  // Add more products as needed
];

export default function ProductListPage() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-4xl font-bold text-blue-600 text-center mb-8">
          Our Products
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`}>
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer transform hover:scale-105">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {product.name}
                </h2>
                <p className="text-lg text-gray-600 mb-4">${product.price}</p>
                <button className="mt-auto bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300">
                  View Details
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
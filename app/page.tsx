import Link from "next/link";
import Categories from "./components/Categories";

export default function HomePage() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-10 px-4">
        <div>
          <h1 className="text-4xl font-bold text-blue-600 text-center mb-5">
            Welcome to WindKart
          </h1>
          <p className="text-lg text-center text-gray-700 mb-5">
            Discover a variety of products and window shop to your heart&apos;s
            content!
          </p>
        </div>
      </div>
      <div className="mb-8">
        <Categories />
      </div>
      <div className="container mx-auto py-10 px-4" >
        <div>
          <Link href="/products">
            <div className="flex justify-center">
              <button className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 shadow-lg transition duration-300">
                Shop Now
              </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

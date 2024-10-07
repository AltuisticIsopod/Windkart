'use client';

import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { useSession, signIn, signOut } from 'next-auth/react';
import { FaUser } from 'react-icons/fa';
import { useState } from 'react';

const Navbar = () => {
  const { cart } = useCart();
  const { data: session, status } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false); 
  const totalQuantity = cart?.reduce((total, item) => total + item.quantity, 0);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleClickOutside = () => {
    setDropdownOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-blue-600 text-white p-4 shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-bold">
          <Link href="/" className="hover:text-gray-200">
            WindKart
          </Link>
        </div>
        <div className="space-x-4 flex items-center">
          <Link href="/" className="hover:text-gray-200">
            Home
          </Link>
          <Link href="/products" className="hover:text-gray-200">
            Products
          </Link>
          <Link href="/cart" className="relative hover:text-gray-200">
            Cart
            <span className="ml-1 px-2 py-1 rounded-full bg-red-500 text-white text-xs">
              {totalQuantity}
            </span>
          </Link>
          <div className="relative">
            {status === 'loading' ? (
              <div>Loading...</div>
            ) : session ? (
              <div>
                <button
                  onClick={toggleDropdown} 
                  className="hover:text-gray-200 flex items-center"
                >
                  {session.user?.image ? (
                    <picture>
                      <img
                      src={session.user.image}
                      alt="User Avatar"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    </picture>
                    
                  ) : (
                    <FaUser className="text-xl" />
                  )}
                  <span className="ml-2">{session.user?.name}</span>
                </button>
                {dropdownOpen && ( 
                  <div
                    className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-lg"
                    onBlur={handleClickOutside}
                  >
                    <Link href="/profile" className="block px-4 py-2 hover:bg-gray-200">
                      My Profile
                    </Link>
                    <button
                      onClick={() => {
                        signOut();
                        setDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => signIn()}
                className="hover:text-gray-200 flex items-center"
              >
                <FaUser className="text-xl" />
                <span className="ml-2">Login with Google</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
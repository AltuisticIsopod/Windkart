'use client'
import { useSession } from 'next-auth/react';

const ProfilePage = () => {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <p className="text-lg font-semibold text-gray-700">You are not logged in.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h1 className="text-4xl font-bold text-blue-600 mb-6 text-center">My Profile</h1>
        <div className="mb-6">
          <p className="text-lg font-semibold text-gray-800">Name:</p>
          <p className="text-lg text-gray-600">{session.user?.name}</p>
        </div>
        <div>
          <p className="text-lg font-semibold text-gray-800">Email:</p>
          <p className="text-lg text-gray-600">{session.user?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
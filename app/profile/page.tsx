'use client'
import { useSession } from 'next-auth/react';

const ProfilePage = () => {
  const { data: session } = useSession();

  if (!session) {
    return <p>You are not logged in.</p>;
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-6">My Profile</h1>
      <p className="text-lg mb-4">Name: {session.user?.name}</p>
      <p className="text-lg">Email: {session.user?.email}</p>
    </div>
  );
};

export default ProfilePage;
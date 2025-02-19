"use client"

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/authContext';

export default function AccountPage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  // Redirect if not logged in
  React.useEffect(() => {
    if (!user) {
      router.push('/account/login');
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Account</h1>
      
      <div className="bg-white shadow rounded-lg p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Profile Information</h2>
          <p className="text-gray-600">Email: {user.email}</p>
          <p className="text-gray-600">Name: {user.name}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Account Actions</h2>
          <button
            onClick={() => logout()}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

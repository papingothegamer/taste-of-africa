'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/authContext';
import { Button } from '../../components/ui/Button';
import { User, Settings, ShoppingBag, Heart, LogOut } from 'lucide-react';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('profile');

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (!user) {
    router.push('/account/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
          {/* Sidebar */}
          <aside className="py-6 px-2 sm:px-6 lg:py-0 lg:px-0 lg:col-span-3">
            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab('profile')}
                className={`${
                  activeTab === 'profile'
                    ? 'bg-gray-50 text-green-600 hover:bg-white'
                    : 'text-gray-900 hover:text-gray-900 hover:bg-gray-50'
                } group rounded-md px-3 py-2 flex items-center text-sm font-medium w-full`}
              >
                <User
                  className={`${
                    activeTab === 'profile' ? 'text-green-600' : 'text-gray-400'
                  } flex-shrink-0 -ml-1 mr-3 h-6 w-6`}
                />
                <span className="truncate">Profile</span>
              </button>

              <button
                onClick={() => setActiveTab('orders')}
                className={`${
                  activeTab === 'orders'
                    ? 'bg-gray-50 text-green-600 hover:bg-white'
                    : 'text-gray-900 hover:text-gray-900 hover:bg-gray-50'
                } group rounded-md px-3 py-2 flex items-center text-sm font-medium w-full`}
              >
                <ShoppingBag
                  className={`${
                    activeTab === 'orders' ? 'text-green-600' : 'text-gray-400'
                  } flex-shrink-0 -ml-1 mr-3 h-6 w-6`}
                />
                <span className="truncate">Orders</span>
              </button>

              <button
                onClick={() => setActiveTab('wishlist')}
                className={`${
                  activeTab === 'wishlist'
                    ? 'bg-gray-50 text-green-600 hover:bg-white'
                    : 'text-gray-900 hover:text-gray-900 hover:bg-gray-50'
                } group rounded-md px-3 py-2 flex items-center text-sm font-medium w-full`}
              >
                <Heart
                  className={`${
                    activeTab === 'wishlist' ? 'text-green-600' : 'text-gray-400'
                  } flex-shrink-0 -ml-1 mr-3 h-6 w-6`}
                />
                <span className="truncate">Wishlist</span>
              </button>

              <button
                onClick={handleLogout}
                className="text-gray-900 hover:text-gray-900 hover:bg-gray-50 group rounded-md px-3 py-2 flex items-center text-sm font-medium w-full"
              >
                <LogOut className="text-gray-400 flex-shrink-0 -ml-1 mr-3 h-6 w-6" />
                <span className="truncate">Log out</span>
              </button>
            </nav>
          </aside>

          {/* Main content */}
          <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
            {activeTab === 'profile' && (
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Profile</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Update your personal information.
                    </p>
                  </div>

                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={user.name}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={user.email}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <Button type="submit" className="bg-green-600 hover:bg-green-700">
                    Save changes
                  </Button>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="bg-white shadow sm:rounded-md">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Order History</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    View your past orders and their status.
                  </p>
                  {/* Add order history content here */}
                </div>
              </div>
            )}

            {activeTab === 'wishlist' && (
              <div className="bg-white shadow sm:rounded-md">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Wishlist</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    View and manage your wishlist items.
                  </p>
                  {/* Add wishlist content here */}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
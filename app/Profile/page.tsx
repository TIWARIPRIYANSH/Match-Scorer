'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
 import { useSession } from 'next-auth/react';

const AccountPanel = () => {
   const { data: session } = useSession();
  const router = useRouter();

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 shadow rounded-xl mt-6">
   
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-blue-600">Account Panel</h1>
          <p className="text-lg text-gray-500">Manage your account, plans, and match history</p>
        </div>
        {/* User Avatar */}
        <div className="flex items-center space-x-3">
          
          <span className="font-semibold text-lg">{session?.user?.name}</span>
        </div>
      </div>

  
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

      
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Account Details</h2>
          <p className="text-gray-600">Name: {session?.user?.name}</p>
          <p className="text-gray-600">Email: {session?.user?.email}</p>
          <button
            onClick={() => router.push('/account/update')}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Update Profile
          </button>
        </div>

    
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Plans</h2>
          <p className="text-gray-600">Current Plan: Premium</p>
          <p className="text-gray-600">Renewal: March 2025</p>
          <button
            onClick={() => router.push('/account/upgrade')}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
          >
            Upgrade Plan
          </button>
        </div>

        
        <div className="bg-white p-6 rounded-lg shadow-md col-span-1 sm:col-span-2">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Match History</h2>
          <p className="text-gray-600 mb-4">Browse and manage your saved match data.</p>
          <button
            onClick={() => router.push('/All-Matches')}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
          >
            View Match History
          </button>
        </div>

        {/* Match Management */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Match Management</h2>
          <button
            onClick={() => router.push('/create-match')}
            className="bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700 transition"
          >
            Create New Match
          </button>
        </div>

        {/* Settings */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Settings</h2>
          <button
            onClick={() => router.push('/settings')}
            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition"
          >
            Manage Settings
          </button>
        </div>

      </div>
    </div>
  );
};

export default AccountPanel;

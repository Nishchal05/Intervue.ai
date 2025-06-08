'use client';

import React from 'react';
import { UserButton, useUser } from '@clerk/nextjs';
import { FaMicrophoneAlt, FaPhoneAlt, FaHistory } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
const Dashboard = () => {
  const { user } = useUser();
const router=useRouter();
  return (
    <div className="h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-6">
      {/* Section 1: Welcome + User Info */}
      <div className="flex justify-between items-center bg-white rounded-xl shadow-md p-6 mb-8 sm:mt-16">
        <div>
          <h2 className="text-2xl font-bold text-indigo-700">
            Welcome, {user?.firstName || 'User'} 👋
          </h2>
          <p className="text-gray-600 mt-1">Let’s help you crack your next interview! 🚀</p>
        </div>
        <UserButton />
      </div>

      {/* Section 2: Create Interview & Phone Screening */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
          <h3 className="text-xl font-semibold text-indigo-700 mb-2 flex items-center gap-2">
            <FaMicrophoneAlt /> Create Mock Interview
          </h3>
          <p className="text-gray-600 mb-4">
            Practice real-time interview questions customized for your role.
          </p>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition cursor-pointer" onClick={()=>{
            router.push('/CreateInterView')
          }}>
            Start Now
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
          <h3 className="text-xl font-semibold text-indigo-700 mb-2 flex items-center gap-2">
            <FaPhoneAlt /> Phone Screening
          </h3>
          <p className="text-gray-600 mb-4">
            Simulate HR or recruiter screening calls with instant feedback.
          </p>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition cursor-pointer">
            Try Screening
          </button>
        </div>
      </div>

      {/* Section 3: Previous Interviews */}
      <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
        <h3 className="text-xl font-semibold text-indigo-700 mb-4 flex items-center gap-2">
          <FaHistory /> Previous Interviews
        </h3>

        {/* Example empty state */}
        <div className="text-center text-gray-500 py-8">
          <p className="mb-4">You haven’t taken any interviews yet.</p>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition cursor-pointer">
            Create First Interview
          </button>
        </div>

        {/* Example when data is available */}
        {/* 
        <div className="grid md:grid-cols-2 gap-4">
          <div className="border p-4 rounded-md shadow-sm">
            <h4 className="font-semibold text-gray-700">Full Stack Developer</h4>
            <p className="text-sm text-gray-500">May 3, 2025</p>
            <button className="mt-2 text-indigo-600 hover:underline">View Details</button>
          </div>
          ...
        </div> 
        */}
      </div>
    </div>
  );
};

export default Dashboard;

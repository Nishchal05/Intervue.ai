'use client';

import React from 'react';
import { SignUpButton } from '@clerk/nextjs';
import { FaPlay } from 'react-icons/fa';
const Home = () => {
  return (
    <main className="h-97vh bg-gradient-to-br p-8 flex flex-col items-center justify-center">
      <div className="mt-40 text-center max-w-5xl px-6 mb-16">
        <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 drop-shadow-md mb-6">
          Transform Your Interview Game with AI
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-10 leading-relaxed">
          Practice interviews in a real-world setting. Get AI-driven feedback, track your progress, and walk into your next interview with unbeatable confidence.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <a
            href="/demo"
            className="flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full text-lg font-semibold shadow-xl hover:scale-105 transition duration-300"
          >
            <FaPlay /> Start Preparation
          </a>
          <SignUpButton>
            
          </SignUpButton>
        </div>
      </div>
    </main>
  );
};

export default Home;

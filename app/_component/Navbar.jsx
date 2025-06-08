'use client';

import React, { useContext } from 'react';
import Link from 'next/link';
import {
  FaBars,
  FaTimes
} from 'react-icons/fa';
import { DataContext } from '../DataProvider';
import {UserButton} from '@clerk/nextjs'; 
const Navbar = () => {
  const { view, setView } = useContext(DataContext);

  return (
    <header className="fixed w-full flex items-center justify-between px-6 md:px-10 py-4 bg-white/30 backdrop-blur-lg shadow-md z-50 h-16">
      {/* Logo */}
      <h1 className="text-2xl font-extrabold text-indigo-600 tracking-tight font-mono">Intervue.ai</h1>

      {/* Nav links (hidden on mobile) */}
      <nav className="hidden md:flex gap-6 text-gray-700 font-medium">
        <Link href="/" className="hover:text-indigo-600 transition">Home</Link>
        <Link href="/" className="hover:text-indigo-600 transition">Dashboard</Link>
        <Link href="/profile" className="hover:text-indigo-600 transition">Profile</Link>
      </nav>
      <div className=' flex gap-2 justify-center items-center'>
      <UserButton afterSignOutUrl="/" />
      {/* Mobile Hamburger */}
      <button
        className="md:hidden text-2xl text-indigo-700 z-50 focus:outline-none cursor-pointer"
        onClick={() => setView(!view)}
        aria-label="Toggle sidebar"
      >
        {view ? <FaTimes /> : <FaBars />}
      </button>
      </div>
    </header>
  );
};

export default Navbar;

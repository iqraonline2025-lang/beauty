"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, User, LogOut } from 'lucide-react';
import { useAuth } from "../context/AuthContext"; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Grab user and the global logout function from our Context
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle Logout using the context function we built
  const handleLogoutClick = async () => {
    setIsOpen(false);
    await logout();
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${
      scrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-2' : 'bg-white py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center group">
            <h1 className="text-2xl font-serif font-bold tracking-tighter transition-transform group-hover:scale-105">
              <span className="text-pink-600">ZAINAB</span>
              <span className="text-gray-900 ml-2 font-light italic">STUDIO</span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-xs uppercase tracking-[0.2em] font-bold transition-colors hover:text-pink-600 ${
                  pathname === link.href ? 'text-pink-600' : 'text-gray-500'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center gap-6">
            {!user ? (
              <>
                <Link 
                  href="/login" 
                  className="text-xs uppercase tracking-widest font-bold text-gray-500 hover:text-pink-600 transition-colors"
                >
                  Login
                </Link>
                <div className="h-4 w-[1px] bg-gray-200"></div>
                {/* Fixed: Point to /signup so the AuthForm knows to show 'Create Account' */}
                <Link href="/signup"> 
                  <button className="flex items-center gap-2 bg-gray-900 text-white px-7 py-3 rounded-none text-xs uppercase tracking-widest font-bold hover:bg-pink-600 transition-all active:scale-95 shadow-lg">
                    <User size={14} />
                    Sign Up
                  </button>
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-5">
                <span className="text-[10px] font-black uppercase tracking-widest text-pink-600 bg-pink-50 px-3 py-1 border border-pink-100 rounded-sm">
                  Hi, {user.name?.split(' ')[0]}
                </span>
                <button 
                  onClick={handleLogoutClick}
                  className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition-colors group"
                >
                  <LogOut size={16} className="group-hover:translate-x-1 transition-transform" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Logout</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-900 p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`md:hidden bg-white border-t border-gray-100 transition-all duration-500 overflow-hidden ${
        isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="px-6 pt-10 pb-12 space-y-6 flex flex-col items-center text-center">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`text-sm uppercase tracking-widest font-bold ${
                pathname === link.href ? 'text-pink-600' : 'text-gray-800'
              }`}
            >
              {link.name}
            </Link>
          ))}
          
          <div className="w-full h-[1px] bg-gray-100 my-4"></div>

          {!user ? (
            <>
              <Link href="/login" className="text-sm uppercase tracking-widest font-bold text-gray-800" onClick={() => setIsOpen(false)}>
                  Login
              </Link>
              <Link href="/signup" className="w-full pt-2" onClick={() => setIsOpen(false)}>
                <button className="w-full bg-pink-600 text-white py-4 font-bold text-xs uppercase tracking-[0.2em]">
                  Create Account
                </button>
              </Link>
            </>
          ) : (
            <div className="flex flex-col items-center gap-4">
               <span className="text-xs font-bold text-pink-600 uppercase">Welcome, {user.name}</span>
               <button 
                onClick={handleLogoutClick}
                className="text-sm uppercase tracking-widest font-bold text-red-500 flex items-center gap-2"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
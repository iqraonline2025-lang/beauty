"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import axios from 'axios';
import { useAuth } from "../context/AuthContext"; 
import { useRouter } from 'next/navigation';

const AuthForm = ({ initialMode = "login" }) => {
  const { setUser } = useAuth(); 
  const router = useRouter();
  
  // Set starting state based on prop
  const [isLogin, setIsLogin] = useState(initialMode === "login");
  const [formData, setFormData] = useState({
    name: '', 
    email: '',
    password: ''
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Sync state if the user navigates directly between /login and /signup
  useEffect(() => {
    setIsLogin(initialMode === "login");
    setError(""); // Clear errors on mode change
  }, [initialMode]);

  const handleGoogleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/google`; 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    const endpoint = isLogin ? 'login' : 'register';

    /* FIX: Create a clean payload. 
      Backend 'login' often dislikes receiving a 'name' field, 
      even if it's empty.
    */
    const payload = isLogin 
      ? { email: formData.email, password: formData.password }
      : formData;

    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/${endpoint}`, 
        payload,
        { withCredentials: true } 
      );
      
      if (data) {
        // Support both { user: {} } or a direct user object response
        setUser(data.user || data); 
        
        // Use router.push for client-side navigation, then refresh to sync Navbar
        router.push("/services"); 
        setTimeout(() => router.refresh(), 100); 
      }
    } catch (err) {
      // Extract the most helpful error message from your backend
      const message = err.response?.data?.message || "Something went wrong. Please check your credentials.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full px-12 py-4 bg-white border-2 border-gray-900 rounded-2xl focus:border-pink-600 focus:ring-0 outline-none transition-all text-gray-900 font-bold placeholder:text-gray-400";

  return (
    <section className="min-h-[80vh] flex items-center justify-center bg-white px-6 py-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="bg-white border-2 border-gray-900 p-8 md:p-10 rounded-[2.5rem] shadow-[12px_12px_0px_0px_rgba(17,24,39,1)]">
          
          <div className="text-center mb-10">
            <h2 className="text-4xl font-serif text-gray-900 mb-2">
              {isLogin ? "Welcome Back" : "Join the Studio"}
            </h2>
            <p className="text-gray-500 text-sm italic font-serif">
              {isLogin ? "Sign in to manage your bookings" : "Create an account for a premium experience"}
            </p>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-red-50 border-2 border-red-200 text-red-600 p-4 rounded-xl mb-6 text-xs font-black uppercase tracking-widest text-center"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <AnimatePresence mode="popLayout">
              {!isLogin && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="relative"
                >
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input 
                    required={!isLogin}
                    type="text" 
                    placeholder="FULL NAME" 
                    className={inputClass}
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                required
                type="email" 
                placeholder="EMAIL ADDRESS" 
                className={inputClass}
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                required
                type="password" 
                placeholder="PASSWORD" 
                className={inputClass}
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>

            <button 
              type="submit"
              disabled={loading}
              className={`w-full bg-gray-900 text-white font-black py-5 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-95 shadow-lg mt-6 ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-black'}`}
            >
              <span className="uppercase tracking-[0.2em] text-xs">
                {loading ? "Processing..." : isLogin ? "Sign In" : "Create Account"}
              </span>
              {!loading && <ArrowRight size={18} />}
            </button>
          </form>

          <div className="relative my-8 text-center">
            <hr className="border-gray-200" />
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
              Or continue with
            </span>
          </div>

          <button 
            type="button"
            onClick={handleGoogleLogin}
            className="w-full border-2 border-gray-900 bg-white text-gray-900 font-bold py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-gray-50 transition-all active:scale-95"
          >
            <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" className="w-5 h-5" />
            <span className="text-sm">Google</span>
          </button>

          <p className="mt-8 text-center text-sm font-medium text-gray-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
            <button 
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setError("");
              }}
              className="text-pink-600 font-black hover:underline underline-offset-4"
            >
              {isLogin ? "Sign Up" : "Log In"}
            </button>
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default AuthForm;
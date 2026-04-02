"use client";
import { useState } from 'react'; // Added useState
import Link from 'next/link';
import { Instagram, Facebook, Mail, MapPin, Phone, Clock, Sparkles, Heart, CheckCircle2 } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  // State to track email submission
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim() !== "") {
      // Here you would normally call your API
      setIsSubscribed(true);
      setEmail(""); // Clear the input
      
      // Optional: Hide message after 5 seconds
      setTimeout(() => setIsSubscribed(false), 5000);
    }
  };

  const services = [
    { name: 'Lash Extensions', href: '/lashes' },
    { name: 'Hair Styling', href: '/hair' },
    { name: 'Facial Care', href: '/facials' },
    { name: 'Makeup Artistry', href: '/makeup' },
    { name: 'Nail Design', href: '/nails' },
  ];

  return (
    <footer className="bg-white text-gray-800 pt-24 pb-12">
      <div className="container mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          
          {/* Column 1: Identity */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center shadow-lg shadow-pink-200 group-hover:scale-110 transition-transform">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-serif font-bold tracking-tight text-gray-900">
                Lumina<span className="text-pink-500">.</span>
              </span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed">
              Experience the art of beauty. Our studio provides a sanctuary for transformation and relaxation using only the finest products.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-pink-400 hover:text-pink-600 transition-colors"><Instagram className="w-6 h-6" /></a>
              <a href="#" className="text-pink-400 hover:text-pink-600 transition-colors"><Facebook className="w-6 h-6" /></a>
            </div>
          </div>

          {/* Column 2: Services */}
          <div>
            <h4 className="text-sm font-black uppercase tracking-widest text-gray-900 mb-8 flex items-center gap-2">
              <div className="w-2 h-2 bg-pink-500 rounded-full"></div> Services
            </h4>
            <ul className="space-y-4">
              {services.map((service) => (
                <li key={service.name}>
                  <Link href={service.href} className="text-gray-500 hover:text-pink-500 text-sm transition-all hover:pl-2 block">
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4 className="text-sm font-black uppercase tracking-widest text-gray-900 mb-8 flex items-center gap-2">
              <div className="w-2 h-2 bg-pink-500 rounded-full"></div> Visit Us
            </h4>
            <div className="space-y-6">
              <div className="flex gap-4">
                <MapPin className="w-5 h-5 text-pink-500 shrink-0" />
                <p className="text-sm text-gray-500">123 Pink Blvd, Suite 101<br/>Manhattan, NY 10012</p>
              </div>
              <div className="flex gap-4">
                <Phone className="w-5 h-5 text-pink-500 shrink-0" />
                <a href="tel:+12125550199" className="text-sm text-gray-500 font-bold hover:text-pink-500 transition-colors">+1 (212) 555-0199</a>
              </div>
            </div>
          </div>

          {/* Column 4: Newsletter (UPDATED) */}
          <div>
            <h4 className="text-sm font-black uppercase tracking-widest text-gray-900 mb-8 flex items-center gap-2">
              <div className="w-2 h-2 bg-pink-500 rounded-full"></div> Newsletter
            </h4>
            <p className="text-xs text-gray-400 mb-4 uppercase font-bold">Join the glow club</p>
            
            <div className="relative mb-6">
              {isSubscribed ? (
                // Success Message
                <div className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-3 rounded-full border border-green-100 animate-in fade-in zoom-in duration-300">
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase tracking-wider">Welcome to the club!</span>
                </div>
              ) : (
                // Normal Form
                <form onSubmit={handleSubscribe} className="relative">
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email" 
                    className="w-full px-5 py-3 bg-pink-50 border border-pink-100 rounded-full text-sm focus:outline-none focus:border-pink-500 transition-colors text-gray-700"
                  />
                  <button type="submit" className="absolute right-1 top-1 bottom-1 px-4 bg-pink-500 text-white rounded-full text-xs font-bold hover:bg-pink-600 transition-colors">
                    JOIN
                  </button>
                </form>
              )}
            </div>

            <div className="flex items-center gap-2 text-[10px] font-bold text-pink-500 uppercase tracking-tighter">
              <Clock className="w-3 h-3" /> Mon - Sat: 9am - 7pm
            </div>
          </div>

        </div>

        {/* Bottom Credits Bar */}
        <div className="pt-8 border-t border-pink-50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-1">
            Made with <Heart className="w-3 h-3 fill-pink-500 text-pink-500" /> for Beauty
          </p>
          <div className="flex gap-8">
            <span className="text-gray-300 text-[10px] font-bold uppercase tracking-widest cursor-default">© {currentYear} Lumina Salon</span>
            <Link href="/privacy" className="text-gray-400 hover:text-pink-500 text-[10px] font-bold uppercase tracking-widest transition-colors">Privacy</Link>
            <Link href="/terms" className="text-gray-400 hover:text-pink-500 text-[10px] font-bold uppercase tracking-widest transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { Clock, ChevronRight } from 'lucide-react';

// 1. Accept the onBookClick prop from the parent (Services.js)
const ServiceMenu = ({ services = [], onBookClick }) => {
  const [activeCategory, setActiveCategory] = useState("All");

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "https://images.unsplash.com/photo-1562322140-8baeececf3df";
    return imagePath.startsWith('http') 
      ? imagePath 
      : `${process.env.NEXT_PUBLIC_API_URL}${imagePath}`;
  };

  const categories = ["All", ...new Set(services.map(s => s.category).filter(Boolean))];

  const filtered = activeCategory === "All" 
    ? services 
    : services.filter(s => s.category === activeCategory);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        
        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.15em] transition-all duration-300 ${
                activeCategory === cat 
                ? "bg-pink-500 text-white shadow-lg shadow-pink-100" 
                : "bg-gray-50 text-gray-400 hover:bg-pink-50 hover:text-pink-400"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* The Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filtered.map((service) => (
            <div key={service._id} className="group bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden hover:shadow-2xl hover:shadow-pink-100/50 transition-all duration-500">
              
              {/* Image Area */}
              <div className="relative h-72 w-full overflow-hidden">
                <Image 
                  src={getImageUrl(service.image)} 
                  alt={service.title || "Service"} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  unoptimized 
                />
                <div className="absolute bottom-6 left-6">
                  <span className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl text-pink-600 font-black text-sm shadow-sm">
                    £{service.price || "TBD"}
                  </span>
                </div>
              </div>

              {/* Text Area */}
              <div className="p-8">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-pink-300 bg-pink-50 px-3 py-1 rounded-lg">
                    {service.category || "General"}
                  </span>
                </div>

                <h3 className="text-2xl font-serif mb-3 text-gray-900 italic group-hover:text-pink-500 transition-colors">
                  {service.title || "Untitled Service"}
                </h3>
                
                <p className="text-gray-500 text-sm leading-relaxed mb-8 line-clamp-2">
                  {service.description || "No description provided."}
                </p>

                {/* Footer Info & PROTECTED BOOK NOW BUTTON */}
                <div className="flex justify-between items-center pt-6 border-t border-gray-50">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Clock size={14} className="text-pink-200" />
                    <span className="text-xs font-bold">{service.duration || "Consultation"}</span>
                  </div>
                  
                  {/* CHANGED: Now a button that triggers our gatekeeper logic */}
                  <button 
                    onClick={() => onBookClick(service._id)}
                    className="group/btn flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-900 hover:text-pink-500 transition-colors"
                  >
                    <span>Book Now</span>
                    <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform text-pink-500" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceMenu;
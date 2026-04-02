"use client";
import Image from 'next/image';
import { Instagram, ExternalLink } from 'lucide-react';

const InstagramGallery = () => {
  const images = [
    { id: 1, src: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=800&auto=format&fit=crop", alt: "Lash Extension" },
    { id: 2, src: "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?q=80&w=800&auto=format&fit=crop", alt: "Hair Styling" },
    { id: 3, src: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=800&auto=format&fit=crop", alt: "Makeup Artistry" },
    { id: 4, src: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=800&auto=format&fit=crop", alt: "Skincare" },
    { id: 5, src: "/images/lash extension.jpg", alt: "lash extension" },
    { id: 6, src: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=800&auto=format&fit=crop", alt: "Facial" },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        
        {/* Simple, Centered Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
            Follow Us On Instagram
          </h2>
          <a 
            href="https://instagram.com" 
            target="_blank"
            className="text-pink-500 font-semibold flex items-center justify-center gap-2 hover:underline tracking-wide"
          >
            <Instagram className="w-5 h-5" /> @YourSalonHandle
          </a>
          <div className="w-12 h-1 bg-pink-500 mx-auto mt-6"></div>
        </div>

        {/* Clean, Consistent 3-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((img) => (
            <div 
              key={img.id} 
              className="relative aspect-square overflow-hidden group cursor-pointer shadow-sm border border-gray-100"
            >
              {/* The Image */}
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />

              {/* Minimalist Hover Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="flex flex-col items-center gap-2 text-white">
                   <Instagram className="w-8 h-8" />
                   <span className="text-xs font-bold uppercase tracking-widest">View Post</span>
                </div>
              </div>

              {/* Shimmer Effect on Hover */}
              <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-shimmer" />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          100% {
            left: 125%;
          }
        }
        .animate-shimmer {
          animation: shimmer 0.8s;
        }
      `}</style>
    </section>
  );
};

export default InstagramGallery;
"use client";
import Link from 'next/link';
import { CalendarDays, Sparkles } from 'lucide-react';

const CallToAction = () => {
  return (
    <section className="relative py-28 md:py-36 overflow-hidden bg-[#0a0a0a]">
      {/* 1. EYE-CATCHING BACKGROUND: Animated Gradient Blobs */}
      <div className="absolute inset-0 z-0">
        {/* Top-left Pink Glow */}
        <div className="absolute -top-1/4 -left-1/4 w-3/4 h-3/4 bg-gradient-to-br from-pink-500/20 to-transparent rounded-full blur-[120px] mix-blend-screen opacity-70 animate-blob-pulse"></div>
        {/* Bottom-right Gold/Orange Glow (Contrast) */}
        <div className="absolute -bottom-1/4 -right-1/4 w-3/4 h-3/4 bg-gradient-to-tl from-amber-400/10 to-transparent rounded-full blur-[120px] mix-blend-screen opacity-50 animate-blob-pulse delay-2000"></div>
        
        {/* Subtle Static Gradient Base */}
        <div className="absolute inset-0 bg-gradient-to-r from-pink-900/10 via-black to-pink-950/10"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center">
          
          {/* 2. HEADER ACCENT: Minimalist Glow Line */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-pink-500 to-transparent shadow-[0_0_15px_#ec4899]"></div>
            <Sparkles className="w-6 h-6 text-pink-400 animate-pulse" />
            <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-pink-500 to-transparent shadow-[0_0_15px_#ec4899]"></div>
          </div>

          {/* 3. HIGH-CONTRAST TYPOGRAPHY: Dark BG + Gradient Text */}
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-8 tracking-tighter leading-none">
            Ready to <span className="bg-gradient-to-br from-pink-300 via-pink-500 to-amber-300 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(236,72,153,0.3)]">glow up</span>?
          </h2>
          
          <p className="text-gray-400 text-lg md:text-2xl mb-16 max-w-2xl leading-relaxed italic">
            You are just a few clicks away from your premium transformation. Spaces fill up fast!
          </p>

          {/* 4. THE ULTIMATE CTA BUTTON: Pulsing, Glowing, Glassmorphism */}
          <Link 
            href="/services" 
            className="group relative inline-flex items-center gap-4 px-14 py-6 text-xl font-extrabold tracking-wider text-white rounded-full transition-all duration-500 hover:scale-105"
          >
            {/* Dark inner base */}
            <span className="absolute inset-0 bg-gray-950 rounded-full z-0"></span>
            
            {/* Animated Gradient Border (The Glow) */}
            <span className="absolute inset-0 rounded-full p-[2px] z-[-1] bg-gradient-to-r from-pink-600 via-amber-400 to-pink-600 animate-border-spin group-hover:shadow-[0_0_60px_-10px_#ec4899]"></span>
            
            {/* White internal fill on hover */}
            <span className="absolute inset-0 bg-white rounded-full transition-opacity duration-500 opacity-0 group-hover:opacity-100 z-10"></span>
            
            {/* Icon (Animated) */}
            <CalendarDays className="w-7 h-7 z-20 transition-all duration-500 group-hover:text-pink-600 group-hover:-rotate-12" />
            
            {/* Text (Gradient by default, solid pink on hover) */}
            <span className="relative z-20 bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent group-hover:from-pink-600 group-hover:to-pink-600 transition-all duration-500 uppercase">
              Book Now
            </span>
            
            {/* Subtle external 'aurora' shine */}
            <span className="absolute -inset-1 rounded-full blur-2xl bg-pink-500/30 opacity-60 animate-pulse z-[-2]"></span>
          </Link>

          {/* 5. MINIMALIST TRUST TEXT */}
          <p className="mt-12 text-gray-700 text-[11px] font-bold uppercase tracking-[0.3em]">
            Easy Online Booking • Instant Confirmation
          </p>
        </div>
      </div>

      <style jsx global>{`
        @keyframes border-spin {
          100% { background-position: 200% center; }
        }
        @keyframes blob-pulse {
          0%, 100% { transform: scale(1) translate(0, 0); opacity: 0.7; }
          50% { transform: scale(1.1) translate(-20px, 20px); opacity: 0.5; }
        }
        .animate-border-spin {
          background-size: 200% auto;
          animation: border-spin 3s linear infinite;
        }
        .animate-blob-pulse {
          animation: blob-pulse 10s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default CallToAction;
"use client";
import { Sparkles, MousePointerClick } from 'lucide-react';

const ServicesHero = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-white">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-pink-50/50 -skew-x-12 translate-x-20 z-0 hidden lg:block"></div>
      <div className="absolute top-20 left-10 w-32 h-32 bg-pink-100/30 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Tagline */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-50 border border-pink-100 mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-pink-500" />
            <span className="text-pink-600 text-xs font-bold uppercase tracking-[0.2em]">
              The Full Experience
            </span>
          </div>

          {/* Main Title with Serif Accent */}
          <h1 className="text-6xl md:text-8xl font-serif text-gray-900 leading-[0.9] mb-8 tracking-tighter">
            Elevate Your <br />
            <span className="text-pink-500 italic relative">
              Natural Glow
              <svg className="absolute -bottom-2 left-0 w-full h-2 text-pink-200/60" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 25 0, 50 5 T 100 5" stroke="currentColor" strokeWidth="2" fill="transparent" />
              </svg>
            </span>
          </h1>

          {/* Description */}
          <p className="text-gray-500 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-12 font-medium">
            Explore our curated menu of premium beauty treatments. From master-level lash artistry to transformative hair styling, we define luxury in every detail.
          </p>

          {/* Stats / Features Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-y border-pink-50 mt-12">
            {[
              { label: "Expert Artists", val: "12+" },
              { label: "Services", val: "25+" },
              { label: "Happy Clients", val: "5K+" },
              { label: "Rating", val: "5.0" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-2xl font-bold text-gray-900">{stat.val}</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-pink-400">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Scroll Indicator */}
          <div className="mt-16 flex flex-col items-center gap-2 animate-bounce">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em]">Discover Menu</span>
            <MousePointerClick className="w-5 h-5 text-pink-300" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesHero;
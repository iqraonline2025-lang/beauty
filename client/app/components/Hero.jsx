import Image from 'next/image';
import Link from 'next/link';

const Hero = () => {
  return (
    /* mt-20 ensures it starts below the navbar. h-screen makes it impactful. */
    <section className="relative w-full min-h-screen mt-20 bg-[#fafafa] flex items-center overflow-hidden">
      
      {/* 1. Large Decorative Background Text (Adds a luxury feel) */}
      <div className="absolute top-10 left-10 opacity-[0.03] select-none pointer-events-none">
        <h2 className="text-[15rem] font-serif leading-none">EST. 2024</h2>
      </div>

      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">
        
        {/* Left Side: Editorial Content */}
        <div className="space-y-8 animate-in fade-in slide-in-from-left duration-1000">
          <div className="inline-block px-4 py-1 border border-pink-200 text-pink-600 rounded-full text-sm font-medium tracking-widest uppercase bg-pink-50">
            Premium Beauty Experience
          </div>
          
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-gray-900 leading-[1.1]">
            Unveil Your <br />
            <span className="italic text-pink-600">Inner Radiance</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 font-light max-w-lg leading-relaxed">
            From luxury bridal transformations to flawless everyday lash extensions. We don't just apply makeup; we craft confidence.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link href="/services">
              <button className="bg-gray-900 text-white px-10 py-4 rounded-none font-bold text-lg transition-all hover:bg-pink-600 shadow-xl active:scale-95">
                Reserve a Session
              </button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="pt-8 flex items-center gap-6 border-t border-gray-200">
            <div>
              <p className="font-bold text-xl text-gray-800">500+</p>
              <p className="text-sm text-gray-500 uppercase tracking-tighter">Happy Clients</p>
            </div>
            <div className="h-10 w-[1px] bg-gray-200"></div>
            <div>
              <p className="font-bold text-xl text-gray-800">4.9/5</p>
              <p className="text-sm text-gray-500 uppercase tracking-tighter">Rating</p>
            </div>
          </div>
        </div>

        {/* Right Side: Framed Image with Floating Element */}
        <div className="relative group animate-in fade-in slide-in-from-right duration-1000">
          {/* Decorative Frame */}
          <div className="absolute -inset-4 border-2 border-pink-100 translate-x-4 translate-y-4 rounded-2xl group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500"></div>
          
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl">
            <Image
              src="/images/hero-beauty.png"
              alt="Luxury Beauty Transformation"
              fill
              priority
              quality={100}
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>

          {/* Floating Badge */}
          <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg border border-gray-100 hidden md:block animate-bounce-slow">
            <p className="text-pink-600 font-serif italic text-xl">"Pure Perfection"</p>
            <p className="text-xs text-gray-400 mt-1 uppercase">— Vogue Beauty Review</p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
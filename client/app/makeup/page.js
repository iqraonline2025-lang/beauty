"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Camera, Heart, Users, Sparkles, Calendar, ArrowRight, CheckCircle } from 'lucide-react';

const MakeupArtistryPage = () => {
  const packages = [
    {
      name: "Event Glam",
      price: "$85",
      time: "60 mins",
      description: "Full face application for birthdays, galas, or a night out. Includes premium lash strips and high-definition contouring.",
    },
    {
      name: "Bridal Trial",
      price: "$100",
      time: "90 mins",
      description: "A dedicated session to design your perfect wedding look. We test different styles to ensure you feel like your best self.",
    },
    {
      name: "The Ultimate Bride",
      price: "$150",
      time: "120 mins",
      description: "Day-of bridal makeup. Includes luxury skin prep, custom lash application, and a touch-up kit for the reception.",
    },
    {
      name: "Makeup Lesson",
      price: "$120",
      time: "90 mins",
      description: "A 1-on-1 masterclass. Learn how to master your own features, apply lashes, and choose the right shades for your skin tone.",
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="h-20"></div>

      {/* Hero Section */}
      <section className="relative py-20 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 z-10">
            <div className="inline-block px-4 py-1 bg-pink-100 text-pink-600 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              Professional Artistry
            </div>
            <h1 className="text-6xl md:text-8xl font-serif text-gray-900 leading-[0.9] mb-8">
              True <br />
              <span className="text-pink-500 italic">Mastery.</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-lg mb-10 leading-relaxed">
              From soft-focus bridal beauty to high-impact editorial glam, we specialize in makeup that looks just as breathtaking in person as it does through a camera lens.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/services">
                <button className="bg-gray-900 text-white px-10 py-4 rounded-full font-bold hover:bg-pink-500 transition-all flex items-center gap-2">
                  Book Your Glam <Calendar size={18} />
                </button>
              </Link>
            </div>
          </div>

          <div className="flex-1 relative w-full">
            <div className="relative aspect-[4/5] md:aspect-square lg:aspect-[3/4] bg-pink-50 rounded-2xl overflow-hidden shadow-2xl border-8 border-white">
               {/* MAIN MAKEUP IMAGE */}
               <Image 
                 src="/images/makeup.jpg" 
                 alt="Professional Makeup Artistry" 
                 fill
                 className="object-cover"
                 priority
               />
            </div>
            {/* Floating Decorative Element */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-pink-200 rounded-full blur-3xl opacity-40 -z-10"></div>
          </div>
        </div>
      </section>

      {/* Expertise Stats */}
      <section className="bg-gray-50 py-16 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
          <div className="text-center">
            <div className="text-3xl font-serif text-gray-900 mb-1">HD</div>
            <div className="text-[10px] font-black uppercase tracking-widest text-pink-500">Photo Ready</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-serif text-gray-900 mb-1">12hr+</div>
            <div className="text-[10px] font-black uppercase tracking-widest text-pink-500">Longwear</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-serif text-gray-900 mb-1">100+</div>
            <div className="text-[10px] font-black uppercase tracking-widest text-pink-500">Brides Served</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-serif text-gray-900 mb-1">50+</div>
            <div className="text-[10px] font-black uppercase tracking-widest text-pink-500">Shades Kept</div>
          </div>
        </div>
      </section>

      {/* Pricing List */}
      <section className="py-24 max-w-5xl mx-auto px-6">
        <h2 className="text-4xl font-serif text-center mb-20 text-gray-900">Services & Packages</h2>
        <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
          {packages.map((item, index) => (
            <div key={index} className="group border-b border-gray-100 pb-8 hover:border-pink-500 transition-colors duration-500">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{item.name}</h3>
                  <p className="text-xs font-bold text-pink-500 uppercase tracking-widest">{item.time}</p>
                </div>
                <span className="text-2xl font-serif text-gray-900">{item.price}</span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">
                {item.description}
              </p>
              <Link href="/services">
                <button className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-400 group-hover:text-pink-600 transition-colors">
                  Book Now <ArrowRight size={14} />
                </button>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Special Features */}
      <section className="py-24 bg-gray-900 text-white px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <Camera className="text-pink-500 w-10 h-10" />
            <h4 className="text-xl font-serif italic">Photography Focus</h4>
            <p className="text-gray-400 text-sm leading-relaxed">We use techniques that prevent "flashback" and ensure your makeup looks flawless under professional studio lighting.</p>
          </div>
          <div className="space-y-4">
            <Users className="text-pink-500 w-10 h-10" />
            <h4 className="text-xl font-serif italic">Group Bookings</h4>
            <p className="text-gray-400 text-sm leading-relaxed">Planning a bridal party or event? We have a team of associate artists available to handle large groups efficiently.</p>
          </div>
          <div className="space-y-4">
            <Sparkles className="text-pink-500 w-10 h-10" />
            <h4 className="text-xl font-serif italic">Premium Kits</h4>
            <p className="text-gray-400 text-sm leading-relaxed">Our kits feature only high-end, professional brands like Danessa Myricks, Pat McGrath, and Charlotte Tilbury.</p>
          </div>
        </div>
      </section>

      {/* Bridal Trust Section */}
      <section className="py-24 text-center px-6 bg-pink-50">
        <div className="max-w-3xl mx-auto space-y-8">
          <Heart className="mx-auto text-pink-500 fill-pink-500" />
          <h2 className="text-4xl font-serif text-gray-900">Your Special Day</h2>
          <p className="text-gray-600 leading-relaxed italic">
            "Every bride deserves to feel like the most beautiful version of herself. We specialize in timeless, elegant bridal artistry that lasts from the first 'I do' to the final dance."
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="flex items-center gap-2 text-sm font-bold text-gray-800">
              <CheckCircle size={16} className="text-green-500" /> On-location Travel
            </div>
            <div className="flex items-center gap-2 text-sm font-bold text-gray-800">
              <CheckCircle size={16} className="text-green-500" /> Waterproof Formulas
            </div>
          </div>
          <div className="pt-4">
            <Link href="/contact">
              <button className="bg-pink-500 text-white px-8 py-3 rounded-full text-sm font-bold hover:bg-pink-600 transition-all">
                Inquire for Weddings
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MakeupArtistryPage;
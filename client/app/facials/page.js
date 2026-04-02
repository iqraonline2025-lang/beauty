"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Import Next.js Image component
import { Droplets, Sparkles, Wind, Leaf, Calendar, Check } from 'lucide-react';

const FacialCarePage = () => {
  const treatments = [
    {
      name: "Signature Glow Facial",
      price: "$95",
      time: "60 mins",
      description: "Our most popular deep-cleansing facial. Includes exfoliation, extractions, and a customized mask for instant radiance.",
    },
    {
      name: "Hydra-Dew Treatment",
      price: "$140",
      time: "75 mins",
      description: "Intense hydration using hyaluronic acid and oxygen therapy. Perfect for dry or tired skin needing a plumping effect.",
    },
    {
      name: "Anti-Aging Renewal",
      price: "$165",
      time: "90 mins",
      description: "Focuses on firming and lifting. Uses LED light therapy and collagen-boosting serums to reduce fine lines.",
    },
    {
      name: "Clarifying Detox",
      price: "$110",
      time: "60 mins",
      description: "Specifically designed for acne-prone skin. Salicylic acid and blue light therapy help calm inflammation and clear pores.",
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="h-20"></div>

      {/* Hero Section */}
      <section className="py-20 px-6 bg-[#f9f7f4]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-5xl md:text-7xl font-serif text-gray-900 leading-tight">
              Skin that <br />
              <span className="text-pink-500 italic">Breathes.</span>
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed max-w-md">
              Discover the perfect balance of science and relaxation. Our customized facials are designed to target your unique skin goals and leave you with a lasting, healthy glow.
            </p>
            {/* REDIRECT ADDED HERE */}
            <Link href="/services">
              <button className="bg-gray-900 text-white px-10 py-4 rounded-full font-bold hover:bg-pink-500 transition-all flex items-center gap-2">
                Book Your Facial <Calendar size={18} />
              </button>
            </Link>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-full overflow-hidden border-[16px] border-white shadow-xl relative">
               {/* IMAGE ADDED HERE */}
               <Image 
                 src="/images/facial.jpg" 
                 alt="Relaxing Facial Treatment" 
                 fill
                 className="object-cover"
                 priority
               />
            </div>
            <div className="absolute -top-4 -left-4 bg-white p-6 rounded-2xl shadow-lg border border-pink-50 max-w-[180px] z-20">
              <p className="text-xs font-bold text-pink-500 uppercase tracking-widest mb-1">Results</p>
              <p className="text-sm text-gray-700 italic">"My skin hasn't looked this clear in years."</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        {[
          { icon: <Droplets />, label: "Deep Hydration" },
          { icon: <Sparkles />, label: "Cell Renewal" },
          { icon: <Wind />, label: "Pore Detox" },
          { icon: <Leaf />, label: "Organic Products" }
        ].map((item, i) => (
          <div key={i} className="text-center space-y-3">
            <div className="w-12 h-12 mx-auto bg-pink-50 text-pink-500 rounded-xl flex items-center justify-center">
              {item.icon}
            </div>
            <p className="text-sm font-bold text-gray-800 uppercase tracking-tighter">{item.label}</p>
          </div>
        ))}
      </section>

      {/* Treatment Menu */}
      <section className="py-24 bg-white border-y border-gray-100 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-serif text-center mb-16">Skin Solutions</h2>
          <div className="space-y-12">
            {treatments.map((item, index) => (
              <div key={index} className="flex flex-col md:flex-row md:items-center justify-between group">
                <div className="md:w-2/3 space-y-2">
                  <div className="flex items-center gap-4">
                    <h3 className="text-2xl font-bold text-gray-900">{item.name}</h3>
                    <span className="text-pink-500 font-serif text-xl">{item.price}</span>
                  </div>
                  <p className="text-gray-500 leading-relaxed">{item.description}</p>
                </div>
                <div className="mt-4 md:mt-0">
                  <Link href="/services">
                    <button className="text-sm font-black uppercase tracking-widest border-b-2 border-pink-200 pb-1 hover:border-pink-500 transition-all">
                      Book Now
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Glow Process */}
      <section className="py-24 px-6 bg-gray-900 text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-4xl font-serif mb-16 text-center">The Lumina Experience</h2>
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div className="space-y-4">
              <span className="text-6xl font-serif text-pink-500/30">01</span>
              <h4 className="text-xl font-bold italic">Analysis</h4>
              <p className="text-gray-400 text-sm">We begin every session with a professional skin analysis to choose the right ingredients for your goals.</p>
            </div>
            <div className="space-y-4">
              <span className="text-6xl font-serif text-pink-500/30">02</span>
              <h4 className="text-xl font-bold italic">Treatment</h4>
              <p className="text-gray-400 text-sm">Relax in our heated aesthetic beds while we perform your customized multi-step skin therapy.</p>
            </div>
            <div className="space-y-4">
              <span className="text-6xl font-serif text-pink-500/30">03</span>
              <h4 className="text-xl font-bold italic">Protection</h4>
              <p className="text-gray-400 text-sm">We finish with high-grade SPF and antioxidant serums to protect your new glow from the elements.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 text-center px-6">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl font-serif">Not sure which facial to choose?</h2>
          <p className="text-gray-500">Book a complimentary 15-minute consultation and let our specialists build a plan for you.</p>
          <Link href="/services">
            <button className="bg-pink-500 text-white px-10 py-4 rounded-full font-bold hover:bg-pink-600 transition-all shadow-lg">
              Book Consultation
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default FacialCarePage;
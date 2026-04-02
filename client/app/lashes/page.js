"use client";
import React from 'react';
import { Check, Clock, Sparkles, Calendar, ArrowRight, ShieldCheck } from 'lucide-react';

const LashesPage = () => {
  const lashTypes = [
    {
      name: "Classic Set",
      price: "$120",
      time: "90 mins",
      description: "The 'Perfect Mascara' look. One extension is applied to each natural lash for length and subtle thickness.",
      features: ["1:1 Application", "Natural Enhancement", "Great for Daily Wear"]
    },
    {
      name: "Hybrid Set",
      price: "$150",
      time: "120 mins",
      description: "The best of both worlds. A mix of classic and volume fans to create a textured, wispy, and modern look.",
      features: ["Wispy Texture", "Varied Lengths", "Kim K Style"]
    },
    {
      name: "Volume Set",
      price: "$180",
      time: "150 mins",
      description: "Full-on glamour. Handmade fans are applied to each lash for a deep black, fluffy, and dramatic finish.",
      features: ["Maximum Fullness", "Dark Lash Line", "Perfect for Events"]
    }
  ];

  return (
    <div className="bg-white min-h-screen pt-20">
      {/* Hero Section */}
      <section className="px-6 py-16 md:py-24 bg-gradient-to-b from-pink-50 to-white text-center">
        <div className="max-w-4xl mx-auto">
          <span className="text-pink-600 font-semibold tracking-widest uppercase text-sm">Zainab Studio Services</span>
          <h1 className="mt-4 text-5xl md:text-7xl font-serif text-gray-900">
            Eyelash Extensions
          </h1>
          <p className="mt-6 text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Ditch the mascara and wake up flawless. Our premium extensions are customized to your eye shape for a comfortable, lightweight feel.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-800 transition flex items-center justify-center gap-2">
              Book Appointment <Calendar size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-serif text-gray-900">Choose Your Style</h2>
          <p className="text-gray-500 mt-2">Professional application, every single time.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {lashTypes.map((set, index) => (
            <div key={index} className="group border border-gray-100 rounded-3xl p-8 bg-white hover:border-pink-200 hover:shadow-xl hover:shadow-pink-50/50 transition-all duration-300">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">{set.name}</h3>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-3xl font-serif text-pink-600">{set.price}</span>
                <span className="text-gray-400 text-sm italic">Full Set</span>
              </div>
              <p className="text-gray-600 mb-8 text-sm leading-relaxed">
                {set.description}
              </p>
              <ul className="space-y-4 mb-10">
                {set.features.map((feat, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-700">
                    <div className="bg-pink-100 p-1 rounded-full">
                      <Check size={12} className="text-pink-600" />
                    </div>
                    {feat}
                  </li>
                ))}
              </ul>
              <div className="pt-6 border-t border-gray-50 flex items-center justify-between text-sm text-gray-400">
                <span className="flex items-center gap-1"><Clock size={14} /> {set.time}</span>
                <span className="text-pink-600 font-semibold group-hover:gap-2 flex items-center gap-1 transition-all">
                  Select <ArrowRight size={14} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quality Assurance */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-serif text-gray-900 mb-6">The Studio Standard</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="mt-1"><ShieldCheck className="text-pink-600" /></div>
                <div>
                  <h4 className="font-bold text-gray-800">Certified Lash Artists</h4>
                  <p className="text-gray-600 text-sm">Every set is applied by a licensed and certified professional with years of experience.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1"><Sparkles className="text-pink-600" /></div>
                <div>
                  <h4 className="font-bold text-gray-800">Premium Silk & Mink</h4>
                  <p className="text-gray-600 text-sm">We use only the highest quality, vegan-friendly materials that feel like your own lashes.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-pink-100 rounded-3xl h-80 flex items-center justify-center italic text-pink-400 font-serif text-xl p-12 text-center border-2 border-dashed border-pink-200">
            "Lashes make everything better. Experience the difference of professional mapping."
          </div>
        </div>
      </section>

      {/* FAQ Quick Link */}
      <section className="py-20 text-center px-6">
        <h2 className="text-2xl font-serif text-gray-900 mb-4">Have questions about aftercare?</h2>
        <p className="text-gray-600 mb-8">Learn how to keep your lashes looking fresh for 4+ weeks.</p>
        <button className="text-pink-600 font-bold border-b-2 border-pink-200 pb-1 hover:text-pink-700 transition">
          Read the Aftercare Guide
        </button>
      </section>
    </div>
  );
};

export default LashesPage;
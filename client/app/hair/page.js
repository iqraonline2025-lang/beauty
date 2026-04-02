"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Import Next.js Image component
import { Scissors, Star, Heart, Calendar, ArrowRight, CheckCircle2 } from 'lucide-react';

const HairStylingPage = () => {
  const services = [
    {
      name: "Signature Blowout",
      price: "$65",
      time: "45 mins",
      description: "Wash, scalp massage, and expert round-brush styling for incredible volume and shine.",
    },
    {
      name: "Luxury Updo",
      price: "$110",
      time: "75 mins",
      description: "Elegant styling for weddings, galas, or special events. From sleek buns to boho braids.",
    },
    {
      name: "Silk Press",
      price: "$95",
      time: "90 mins",
      description: "Deep conditioning and precision flat-ironing for natural hair to achieve a glass-like finish.",
    },
    {
      name: "Hollywood Waves",
      price: "$130",
      time: "90 mins",
      description: "Red-carpet ready vintage waves that provide timeless glamour and long-lasting hold.",
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Header Spacer */}
      <div className="h-20"></div>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-50 text-pink-600 text-xs font-bold uppercase tracking-wider">
              <Star size={14} /> Master Stylists
            </div>
            <h1 className="text-5xl md:text-7xl font-serif text-gray-900 leading-tight">
              Crown Your <br />
              <span className="italic text-pink-500">Confidence.</span>
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
              From effortless everyday waves to breathtaking event styling, our artists transform your hair into a masterpiece of texture and shine.
            </p>
            <div className="pt-4">
              <Link href="/services">
                <button className="bg-pink-500 text-white px-10 py-4 rounded-full font-bold hover:bg-pink-600 transition-all shadow-lg shadow-pink-100 flex items-center gap-2">
                  Book Your Transformation <Calendar size={18} />
                </button>
              </Link>
            </div>
          </div>
          
          <div className="flex-1 relative">
            <div className="aspect-[4/5] bg-gray-100 rounded-[2rem] overflow-hidden relative z-10 border-8 border-white shadow-2xl">
               {/* Optimized Next.js Image */}
               <Image 
                 src="/images/download.png" 
                 alt="Elegant Hair Styling" 
                 fill
                 className="object-cover"
                 priority // Loads the hero image faster
               />
            </div>
            {/* Decorative Element */}
            <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-pink-200 rounded-full blur-3xl opacity-30 -z-0"></div>
          </div>
        </div>
      </section>

      {/* Service Menu */}
      <section className="py-24 bg-gray-50 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div>
              <h2 className="text-4xl font-serif text-gray-900">Styling Menu</h2>
              <p className="text-gray-500 mt-2 italic">Prices may vary based on hair length and density.</p>
            </div>
            <div className="h-px flex-1 bg-gray-200 mx-8 hidden md:block mb-4"></div>
            <div className="text-pink-500 font-bold uppercase tracking-widest text-sm">Est. 2024</div>
          </div>

          <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
            {services.map((item, index) => (
              <div key={index} className="flex justify-between group cursor-default border-b border-gray-200 pb-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-pink-600 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-gray-500 text-sm max-w-md">{item.description}</p>
                  <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest block">{item.time}</span>
                </div>
                <div className="text-2xl font-serif text-gray-900 pl-4">
                  {item.price}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-pink-50 text-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Scissors size={28} />
            </div>
            <h4 className="text-xl font-bold text-gray-900">Precision Styling</h4>
            <p className="text-gray-500 text-sm leading-relaxed">We use advanced techniques to ensure your style lasts through the longest nights.</p>
          </div>
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-pink-50 text-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart size={28} />
            </div>
            <h4 className="text-xl font-bold text-gray-900">Hair Health First</h4>
            <p className="text-gray-500 text-sm leading-relaxed">Every service includes heat protection and nourishing oils to maintain integrity.</p>
          </div>
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-pink-50 text-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={28} />
            </div>
            <h4 className="text-xl font-bold text-gray-900">Custom Consultation</h4>
            <p className="text-gray-500 text-sm leading-relaxed">We analyze your face shape and hair type to recommend the most flattering look.</p>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="bg-gray-900 py-20 px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-serif text-white mb-8">Ready for your best hair day?</h2>
        <Link href="/services">
          <button className="bg-white text-gray-900 px-12 py-4 rounded-full font-bold hover:bg-pink-500 hover:text-white transition-all flex items-center gap-2 mx-auto">
            Reserve Your Slot <ArrowRight size={18} />
          </button>
        </Link>
      </section>
    </div>
  );
};

export default HairStylingPage;
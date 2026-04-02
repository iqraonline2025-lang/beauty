"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, ShieldCheck, Zap, Palette, Calendar, ArrowRight, Heart } from 'lucide-react';

const NailDesignPage = () => {
  const nailServices = [
    {
      name: "Structured Gel Manicure",
      price: "$75",
      time: "75 mins",
      description: "A high-durability gel overlay that strengthens your natural nails. Perfect for those looking to grow their own nails long.",
    },
    {
      name: "Gel-X Extensions",
      price: "$110",
      time: "90 mins",
      description: "The world's first soak-off soft gel extension system. No dust, no odor, and no damage to natural nails.",
    },
    {
      name: "Luxury Spa Pedicure",
      price: "$85",
      time: "60 mins",
      description: "Includes a sea salt soak, callus removal, sugar scrub, and a relaxing hot stone massage with gel polish finish.",
    },
    {
      name: "Intricate Nail Art",
      price: "+$20",
      time: "30+ mins",
      description: "From hand-painted French tips to chrome, 3D charms, and abstract velvet designs. Price varies by complexity.",
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="h-20"></div>

      {/* Hero Section */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6 z-10">
            <h1 className="text-6xl md:text-8xl font-serif text-gray-900 leading-tight">
              Detailed <br />
              <span className="text-pink-500 italic">Perfection.</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-lg leading-relaxed">
              Precision manicures and healthy nail enhancements. We believe your nails are your best accessory, crafted with non-toxic, premium Japanese and Korean gels.
            </p>
            <Link href="/services">
              <button className="bg-gray-900 text-white px-10 py-4 rounded-full font-bold hover:bg-pink-600 transition-all flex items-center gap-2 shadow-xl shadow-gray-200">
                Book Your Set <Calendar size={18} />
              </button>
            </Link>
          </div>
          
          <div className="flex-1 relative w-full">
            <div className="relative aspect-square md:aspect-[4/5] bg-pink-50 rounded-[3rem] overflow-hidden border-8 border-white shadow-2xl">
               {/* MAIN NAIL ART IMAGE */}
               <Image 
                 src="/images/nails.jpg" 
                 alt="Luxury Nail Art Design" 
                 fill
                 className="object-cover"
                 priority
               />
            </div>
            {/* Decorative Elements */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-pink-200 rounded-full blur-3xl opacity-50 -z-10"></div>
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-pink-100 rounded-full blur-3xl opacity-50 -z-10"></div>
          </div>
        </div>
      </section>

      {/* Shapes Guide */}
      <section className="py-20 bg-gray-50 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-serif text-center mb-12">Find Your Shape</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {['Almond', 'Square', 'Coffin', 'Stiletto', 'Oval'].map((shape) => (
              <div key={shape} className="bg-white p-6 rounded-2xl text-center border border-gray-100 hover:border-pink-300 transition-colors cursor-default shadow-sm">
                <div className="h-12 w-px bg-pink-200 mx-auto mb-4"></div>
                <p className="text-xs font-black uppercase tracking-widest text-gray-800">{shape}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section className="py-24 max-w-5xl mx-auto px-6">
        <div className="space-y-16">
          {nailServices.map((item, index) => (
            <div key={index} className="flex flex-col md:flex-row justify-between items-start md:items-center group">
              <div className="space-y-2 md:max-w-xl">
                <h3 className="text-2xl font-bold text-gray-900 group-hover:text-pink-600 transition-colors">
                  {item.name}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
                <div className="flex gap-4 pt-2">
                   <span className="text-[10px] font-bold text-pink-500 uppercase flex items-center gap-1">
                     <Zap size={10} /> Fast Soak-off
                   </span>
                   <span className="text-[10px] font-bold text-gray-400 uppercase flex items-center gap-1">
                     <ShieldCheck size={10} /> Non-Toxic
                   </span>
                </div>
              </div>
              <div className="mt-6 md:mt-0 text-right">
                <div className="text-3xl font-serif text-gray-900 mb-2">{item.price}</div>
                <Link href="/services">
                  <button className="text-xs font-black uppercase tracking-widest text-gray-400 hover:text-pink-600 transition-colors flex items-center gap-2">
                    Select Service <ArrowRight size={14} />
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quality Standards */}
      <section className="py-24 bg-gray-900 text-white px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-16">
          <div className="text-center space-y-4">
            <Palette className="mx-auto text-pink-500" size={32} />
            <h4 className="text-xl font-serif italic">Curated Colors</h4>
            <p className="text-gray-400 text-sm">We stock over 300 shades including exclusive seasonal collections from Tokyo and Seoul.</p>
          </div>
          <div className="text-center space-y-4">
            <ShieldCheck className="mx-auto text-pink-500" size={32} />
            <h4 className="text-xl font-serif italic">Medical Grade Sterilization</h4>
            <p className="text-gray-400 text-sm">Your safety is our priority. All stainless steel tools are autoclaved after every single use.</p>
          </div>
          <div className="text-center space-y-4">
            <Heart className="mx-auto text-pink-500" size={32} />
            <h4 className="text-xl font-serif italic">Nail Health Focus</h4>
            <p className="text-gray-400 text-sm">We never use heavy drills on natural nails. Our removal process is gentle and damage-free.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 text-center px-6">
        <div className="max-w-xl mx-auto p-12 bg-pink-50 rounded-[3rem] space-y-6">
          <Sparkles className="mx-auto text-pink-500" />
          <h2 className="text-3xl font-serif text-gray-900">Ready for a fresh set?</h2>
          <p className="text-gray-600 text-sm">Appointments fill up fast. Book your session today to secure your preferred artist.</p>
          <Link href="/services">
            <button className="bg-pink-500 text-white px-10 py-4 rounded-full font-bold hover:bg-pink-600 transition-all shadow-lg">
              Check Availability
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default NailDesignPage;
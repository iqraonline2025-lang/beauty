"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Clock, MessageCircle } from 'lucide-react';

const ContactGrid = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  const handleWhatsApp = (e) => {
    e.preventDefault();
    const phoneNumber = "+447859981309"; 
    const text = `Hello Zainab Studio!%0A%0A*Name:* ${formData.firstName} ${formData.lastName}%0A*Email:* ${formData.email}%0A*Message:* ${formData.message}`;
    window.open(`https://wa.me/${phoneNumber}?text=${text}`, '_blank');
  };

  // UPDATED: Main text is now gray-900 (Deep Charcoal)
  // Placeholder is now gray-400 (Lighter, subtle hint)
  const inputClass = "w-full px-6 py-5 bg-white border-2 border-gray-900 rounded-2xl focus:border-pink-600 focus:ring-0 outline-none transition-all text-gray-900 font-bold placeholder:text-gray-400 placeholder:font-medium";

  return (
    <section className="relative w-full pb-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* --- LEFT SIDE: STUDIO INFO --- */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-8"
          >
            <div className="bg-white border-2 border-gray-900 p-10 rounded-[2rem] shadow-xl shadow-pink-50/50">
              <h3 className="text-3xl font-serif text-gray-900 mb-8">Studio Details</h3>
              
              <div className="space-y-8 text-left">
                <div className="flex items-center gap-5">
                  <div className="flex-shrink-0 w-12 h-12 bg-pink-600 flex items-center justify-center rounded-2xl text-white shadow-lg shadow-pink-200">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] font-black text-gray-900">Email Us</p>
                    <p className="text-gray-800 font-bold text-lg">hello@zainabstudio.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-5">
                  <div className="flex-shrink-0 w-12 h-12 bg-gray-900 flex items-center justify-center rounded-2xl text-white shadow-lg">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] font-black text-gray-900">Location</p>
                    <p className="text-gray-800 font-bold text-lg">Design District, London</p>
                  </div>
                </div>

                <div className="flex items-center gap-5">
                  <div className="flex-shrink-0 w-12 h-12 border-2 border-gray-900 flex items-center justify-center rounded-2xl text-pink-600">
                    <Clock size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] font-black text-gray-900">Studio Hours</p>
                    <p className="text-gray-800 font-bold text-lg">10am — 8pm</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* --- RIGHT SIDE: WHATSAPP FORM --- */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <div className="bg-white border-2 border-gray-900 p-10 rounded-[2rem] shadow-[15px_15px_0px_0px_rgba(219,39,119,1)]">
              <div className="mb-10 text-left">
                <h3 className="text-4xl font-serif text-gray-900 mb-3">Quick Responses Await!</h3>
                <p className="text-pink-600 font-semibold tracking-tight">Chat with us directly on WhatsApp for instant booking.</p>
              </div>

              <form onSubmit={handleWhatsApp} className="space-y-6 text-left">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-gray-900 ml-1">First Name</label>
                    <input 
                      required
                      type="text" 
                      placeholder="e.g. Zainab" 
                      className={inputClass}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-gray-900 ml-1">Last Name</label>
                    <input 
                      required
                      type="text" 
                      placeholder="Studio" 
                      className={inputClass}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-gray-900 ml-1">Email Address</label>
                  <input 
                    required
                    type="email" 
                    placeholder="hello@example.com" 
                    className={inputClass}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-gray-900 ml-1">Message</label>
                  <textarea 
                    required
                    rows={4}
                    placeholder="Tell us about your project..." 
                    className={`${inputClass} resize-none`}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-gray-900 text-white font-black py-6 rounded-2xl flex items-center justify-center gap-3 transition-all hover:bg-black shadow-xl active:scale-[0.98]"
                >
                  <MessageCircle size={20} />
                  <span className="uppercase tracking-[0.3em] text-xs">Send on WhatsApp</span>
                </button>
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ContactGrid;
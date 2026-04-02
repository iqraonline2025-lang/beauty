"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Scissors } from 'lucide-react';

const faqs = [
  {
    question: "Do I need a patch test before my color appointment?",
    answer: "Yes, all new color clients require a patch test at least 48 hours before their appointment to ensure no allergic reactions occur. You can pop into the studio anytime—it only takes 2 minutes!"
  },
  {
    question: "What is your late arrival policy?",
    answer: "We offer a 15-minute grace period. If you are more than 15 minutes late, we may need to shorten your service or reschedule to avoid delaying the next client. The deposit remains non-refundable in these cases."
  },
  {
    question: "How should I arrive for my hair/makeup session?",
    answer: "For hair styling, please arrive with hair washed and dried 24 hours prior (unless booking a wash). For makeup, please arrive with a clean, moisturized face and no existing product."
  },
  {
    // Adjusted to be a bit "light black" text to match your style
    question: "Can I change my service on the day of the appointment?",
    answer: "Since our slots are timed precisely, we can usually only 'downsize' a service. Adding extra treatments (like a full head of highlights instead of a root touch-up) depends entirely on the stylist's remaining schedule."
  }
];

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section className="w-full py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Header - Softened Black */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-serif text-gray-900 mb-4">Salon FAQ</h2>
          <p className="text-pink-600 font-bold uppercase tracking-[0.2em] text-xs">Everything you need to know</p>
        </div>

        {/* Accordion List */}
        <div className="space-y-5">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="border-2 border-gray-900 rounded-[1.5rem] overflow-hidden transition-all duration-300 shadow-sm"
            >
              <button
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-7 text-left bg-white hover:bg-pink-50/20 transition-colors"
              >
                {/* Text is Gray-900 (Light Black) */}
                <span className="text-lg font-bold text-gray-900 tracking-tight pr-4">
                  {faq.question}
                </span>
                <div className={`flex-shrink-0 p-2 rounded-lg transition-all duration-300 ${activeIndex === index ? 'bg-pink-600 text-white rotate-180 scale-110' : 'bg-gray-100 text-gray-900'}`}>
                  {activeIndex === index ? <Minus size={18} /> : <Plus size={18} />}
                </div>
              </button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "circOut" }}
                  >
                    <div className="px-7 pb-8 text-gray-600 text-[17px] leading-relaxed border-t-2 border-gray-50 pt-5">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* CTA Box */}
        <div className="mt-20 p-12 bg-gray-900 rounded-[3rem] text-center relative overflow-hidden">
          {/* Subtle decorative icon */}
          <div className="absolute -right-10 -top-10 text-white/5 rotate-12">
             <Scissors size={200} />
          </div>
          
          <h3 className="text-white text-2xl mb-2 font-serif">Have a specific request?</h3>
          <p className="text-gray-400 mb-8 font-medium">We’re happy to help with custom bridal or group bookings.</p>
          
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-pink-600 text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all active:scale-95 shadow-lg"
          >
            Ask Us Anything
          </button>
        </div>

      </div>
    </section>
  );
};

export default FAQSection;
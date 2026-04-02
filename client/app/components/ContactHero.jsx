"use client";
import React from 'react';
import { motion } from 'framer-motion';

const ContactHero = () => {
  return (
    <section className="relative w-full bg-white overflow-hidden">
      
      {/* 1. THE NAV SPACER 
          This physically pushes the content down so the fixed nav 
          can't cover it. Adjust h-16 to h-20 if your nav is taller. */}
      <div className="h-16 md:h-20 w-full" />

      {/* 2. THE BACKGROUND GLOW (Inspired by Assistify) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[700px] pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(219,39,119,0.1)_0%,rgba(255,255,255,0)_70%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center pt-24 pb-12">
        
        {/* 3. MAIN TITLE (Bold & Clean) */}
        <div className="flex flex-col items-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-6xl md:text-8xl font-serif text-gray-950 tracking-tighter"
          >
            Contact <span className="text-pink-600">Us</span>
          </motion.h1>

          {/* 4. SUBTITLE (Lightweight & Centered) */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-8 text-gray-500 text-lg md:text-xl font-light max-w-2xl leading-relaxed"
          >
            Got questions? Reach out! We’re here and ready to assist you.
          </motion.p>
        </div>

        {/* 5. THE "GET IN TOUCH" DIVIDER (Transition to Form) */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-40 flex flex-col items-center"
        >
          <h2 className="text-3xl md:text-4xl font-serif text-pink-600 italic tracking-tight">
            Get in Touch
          </h2>
          
          {/* Animated Downward Thread */}
          <motion.div 
            initial={{ height: 0 }}
            animate={{ height: 60 }}
            transition={{ delay: 1, duration: 1.5 }}
            className="mt-6 w-[1px] bg-gradient-to-b from-pink-300 to-transparent" 
          />
        </motion.div>

      </div>
      
      {/* 6. Subtle Dot Grid Pattern */}
      <div 
        className="absolute bottom-0 left-0 w-full h-40 opacity-[0.05] pointer-events-none"
        style={{ 
          backgroundImage: `radial-gradient(#db2777 1px, transparent 1px)`, 
          backgroundSize: '32px 32px' 
        }} 
      />
    </section>
  );
};

export default ContactHero;
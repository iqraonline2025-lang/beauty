'use client';
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
// Import your new component here
import ServicesHighlights from './components/ServicesHighlights';
import WhyChooseUs from './components/WhyChooseUs';
import Testimonials from './components/Testimonials';
import InstagramGallery from './components/InstagramGallery';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';

export default function Home() {
    return (
        <>
          <Navbar />
          <Hero />
          <ServicesHighlights />
          <WhyChooseUs />
          <Testimonials />
          <InstagramGallery />
          <CallToAction /> 
          <Footer />
        </>
    )
}
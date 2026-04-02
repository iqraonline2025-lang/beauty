'use client';

import ContactGrid from "../components/ContactGrid";
import ContactHero from "../components/ContactHero";
import FAQSection from "../components/FAQSection";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function Contact() {
    return (
        <>
         <Navbar />
         <ContactHero />
         <ContactGrid />
         <FAQSection />
         <Footer />
        </>
    )
}
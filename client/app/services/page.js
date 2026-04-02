'use client';
import React, { useState, useEffect } from 'react';
import Navbar from "../components/Navbar";
import ServicesHero from "../components/ServicesHero";
import ServiceMenu from "../components/ServiceMenu";
import Footer from "../components/Footer";
// 1. Import the useAuth hook
import { useAuth } from "../context/AuthContext"; 
import { useRouter } from 'next/navigation';

export default function Services() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // 2. Grab the user and loading state from our Global Brain
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/services/all`);
                if (!response.ok) throw new Error('Failed to fetch');
                const data = await response.json();
                setServices(Array.isArray(data) ? data : []); 
            } catch (err) {
                console.error("Connection error:", err);
                setServices([]); 
            } finally {
                setLoading(false);
            }
        };
        fetchServices();
    }, []);

    // 3. Create the "Gatekeeper" function
    const handleBookNow = (serviceId) => {
        if (!user) {
            // If NO user, send them to login
            router.push('/login');
        } else {
            // If user EXISTS, go to booking page
            router.push(`/book/${serviceId}`);
        }
    };

    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            <ServicesHero />
            
            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="w-8 h-8 border-4 border-pink-100 border-t-pink-500 rounded-full animate-spin"></div>
                </div>
            ) : services.length > 0 ? (
                // 4. Pass the handleBookNow function into the ServiceMenu
                <ServiceMenu services={services} onBookClick={handleBookNow} />
            ) : (
                <div className="text-center py-40 bg-gray-50/50 mx-10 rounded-[3rem] border border-dashed border-gray-200">
                    <p className="text-gray-400 font-serif italic text-xl">
                        No services found.
                    </p>
                    <p className="text-pink-400 text-[10px] uppercase tracking-[0.2em] mt-2 font-black">
                        Please add services via the Admin Dashboard.
                    </p>
                </div>
            )}

            <Footer />
        </main>
    );
}
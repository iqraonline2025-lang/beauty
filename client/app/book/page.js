'use client';
import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Clock, Calendar as CalIcon, User, Mail, Phone, MessageCircle } from 'lucide-react';

function BookingContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const serviceId = searchParams.get('service');

    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);
    const [step, setStep] = useState(1); 
    const [occupiedSlots, setOccupiedSlots] = useState([]); 
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [userData, setUserData] = useState({ customerName: '', email: '', phone: '' });
    const [error, setError] = useState(null);

    // 1. Fetch Service Details
    useEffect(() => {
        if (!serviceId) {
            setError("No service selected. Returning to menu...");
            setTimeout(() => router.push('/services'), 3000);
            return;
        }

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/services/${serviceId}`)
            .then(res => res.ok ? res.json() : Promise.reject())
            .then(data => {
                setService(data);
                setLoading(false);
            })
            .catch(() => {
                setError("Service not found. Please go back to the menu.");
                setLoading(false);
            });
    }, [serviceId, router]);

    // 2. Fetch Busy Slots
    useEffect(() => {
        if (selectedDate) {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings/occupied?date=${selectedDate}`)
                .then(res => res.json())
                .then(data => {
                    setOccupiedSlots(Array.isArray(data) ? data : []);
                })
                .catch(() => setOccupiedSlots([]));
        }
    }, [selectedDate]);

    // 3. Generate Time Slots
    const timeSlots = [];
    for (let h = 10; h < 18; h++) {
        for (let m of ['00', '30']) {
            const t = `${h.toString().padStart(2, '0')}:${m}`;
            const isTaken = Array.isArray(occupiedSlots) && occupiedSlots.some(s => s.time === t);
            timeSlots.push({ time: t, isTaken });
        }
    }

    const handleFinalBooking = async () => {
        const cleanDuration = parseInt(service.duration) || 30;
        const payload = {
            service: service._id,
            customerName: userData.customerName,
            email: userData.email,
            phone: userData.phone,
            date: selectedDate,
            time: selectedTime,
            duration: cleanDuration 
        };

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                const salonPhone = "447859981309"; 
                const message = `*NEW BOOKING CONFIRMED* 🗓️\n\n*Service:* ${service.title}\n*Date:* ${selectedDate}\n*Time:* ${selectedTime}\n*Price:* £${service.price}\n\n*Client:* ${userData.customerName}\n*Phone:* ${userData.phone}`;
                window.open(`https://wa.me/${salonPhone}?text=${encodeURIComponent(message)}`, '_blank');
                alert("Booking Successful!");
                router.push('/');
            } else {
                const data = await res.json();
                alert(data.message || "Slot unavailable.");
            }
        } catch (err) {
            alert("Connection error.");
        }
    };

    if (loading) return <div className="p-20 text-center font-serif italic text-pink-500 text-2xl">Syncing with Salon...</div>;
    if (error) return <div className="p-20 text-center text-red-400 font-bold">{error}</div>;

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="lg:col-span-8 bg-white p-10 rounded-[3rem] shadow-2xl border border-gray-100">
                    {step === 1 ? (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <h2 className="text-4xl font-serif italic mb-2 text-gray-900">Schedule Appointment</h2>
                            <input type="date" min={new Date().toISOString().split('T')[0]} 
                                   onChange={(e) => { setSelectedDate(e.target.value); setSelectedTime(''); }}
                                   className="w-full md:w-1/2 p-5 rounded-2xl bg-gray-50 mb-12" />
                            {selectedDate && (
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
                                    {timeSlots.map(slot => (
                                        <button key={slot.time} disabled={slot.isTaken} onClick={() => setSelectedTime(slot.time)}
                                                className={`py-5 rounded-2xl font-bold transition-all ${slot.isTaken ? "bg-gray-50 text-gray-200" : selectedTime === slot.time ? "bg-black text-white" : "bg-white border-gray-100"}`}>
                                            {slot.time}
                                        </button>
                                    ))}
                                    <button disabled={!selectedTime} onClick={() => setStep(2)} className="col-span-full bg-black text-white py-6 rounded-3xl mt-4">Next</button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="space-y-5">
                            <InputGroup icon={<User size={20}/>} placeholder="Full Name" value={userData.customerName} onChange={(e) => setUserData({...userData, customerName: e.target.value})} />
                            <InputGroup icon={<Mail size={20}/>} placeholder="Email" type="email" value={userData.email} onChange={(e) => setUserData({...userData, email: e.target.value})} />
                            <InputGroup icon={<Phone size={20}/>} placeholder="WhatsApp" type="tel" value={userData.phone} onChange={(e) => setUserData({...userData, phone: e.target.value})} />
                            <button onClick={handleFinalBooking} className="w-full bg-black text-white py-6 rounded-3xl flex items-center justify-center gap-3">
                                <MessageCircle size={20} /> Confirm Booking
                            </button>
                        </div>
                    )}
                </div>
                <div className="lg:col-span-4 bg-gray-900 text-white p-10 rounded-[3rem]">
                    <h3 className="text-pink-400 font-serif italic text-2xl mb-8">Summary</h3>
                    <p className="font-bold text-xl">{service?.title}</p>
                    <p className="text-pink-400 text-6xl font-serif italic mt-10">£{service?.price}</p>
                </div>
            </div>
        </div>
    );
}

const InputGroup = ({ icon, ...props }) => (
    <div className="relative group">
        <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300">{icon}</div>
        <input {...props} className="w-full pl-16 pr-8 py-6 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-pink-200 outline-none font-bold" />
    </div>
);

export default function BookingPage() {
    return (
        <main className="min-h-screen bg-[#FDFCFD]">
            <Navbar />
            <Suspense fallback={<div className="p-20 text-center font-serif italic text-pink-500 text-3xl">Loading...</div>}>
                <BookingContent />
            </Suspense>
            <Footer />
        </main>
    );
}

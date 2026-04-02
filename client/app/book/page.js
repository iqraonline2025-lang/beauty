'use client';
import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Clock, Calendar as CalIcon, User, Mail, Phone, XCircle, MessageCircle } from 'lucide-react';

function BookingContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const serviceId = searchParams.get('service');

    // --- State Management ---
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
        if (serviceId) {
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
        }
    }, [serviceId]);

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

    // 4. Handle Final Booking
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
                const message = `*NEW BOOKING CONFIRMED* 🗓️\n\n` +
                                `*Service:* ${service.title}\n` +
                                `*Date:* ${selectedDate}\n` +
                                `*Time:* ${selectedTime}\n` +
                                `*Price:* £${service.price}\n\n` +
                                `*Client:* ${userData.customerName}\n` +
                                `*Phone:* ${userData.phone}\n\n` +
                                `See you soon! ✨`;

                window.open(`https://wa.me/${salonPhone}?text=${encodeURIComponent(message)}`, '_blank');

                alert("Booking Successful! Opening WhatsApp...");
                router.push('/');
            } else {
                const data = await res.json();
                alert(data.message || "This slot was just taken.");
            }
        } catch (err) {
            alert("Connection error. Please check your internet.");
        }
    };

    if (loading) return <div className="p-20 text-center font-serif italic text-pink-500 text-2xl">Syncing with Salon...</div>;
    if (error) return <div className="p-20 text-center text-red-400 font-bold">{error}</div>;

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                
                {/* LEFT COLUMN */}
                <div className="lg:col-span-8 bg-white p-10 rounded-[3rem] shadow-2xl border border-gray-100">
                    {step === 1 ? (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <h2 className="text-4xl font-serif italic mb-2 text-gray-900">Schedule Appointment</h2>
                            <p className="text-gray-400 mb-10">Select a date and time for your {service.title}.</p>
                            
                            <label className="text-[11px] font-bold uppercase tracking-widest text-pink-500 block mb-4">1. Choose Date</label>
                            <input 
                                type="date" 
                                min={new Date().toISOString().split('T')[0]} 
                                onChange={(e) => { setSelectedDate(e.target.value); setSelectedTime(''); }}
                                className="w-full md:w-1/2 p-5 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-pink-200 outline-none font-bold text-gray-700 mb-12"
                            />

                            {selectedDate && (
                                <div className="animate-in fade-in duration-700">
                                    <label className="text-[11px] font-bold uppercase tracking-widest text-pink-500 block mb-4">2. Available Times</label>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
                                        {timeSlots.map(slot => (
                                            <button 
                                                key={slot.time}
                                                disabled={slot.isTaken}
                                                onClick={() => setSelectedTime(slot.time)}
                                                className={`py-5 rounded-2xl font-bold transition-all border-2 flex flex-col items-center ${
                                                    slot.isTaken ? "bg-gray-50 border-transparent text-gray-200 cursor-not-allowed" :
                                                    selectedTime === slot.time ? "bg-black border-black text-white scale-105 shadow-xl" :
                                                    "bg-white border-gray-100 text-gray-600 hover:border-pink-200"
                                                }`}
                                            >
                                                <span>{slot.time}</span>
                                                <span className="text-[9px] uppercase mt-1">{slot.isTaken ? "Taken" : "Select"}</span>
                                            </button>
                                        ))}
                                    </div>
                                    <button 
                                        disabled={!selectedTime}
                                        onClick={() => setStep(2)}
                                        className="w-full bg-black text-white py-6 rounded-3xl font-black uppercase tracking-widest text-sm hover:bg-pink-600 transition-all disabled:opacity-20"
                                    >
                                        Next: Contact Details
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="animate-in slide-in-from-right-8 duration-500">
                            <h2 className="text-4xl font-serif italic mb-10 text-gray-900">Your Contact Info</h2>
                            <div className="space-y-5">
                                <InputGroup icon={<User size={20}/>} placeholder="Full Name" value={userData.customerName} onChange={(e) => setUserData({...userData, customerName: e.target.value})} />
                                <InputGroup icon={<Mail size={20}/>} placeholder="Email Address" type="email" value={userData.email} onChange={(e) => setUserData({...userData, email: e.target.value})} />
                                <InputGroup icon={<Phone size={20}/>} placeholder="WhatsApp Number" type="tel" value={userData.phone} onChange={(e) => setUserData({...userData, phone: e.target.value})} />
                            </div>
                            <div className="mt-12 flex items-center gap-6">
                                <button onClick={() => setStep(1)} className="text-gray-400 font-bold hover:text-black">Back</button>
                                <button 
                                    onClick={handleFinalBooking}
                                    disabled={!userData.customerName || !userData.phone || !userData.email}
                                    className="flex-1 bg-black text-white py-6 rounded-3xl font-black uppercase tracking-widest text-sm hover:bg-green-600 transition-all flex items-center justify-center gap-3 shadow-xl disabled:opacity-20"
                                >
                                    <MessageCircle size={20} />
                                    Confirm & Open WhatsApp
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* RIGHT COLUMN */}
                <div className="lg:col-span-4">
                    <div className="bg-gray-900 text-white p-10 rounded-[3rem] sticky top-10 shadow-2xl border border-white/5">
                        <h3 className="text-pink-400 font-serif italic text-2xl mb-8">Booking Summary</h3>
                        <div className="flex items-center gap-5 mb-8">
                            <div className="w-20 h-20 rounded-3xl overflow-hidden bg-white/10 border border-white/5">
                                {service?.image && (
                                    <img 
                                        src={`${process.env.NEXT_PUBLIC_API_URL}${service.image}`} 
                                        className="w-full h-full object-cover" 
                                        alt={service.title} 
                                    />
                                )}
                            </div>
                            <div>
                                <h4 className="font-bold text-xl">{service?.title}</h4>
                                <p className="text-pink-400 font-bold text-lg">£{service?.price}</p>
                            </div>
                        </div>
                        <div className="space-y-4 border-t border-white/10 pt-6">
                            <SummaryItem icon={<Clock size={16}/>} label="Duration" value={`${service?.duration}`} />
                            {selectedDate && <SummaryItem icon={<CalIcon size={16}/>} label="Appointment" value={`${selectedDate} @ ${selectedTime}`} />}
                        </div>
                        <div className="pt-10 border-t border-white/10 mt-10 text-center">
                            <p className="text-6xl font-serif italic">£{service?.price}</p>
                            <p className="text-[10px] text-gray-500 mt-4 tracking-widest uppercase font-bold">Total Price (Pay at Salon)</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const InputGroup = ({ icon, ...props }) => (
    <div className="relative group">
        <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-pink-500 transition-colors">{icon}</div>
        <input {...props} className="w-full pl-16 pr-8 py-6 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-pink-200 outline-none font-bold text-gray-800" />
    </div>
);

const SummaryItem = ({ icon, label, value }) => (
    <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
            <span className="text-pink-500">{icon}</span>
            <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">{label}</span>
        </div>
        <span className="font-bold text-sm text-gray-200">{value}</span>
    </div>
);

export default function BookingPage() {
    return (
        <main className="min-h-screen bg-[#FDFCFD]">
            <Navbar />
            <Suspense fallback={<div className="p-20 text-center font-serif italic text-pink-500 text-3xl">Loading Experience...</div>}>
                <BookingContent />
            </Suspense>
            <Footer />
        </main>
    );
}
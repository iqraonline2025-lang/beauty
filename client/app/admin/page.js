'use client';
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, PlusCircle, List, Settings, LogOut, Trash2,
  ChevronDown, CalendarCheck, XCircle, CheckCircle, User,
  Clock, Phone, Loader2, Ban
} from 'lucide-react';

export default function AdminPage() {
    const [activeTab, setActiveTab] = useState('dashboard'); 
    const [services, setServices] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const [showBlockForm, setShowBlockForm] = useState(false);
    const [blockData, setBlockData] = useState({ date: '', time: '' });

    const [formData, setFormData] = useState({
        title: '', category: 'Hair', description: '', price: '', duration: '',
    });
    const [imageFile, setImageFile] = useState(null);

    // FIX 1: Enhanced Fetching with Error Handling
    const fetchData = async () => {
        try {
            console.log("Attempting to fetch data from API...");
            const [servRes, bookRes] = await Promise.all([
                fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/services/all`).catch(e => ({ json: () => [] })),
                fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings/all`).catch(e => ({ json: () => [] }))
            ]);
            
            const sData = await servRes.json();
            const bData = await bookRes.json();
            
            console.log("Services received:", sData);
            console.log("Bookings received:", bData);

            // Ensure we are setting arrays even if the API sends an object/error
            setServices(Array.isArray(sData) ? sData : (sData.services || []));
            setBookings(Array.isArray(bData) ? bData : (bData.bookings || []));
        } catch (err) { 
            console.error("Critical Fetch Error:", err); 
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, []);

    // FIX 2: Fixed handleDelete to refresh the list immediately
    const handleDelete = async (id) => {
        if (!window.confirm("Delete this service?")) return;
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/services/${id}`, { method: 'DELETE' });
            if (res.ok) {
                // Manually filter local state for instant UI update
                setServices(prev => prev.filter(s => s._id !== id));
            }
        } catch (err) { alert("Delete failed"); }
    };

    const handleToggleStatus = async (id, currentStatus) => {
        const newStatus = currentStatus === 'confirmed' ? 'cancelled' : 'confirmed';
        try {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings/${id}/cancel`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });
            fetchData();
        } catch (err) { alert("Update failed"); }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.keys(formData).forEach(key => data.append(key, formData[key]));
        data.append('slug', formData.title.toLowerCase().replace(/\s+/g, '-'));
        if (imageFile) data.append('image', imageFile);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/services`, { method: 'POST', body: data });
            if (res.ok) {
                setFormData({ title: '', category: 'Hair', description: '', price: '', duration: '' });
                setImageFile(null);
                await fetchData(); // Force a fresh list download
                setActiveTab('manage');
            }
        } catch (err) { alert("Error saving service"); }
    };

    if (loading) return <div className="h-screen flex items-center justify-center bg-[#FDFCFD]"><Loader2 className="animate-spin text-pink-500" size={48} /></div>;

    return (
        <div className="flex min-h-screen bg-[#FDFCFD]">
            <aside className="w-72 bg-white border-r border-pink-100 flex flex-col fixed h-full z-10 shadow-sm">
                <div className="p-8 mb-4">
                    <h1 className="text-2xl font-serif italic font-bold text-gray-900">Glow<span className="text-pink-500">Admin</span></h1>
                </div>
                <nav className="flex-1 px-4 space-y-2">
                    <SidebarItem icon={<LayoutDashboard size={20}/>} label="Dashboard" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
                    <SidebarItem icon={<CalendarCheck size={20}/>} label="Appointments" active={activeTab === 'appointments'} onClick={() => setActiveTab('appointments')} />
                    <SidebarItem icon={<PlusCircle size={20}/>} label="Add New Service" active={activeTab === 'add'} onClick={() => setActiveTab('add')} />
                    <SidebarItem icon={<List size={20}/>} label="Manage Menu" active={activeTab === 'manage'} onClick={() => setActiveTab('manage')} />
                </nav>
            </aside>

            <main className="flex-1 ml-72 p-12">
                
                {activeTab === 'dashboard' && (
                    <div className="animate-in fade-in">
                        <h2 className="text-4xl font-serif italic mb-10 text-gray-900">Hello, Beautiful</h2>
                        <div className="grid grid-cols-3 gap-8">
                            <StatCard label="Live Services" value={services.length} color="text-pink-600" />
                            <StatCard label="Total Bookings" value={bookings.length} color="text-gray-800" />
                            <StatCard label="Confirmed" value={bookings.filter(b => b.status === 'confirmed').length} color="text-green-600" />
                        </div>
                    </div>
                )}

                {activeTab === 'appointments' && (
                    <div className="animate-in fade-in">
                        <h2 className="text-3xl font-serif italic mb-8 text-gray-900">Appointment Book</h2>
                        <div className="grid gap-4">
                            {bookings && bookings.length > 0 ? (
                                bookings.slice().reverse().map((booking) => (
                                    <div key={booking._id} className="bg-white p-6 rounded-[2rem] border border-gray-100 flex items-center justify-between shadow-sm">
                                        <div className="flex-1 grid grid-cols-4 gap-4 items-center">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-pink-50 rounded-full text-pink-500"><User size={16}/></div>
                                                <div>
                                                    <p className="font-bold text-gray-800">{booking.customerName || 'Guest'}</p>
                                                    <p className="text-[10px] text-pink-500 font-black uppercase">{booking.service?.title || 'Service'}</p>
                                                </div>
                                            </div>
                                            <div className="text-gray-500 text-sm"><Clock size={16} className="inline mr-2"/>{booking.date} @ {booking.time}</div>
                                            <div className="text-gray-400 text-xs truncate">{booking.phone || 'No Phone'}</div>
                                            <div className={`text-[10px] font-black uppercase ${booking.status === 'confirmed' ? 'text-green-500' : 'text-red-500'}`}>{booking.status}</div>
                                        </div>
                                        <button onClick={() => handleToggleStatus(booking._id, booking.status)} className="p-2 text-gray-300 hover:text-pink-500">
                                            {booking.status === 'confirmed' ? <XCircle size={24}/> : <CheckCircle size={24}/>}
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-20 bg-white rounded-[2.5rem] border-2 border-dashed border-gray-100 text-gray-400">No bookings currently showing.</div>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 'add' && (
                    <div className="max-w-3xl animate-in slide-in-from-bottom-4">
                        <h2 className="text-3xl font-serif italic mb-8 text-gray-900">Create Treatment</h2>
                        <form onSubmit={handleSubmit} className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100 space-y-8">
                            <div className="grid grid-cols-2 gap-8">
                                <FormInput label="Title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} placeholder="e.g. Russian Volume" required />
                                <div className="space-y-2">
                                    <label className="text-[11px] font-black uppercase text-gray-500 ml-1">Category</label>
                                    <select className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-white text-sm" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
                                        <option value="Hair">Hair</option>
                                        <option value="Lashes">Lashes</option>
                                        <option value="Brows">Brows</option>
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-8">
                                <FormInput label="Price (£)" type="number" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} required />
                                <FormInput label="Duration" value={formData.duration} onChange={(e) => setFormData({...formData, duration: e.target.value})} required />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[11px] font-black uppercase text-gray-500 ml-1">Description</label>
                                <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full p-5 rounded-2xl border border-gray-200 h-32 text-sm" required />
                            </div>
                            <button type="submit" className="w-full bg-black text-white py-5 rounded-2xl font-black uppercase text-xs hover:bg-pink-500 transition-all">Save & Publish</button>
                        </form>
                    </div>
                )}

                {activeTab === 'manage' && (
                    <div className="animate-in fade-in">
                        <h2 className="text-3xl font-serif italic mb-8 text-gray-900">Live Menu Management</h2>
                        <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 border-b">
                                    <tr>
                                        <th className="p-6 text-[11px] font-black uppercase text-gray-500">Treatment</th>
                                        <th className="p-6 text-[11px] font-black uppercase text-gray-500">Price</th>
                                        <th className="p-6 text-right text-[11px] font-black uppercase text-gray-500 pr-10">Delete</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {services && services.length > 0 ? services.map((s) => (
                                        <tr key={s._id} className="hover:bg-pink-50/20 transition-colors">
                                            <td className="p-6">
                                                <p className="font-bold text-gray-900">{s.title}</p>
                                                <p className="text-[10px] uppercase text-gray-400 font-black">{s.category}</p>
                                            </td>
                                            <td className="p-6 font-black text-pink-600">£{s.price}</td>
                                            <td className="p-6 text-right pr-10">
                                                <button onClick={() => handleDelete(s._id)} className="text-gray-300 hover:text-red-500 transition-all"><Trash2 size={20}/></button>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr><td colSpan="3" className="p-10 text-center text-gray-400 italic">No services added yet.</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

// --- UI HELPERS ---
const SidebarItem = ({ icon, label, active, onClick }) => (
    <button onClick={onClick} className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all ${active ? "bg-pink-500 text-white shadow-lg" : "text-gray-400 hover:bg-gray-50"}`}>
        {icon} <span className="text-sm font-medium">{label}</span>
    </button>
);

const StatCard = ({ label, value, color }) => (
    <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col items-center">
        <p className="text-[11px] font-black uppercase text-gray-400 mb-2">{label}</p>
        <p className={`text-5xl font-serif italic ${color}`}>{value || 0}</p>
    </div>
);

const FormInput = ({ label, ...props }) => (
    <div className="space-y-2 w-full">
        <label className="text-[11px] font-black uppercase text-gray-500 block ml-1">{label}</label>
        <input {...props} className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-pink-400 outline-none text-sm" />
    </div>
);
'use client';
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, PlusCircle, List, Settings, LogOut, Trash2,
  ChevronDown, CalendarCheck, XCircle, CheckCircle, User,
  Clock, Phone, Loader2, Ban, Image as ImageIcon
} from 'lucide-react';

export default function AdminPage() {
    const [activeTab, setActiveTab] = useState('dashboard'); 
    const [services, setServices] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const [formData, setFormData] = useState({
        title: '', category: 'Hair', description: '', price: '', duration: '',
    });
    const [imageFile, setImageFile] = useState(null);

    const fetchData = async () => {
        try {
            const [servRes, bookRes] = await Promise.all([
                fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/services/all`),
                fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings/all`)
            ]);
            
            const sData = await servRes.json();
            const bData = await bookRes.json();
            
            setServices(Array.isArray(sData) ? sData : (sData.services || []));
            setBookings(Array.isArray(bData) ? bData : (bData.bookings || []));
        } catch (err) { 
            console.error("Fetch Error:", err); 
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, []);

    // --- SERVICE ACTIONS ---
    const handleDelete = async (id) => {
        if (!window.confirm("Delete this service?")) return;
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/services/${id}`, { method: 'DELETE' });
            if (res.ok) setServices(prev => prev.filter(s => s._id !== id));
        } catch (err) { alert("Delete failed"); }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('title', formData.title);
        data.append('category', formData.category);
        data.append('description', formData.description);
        data.append('price', formData.price);
        data.append('duration', formData.duration);
        if (imageFile) data.append('image', imageFile);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/services`, { 
                method: 'POST', 
                body: data 
            });
            
            if (res.ok) {
                setFormData({ title: '', category: 'Hair', description: '', price: '', duration: '' });
                setImageFile(null);
                await fetchData();
                setActiveTab('manage');
            } else {
                const errorResult = await res.json();
                alert(`Error: ${errorResult.message}`);
            }
        } catch (err) { alert("Error saving service"); }
    };

    // --- BOOKING ACTIONS (NEW) ---
    const handleCancelBooking = async (id) => {
        if (!window.confirm("Are you sure you want to cancel this appointment?")) return;
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings/${id}`, {
                method: 'PUT', // Matches your backend cancelBooking logic
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: 'cancelled' })
            });
            
            if (res.ok) {
                // Update local state immediately
                setBookings(prev => prev.map(b => b._id === id ? { ...b, status: 'cancelled' } : b));
            } else {
                alert("Failed to cancel booking");
            }
        } catch (err) {
            console.error("Cancel Error:", err);
        }
    };

    if (loading) return <div className="h-screen flex items-center justify-center bg-[#FDFCFD]"><Loader2 className="animate-spin text-pink-500" size={48} /></div>;

    return (
        <div className="flex min-h-screen bg-[#FDFCFD]">
            {/* Sidebar */}
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

            {/* Main Content */}
            <main className="flex-1 ml-72 p-12">
                
                {/* Dashboard Tab */}
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

                {/* Appointments Tab (ADDED SECTION) */}
                {activeTab === 'appointments' && (
                    <div className="animate-in fade-in">
                        <h2 className="text-3xl font-serif italic mb-8 text-gray-900">Manage Appointments</h2>
                        <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 border-b">
                                    <tr>
                                        <th className="p-6 text-[11px] font-black uppercase text-gray-500">Client</th>
                                        <th className="p-6 text-[11px] font-black uppercase text-gray-500">Service & Date</th>
                                        <th className="p-6 text-[11px] font-black uppercase text-gray-500">Status</th>
                                        <th className="p-6 text-right text-[11px] font-black uppercase text-gray-500 pr-10">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {bookings.length > 0 ? bookings.map((b) => (
                                        <tr key={b._id} className="hover:bg-pink-50/20 transition-colors">
                                            <td className="p-6">
                                                <p className="font-bold text-gray-900">{b.customerName}</p>
                                                <p className="text-xs text-gray-400">{b.email}</p>
                                                <p className="text-xs text-gray-400">{b.phone}</p>
                                            </td>
                                            <td className="p-6">
                                                <p className="text-sm font-medium text-pink-600">{b.service?.title || 'General Booking'}</p>
                                                <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                                                    <CalendarCheck size={14} /> {b.date}
                                                    <Clock size={14} className="ml-2" /> {b.time}
                                                </div>
                                            </td>
                                            <td className="p-6">
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                                                    b.status === 'confirmed' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                                                }`}>
                                                    {b.status}
                                                </span>
                                            </td>
                                            <td className="p-6 text-right pr-10">
                                                {b.status !== 'cancelled' && (
                                                    <button onClick={() => handleCancelBooking(b._id)} className="text-red-400 hover:text-red-600 transition-all flex items-center justify-end gap-1 ml-auto">
                                                        <Ban size={16}/> <span className="text-[10px] font-black uppercase">Cancel</span>
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr><td colSpan="4" className="p-10 text-center text-gray-400 italic">No bookings found.</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Add Service Tab */}
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
                                <div className="space-y-2">
                                    <label className="text-[11px] font-black uppercase text-gray-500 ml-1">Duration (min)</label>
                                    <input value={formData.duration} onChange={(e) => setFormData({...formData, duration: e.target.value})} className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-pink-400 outline-none text-sm" required />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[11px] font-black uppercase text-gray-500 ml-1">Service Image</label>
                                <div className="relative border-2 border-dashed border-gray-100 rounded-2xl p-8 text-center hover:bg-gray-50 transition-all cursor-pointer">
                                    <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                                    <div className="flex flex-col items-center gap-2">
                                        <ImageIcon className="text-pink-400" size={32} />
                                        <p className="text-sm text-gray-500">{imageFile ? imageFile.name : "Click to upload image"}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[11px] font-black uppercase text-gray-500 ml-1">Description</label>
                                <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full p-5 rounded-2xl border border-gray-200 h-32 text-sm" required />
                            </div>
                            <button type="submit" className="w-full bg-black text-white py-5 rounded-2xl font-black uppercase text-xs hover:bg-pink-500 transition-all">Save & Publish</button>
                        </form>
                    </div>
                )}

                {/* Manage Tab */}
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
                                    {services.length > 0 ? services.map((s) => (
                                        <tr key={s._id} className="hover:bg-pink-50/20 transition-colors">
                                            <td className="p-6">
                                                <div className="flex items-center gap-4">
                                                    {s.image && <img src={`${process.env.NEXT_PUBLIC_API_URL}${s.image}`} className="w-12 h-12 rounded-xl object-cover" />}
                                                    <div>
                                                        <p className="font-bold text-gray-900">{s.title}</p>
                                                        <p className="text-[10px] uppercase text-gray-400 font-black">{s.category}</p>
                                                    </div>
                                                </div>
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

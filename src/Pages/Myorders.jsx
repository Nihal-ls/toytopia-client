import React, { use, useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Package, Calendar, CreditCard, ChevronRight, ShoppingBag, Truck, CheckCircle, Clock } from 'lucide-react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { useNavigate } from 'react-router';
import { Authcontext } from '../Provider/AuthProvider';

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = use(Authcontext);
    const userEmail = user?.email;
    const navigate = useNavigate();

    useEffect(() => {
        if (userEmail) {
            const fetchOrders = async () => {
                try {
                    const res = await axios.get(`http://localhost:5000/my-orders?email=${userEmail}`);
                    setOrders(res.data);
                } catch (err) {
                    console.error("Fetch orders failed", err);
                } finally {
                    setLoading(false);
                }
            };
            fetchOrders();
        }
    }, [userEmail]);

    // Logic for Delivery Status (Dstatus)
    const getDeliveryStyles = (status) => {
        switch (status?.toLowerCase()) {
            case 'processing':
                return {
                    bg: 'bg-amber-100',
                    text: 'text-amber-600',
                    border: 'border-amber-200',
                    icon: <Clock size={14} />,
                    label: 'Processing'
                };
            case 'on the way':
                return {
                    bg: 'bg-blue-100',
                    text: 'text-blue-600',
                    border: 'border-blue-200',
                    icon: <Truck size={14} />,
                    label: 'On The Way'
                };
            case 'delivered':
                return {
                    bg: 'bg-green-100',
                    text: 'text-green-600',
                    border: 'border-green-200',
                    icon: <CheckCircle size={14} />,
                    label: 'Delivered'
                };
            default:
                return {
                    bg: 'bg-slate-100',
                    text: 'text-slate-600',
                    border: 'border-slate-200',
                    icon: <Package size={14} />,
                    label: 'Pending'
                };
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center font-black text-violet-600 animate-pulse text-2xl">Toy-Topia is fetching your treasures...</div>;

    return (
        <div className="bg-slate-50 min-h-screen font-sans">
            <div className="max-w-6xl mx-auto px-6 py-16">
                <header className="mb-12">
                    <span className="text-violet-600 font-black tracking-widest text-xs uppercase bg-violet-50 px-4 py-1.5 rounded-full">
                        Account Dashboard
                    </span>
                    <h1 className="text-5xl font-black text-slate-900 mt-3 tracking-tight">
                        My <span className="text-violet-600 italic">Orders</span>
                    </h1>
                </header>

                {orders.length > 0 ? (
                    <div className="space-y-8">
                        {orders.map((order, idx) => {
                            const statusClasses = {
                                'processing': 'bg-amber-100 text-amber-600 border-amber-200',
                                'on the way': 'bg-blue-100 text-blue-600 border-blue-200',
                                'delivered': 'bg-green-100 text-green-600 border-green-200',
                                'pending': 'bg-red-100 text-red-600 border-red-200',
                            };
                            const currentClass = statusClasses[order.Dstatus?.toLowerCase()] || 'bg-slate-100 text-slate-600 border-slate-200';
                            return (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    key={order._id}
                                    className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-white overflow-hidden group"
                                >
                                    {/* Order Header */}
                                    <div className="bg-slate-900 p-6 md:px-10 flex flex-col md:flex-row justify-between items-center gap-4">
                                        <div className="flex items-center gap-6">
                                            <div className="p-3 bg-slate-800 rounded-2xl text-violet-400">
                                                <Package size={24} />
                                            </div>
                                            <div>
                                                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Order ID</p>
                                                <p className="text-white font-bold tracking-tight">#{order.transactionId?.slice(-10).toUpperCase()}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-8">
                                            {/* Payment Status (Standard) */}
                                            <div className="text-right hidden md:block">
                                                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Payment</p>
                                                <span className="text-green-400 font-bold text-sm flex items-center gap-1">
                                                    <CheckCircle size={12} /> {order.status}
                                                </span>
                                            </div>

                                            {/* Dynamic Delivery Status Badge */}
                                            <div className={`flex items-center gap-2 px-5 py-2 rounded-full font-black text-xs uppercase tracking-tighter border-2 transition-all ${currentClass}`}>
                                                {order.Dstatus}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Order Content */}
                                    <div className="p-8 md:p-10">
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                            {order.items.map((item, i) => (
                                                <div key={i} className="flex items-center gap-4 bg-slate-50 p-4 rounded-3xl border border-slate-100">
                                                    <img src={item.image} className="w-16 h-16 object-contain drop-shadow-md" alt={item.name} />
                                                    <div>
                                                        <p className="font-black text-slate-900 text-sm line-clamp-1">{item.name}</p>
                                                        <p className="text-violet-600 font-bold text-xs">${item.price}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Footer Stats */}
                                        <div className="mt-10 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
                                            <div className="flex items-center gap-4 text-slate-500 font-bold text-sm">
                                                <Calendar size={18} className="text-violet-400" />
                                                Ordered on: {new Date(order.orderDate).toLocaleDateString()}
                                            </div>
                                            <div className="flex items-center gap-6">
                                                <div className="text-right">
                                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Amount</p>
                                                    <p className="text-3xl font-black text-slate-900">${order.totalPrice?.toFixed(2)}</p>
                                                </div>
                                                <button className="p-4 bg-slate-900 text-white rounded-2xl hover:bg-violet-600 transition-all active:scale-95">
                                                    <ChevronRight size={20} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="bg-white rounded-[3rem] p-20 text-center border-2 border-dashed border-slate-200">
                        <ShoppingBag size={64} className="mx-auto text-slate-200 mb-6" />
                        <h3 className="text-2xl font-black text-slate-900 mb-2">No orders found!</h3>
                        <p className="text-slate-400 font-bold mb-8">It looks like you haven't bought any toys yet.</p>
                        <button onClick={() => navigate('/allToys')} className="px-8 py-4 bg-violet-600 text-white rounded-2xl font-black hover:shadow-xl hover:shadow-violet-200 transition-all">
                            Explore Toys
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyOrders;
import React, { use, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router';
import { Check, Package, Home, ArrowRight, ReceiptText } from 'lucide-react';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { Authcontext } from '../Provider/AuthProvider';

const Success = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const hasProcessed = useRef(false); // 1. Create the guard
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(true);
    const [loading, setLoading] = useState(true);
    // Replace with your real user email from AuthContext
    const { user } = use(Authcontext);

    useEffect(() => {
        // 2. Check if we've already handled this session in this lifecycle
        if (sessionId && !hasProcessed.current) {
            hasProcessed.current = true; // 3. Lock it immediately

            const finalizeOrder = async () => {
                try {
                    // Fetch cart
                    const cartRes = await axios.get(`http://localhost:5000/cart?email=${user.email}`);
                    const cartData = cartRes.data;

                    if (cartData.length > 0) {
                        const orderPayload = {
                            items: cartData,
                            email: user.email,
                            transactionId: sessionId, // Use this as a unique key
                            status: "Paid",
                            Dstatus: "Processing"
                        };

                        // Post order
                        await axios.post('http://localhost:5000/orders', orderPayload);
                        // Clear cart
                        await axios.delete(`http://localhost:5000/clear-cart?email=${user.email}`);
                    }
                } catch (err) {
                    console.error("Order processing failed", err);
                } finally {
                    setLoading(false);
                }
            };

            finalizeOrder();
        }
    }, [sessionId, user.email]);

    return (
        <div className="min-h-screen bg-slate-50 font-sans">


            <div className="max-w-4xl mx-auto px-6 py-20 flex flex-col items-center">
                {/* Success Animation Ring */}
                <motion.div
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center shadow-2xl shadow-green-200 mb-10"
                >
                    <Check className="text-white w-12 h-12 stroke-[4px]" />
                </motion.div>

                {/* Main Glass Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white border border-white rounded-[3rem] p-10 md:p-16 shadow-2xl shadow-slate-200 text-center w-full relative overflow-hidden"
                >
                    {/* Decorative Background Element */}
                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-violet-100 rounded-full blur-3xl opacity-50"></div>

                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
                        Payment <span className="text-violet-600 italic">Received!</span>
                    </h1>

                    <p className="text-slate-500 font-bold text-lg mb-8 max-w-md mx-auto">
                        Your order is officially confirmed. Our toy experts are already packing your treasures!
                    </p>

                    {/* Order Details Mini-Card */}
                    <div className="bg-slate-50 rounded-3xl p-6 mb-10 border border-slate-100 flex flex-col md:flex-row justify-around items-center gap-6">
                        <div className="text-center">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Order Status</p>
                            <span className="px-4 py-1.5 bg-green-100 text-green-600 rounded-full font-black text-xs uppercase">
                                {isProcessing ? "Processing..." : "Paid & Verified"}
                            </span>
                        </div>
                        <div className="h-10 w-px bg-slate-200 hidden md:block"></div>
                        <div className="text-center">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Payment ID</p>
                            <p className="font-bold text-slate-900 text-sm">{sessionId?.slice(0, 15)}...</p>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <button
                            onClick={() => navigate('/allToys')}
                            className="flex items-center justify-center gap-3 py-5 bg-slate-900 text-white rounded-2xl font-black text-lg hover:bg-violet-600 transition-all active:scale-95 group"
                        >
                            <Home className="w-5 h-5" /> Back to Shop
                        </button>

                        <button
                            onClick={() => navigate('/myOrders')} // Assuming you'll build this next
                            className="flex items-center justify-center gap-3 py-5 bg-white border-2 border-slate-900 text-slate-900 rounded-2xl font-black text-lg hover:bg-slate-50 transition-all active:scale-95 group"
                        >
                            <ReceiptText className="w-5 h-5" /> View My Orders <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </motion.div>

                {/* Support Note */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-10 text-slate-400 font-bold flex items-center gap-2"
                >
                    <Package className="w-5 h-5 text-violet-400" />
                    Order confirmation email has been sent to {user?.email}
                </motion.p>
            </div>

        </div>
    );
};

export default Success;
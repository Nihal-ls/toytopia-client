import React, { useState, useEffect, useContext, use } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Trash2, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router'; 
import { Authcontext } from '../Provider/AuthProvider';
// import { AuthContext } from '../Providers/AuthProvider'; // Uncomment this

const MyCart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Replace with your actual context logic
    // const { user } = useContext(AuthContext);
    const {user} = use(Authcontext) // Use user?.email here

    useEffect(() => {
        if (user.email) fetchCart();
    }, [user.email]);

    const fetchCart = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/cart?email=${user.email}`);
            setCartItems(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching cart:", error);
            setLoading(false);
        }
    };

    const subtotal = cartItems.reduce((total, item) => total + parseFloat(item.price || 0), 0);
    const shippingCost = cartItems.length > 0 ? 10 : 0;
    const grandTotal = subtotal + shippingCost;

    // --- STRIPE CHECKOUT LOGIC ---
    const handleCheckout = async () => {
        if (cartItems.length === 0) return;

        try {
            const response = await axios.post('http://localhost:5000/create-checkout-session', {
                cartItems,
                userEmail: user.email
            });

            if (response.data.url) {
                // Redirecting to Stripe's secure hosted page
                window.location.href = response.data.url;
            }
        } catch (error) {
            console.error("Checkout Error:", error);
            Swal.fire("Error", "Could not initiate payment. Try again.", "error");
        }
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Remove from cart?",
            text: "You can always add this toy back later!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#7C3AED",
            cancelButtonColor: "#EF4444",
            confirmButtonText: "Yes, delete it!",
            background: "#ffffff",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.delete(`http://localhost:5000/cart/${id}`);
                    if (response.data.deletedCount > 0) {
                        setCartItems(cartItems.filter(item => item._id !== id));
                        Swal.fire({ title: "Deleted!", icon: "success", showConfirmButton: false, timer: 1500 });
                    }
                } catch (error) {
                    Swal.fire("Error", "Failed to remove the item.", "error");
                }
            }
        });
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center font-black text-violet-600 italic text-2xl">Loading your treasures...</div>;

    return (
        <div className="bg-slate-50 min-h-screen font-sans">
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                    <div>
                        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-violet-600 font-black tracking-widest text-xs uppercase bg-violet-50 px-4 py-1.5 rounded-full">
                            Your Selection
                        </motion.span>
                        <h1 className="text-5xl font-black text-slate-900 mt-3 tracking-tight">Shopping <span className="text-violet-600 italic">Cart</span></h1>
                    </div>
                    <p className="text-slate-500 font-bold flex items-center gap-2 bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-100">
                        <ShoppingBag className="w-5 h-5 text-violet-500" /> {cartItems.length} Items Selected
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-6">
                        <AnimatePresence mode='popLayout'>
                            {cartItems.length > 0 ? (
                                cartItems.map((item) => (
                                    <motion.div key={item._id} layout initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, scale: 0.95, x: -50 }} className="bg-white p-6 rounded-[2.5rem] shadow-xl shadow-slate-200/40 border border-white flex flex-col sm:flex-row items-center gap-8 relative group overflow-hidden">
                                        <div className="w-32 h-32 bg-slate-50 rounded-3xl flex items-center justify-center p-4 transform group-hover:scale-105 transition-transform duration-500">
                                            <img src={item.image} alt={item.name} className="max-w-full max-h-full object-contain drop-shadow-lg" />
                                        </div>
                                        <div className="flex-1 text-center sm:text-left">
                                            <span className="text-[10px] font-black text-violet-500 uppercase tracking-widest mb-1 block">{item.subCategory}</span>
                                            <h3 className="text-xl font-black text-slate-900 mb-1">{item.name}</h3>
                                            <p className="text-slate-400 text-sm font-medium line-clamp-1">{item.description}</p>
                                        </div>
                                        <div className="flex items-center gap-8">
                                            <div className="text-right">
                                                <p className="text-2xl font-black text-slate-900">${item.price}</p>
                                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Unit Price</p>
                                            </div>
                                            <button onClick={() => handleDelete(item._id)} className="p-4 bg-red-50 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all shadow-sm active:scale-90">
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <div className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
                                    <ShoppingBag className="w-16 h-16 text-slate-200 mx-auto mb-4" />
                                    <p className="text-slate-400 font-bold text-xl">Your cart is feeling a bit light...</p>
                                    <Link to="/allToys" className="mt-6 text-violet-600 font-black underline">Continue Shopping</Link>
                                </div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="lg:col-span-1">
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-slate-900 text-white p-8 md:p-10 rounded-[3rem] shadow-2xl shadow-purple-200/20 sticky top-8 border border-slate-800">
                            <h2 className="text-2xl font-black mb-8 flex items-center gap-3">
                                Summary <div className="h-1 w-12 bg-purple-500 rounded-full"></div>
                            </h2>

                            <div className="space-y-5 mb-10">
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-400 font-bold">Items Subtotal</span>
                                    <span className="font-black text-xl text-white">${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-400 font-bold">Shipping Cost</span>
                                    <span className="font-black text-purple-400">{shippingCost > 0 ? `+$${shippingCost.toFixed(2)}` : '$0.00'}</span>
                                </div>
                                <div className="border-t border-slate-800 my-2"></div>
                                <div className="flex justify-between items-end pt-2">
                                    <div>
                                        <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">Total to Pay</p>
                                        <motion.p key={grandTotal} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-5xl font-black text-white">
                                            ${grandTotal.toFixed(2)}
                                        </motion.p>
                                    </div>
                                </div>
                            </div>

                            <button 
                                onClick={handleCheckout}
                                disabled={cartItems.length === 0}
                                className="w-full py-5 bg-purple-600 hover:bg-purple-500 disabled:bg-slate-700 text-white rounded-2xl font-black text-lg transition-all shadow-xl shadow-purple-900/40 flex items-center justify-center gap-3 group active:scale-[0.97]"
                            >
                                Proceed to Checkout
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>

                            <div className="mt-8 flex items-center justify-center gap-2 text-slate-500">
                                <ShieldCheck className="w-4 h-4" />
                                <span className="text-[10px] font-bold uppercase tracking-widest">Secure MERN Stack Payment</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyCart;
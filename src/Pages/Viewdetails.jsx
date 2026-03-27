import React, { use, useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import { useLoaderData, useParams } from 'react-router';
import Footer from '../Components/Footer';
import Swal from 'sweetalert2';
import { AiFillStar } from 'react-icons/ai';
import { FiMail, FiUser, FiTag, FiShoppingBag } from 'react-icons/fi';
import axios from 'axios';
import { Authcontext } from '../Provider/AuthProvider';

const Viewdetails = () => {
    const data = useLoaderData();
    const [toy, settoy] = useState({});
    const { ToyId } = useParams();
    const { user } = use(Authcontext)
    useEffect(() => {
        const clickedToy = data.find(SingleToy => SingleToy._id == ToyId);
        settoy(clickedToy || {});
    }, [data, ToyId]);

    const handlefeedBackSubmit = (e) => {
        e.preventDefault();
        Swal.fire({
            icon: "success",
            title: "Thank You!",
            text: "Your feedback has been received.",
            confirmButtonColor: "#7C3AED", // Violet theme color
        });
        e.target.reset();
    };

    // cart
    const handleAddToCart = async () => {
        // 1. Check if user is logged in (Optional but recommended)
        /* if (!user) {
            return Swal.fire({
                icon: 'warning',
                title: 'Please Login',
                text: 'You need to be logged in to add items to the cart.',
                confirmButtonColor: '#7C3AED'
            });
        } */

        // 2. Prepare the data
        const cartItem = {
            toyId: toy._id,
            name: toy.name,
            price: toy.price,
            image: toy.image,
            subCategory: toy.subCategory,
            sellerName: toy.sellerName,
            addedBy: user.email,
            // email: user?.email, // Associating this item with the logged-in user
            quantity: 1
        };

        try {
            // 3. Make the POST request using Axios
            const response = await axios.post('http://localhost:5000/cart', cartItem);

            // 4. Handle Success
            if (response.data.insertedId) {
                Swal.fire({
                    icon: "success",
                    title: "Added to Cart!",
                    text: `${toy.name} has been added to your collection.`,
                    showConfirmButton: false,
                    timer: 1500,
                    iconColor: "#7C3AED",
                });
            }
        } catch (error) {
            // 5. Handle Errors
            console.error("Axios Error:", error);
            Swal.fire({
                icon: "error",
                title: "Failed to Add",
                text: error.response?.data?.message || "Something went wrong. Please try again.",
                confirmButtonColor: "#7C3AED",
            });
        }
    };




    return (
        <div className="bg-slate-50 min-h-screen font-sans">
            <Navbar />

            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Main Product Showcase Card */}
                <div className="bg-white rounded-[3rem] shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-100">
                    <div className="grid grid-cols-1 lg:grid-cols-2">

                        {/* Left: Image Section */}
                        <div className="bg-slate-50 flex items-center justify-center p-12 relative">
                            <div className="absolute top-8 left-8">
                                <span className="bg-violet-600 text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-lg shadow-violet-200">
                                    {toy.subCategory || 'Premium Collection'}
                                </span>
                            </div>
                            <img
                                className="w-full max-w-md h-auto object-contain drop-shadow-2xl transform hover:scale-105 transition-transform duration-700"
                                src={toy.image}
                                alt={toy.name}
                            />
                        </div>

                        {/* Right: Info Section */}
                        <div className="p-10 lg:p-16 flex flex-col justify-center">
                            <div className="space-y-6">
                                <h1 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
                                    {toy.name}
                                </h1>

                                <div className="flex items-center gap-6">
                                    <p className="text-3xl font-black text-violet-600">${toy.price}</p>
                                    <div className="flex items-center gap-1 bg-amber-50 px-3 py-1 rounded-full border border-amber-100">
                                        <AiFillStar className="text-amber-500" />
                                        {/* <span className="font-bold text-amber-700">{toy.rating}</span> */}
                                    </div>
                                    <span className="text-slate-400 font-bold text-sm uppercase tracking-widest flex items-center gap-2">
                                        {/* <FiShoppingBag /> {toy.availableQuantity} Left */}
                                    </span>
                                </div>

                                <p className="text-slate-500 leading-relaxed text-lg border-l-4 border-violet-100 pl-6 italic">
                                    "{toy.description}"
                                </p>

                                {/* Seller Info Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
                                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-2">
                                            <FiUser className="text-violet-500" /> Seller Name
                                        </p>
                                        {/* <p className="font-bold text-slate-800">{toy.sellerName}</p> */}
                                    </div>
                                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-2">
                                            <FiMail className="text-violet-500" /> Seller Contact
                                        </p>
                                    </div>
                                </div>

                                <button className="w-full py-5  text-white rounded-2xl font-black text-lg bg-violet-600 transition-all shadow-xl shadow-slate-200 active:scale-[0.98]">
                                    Purchase Now
                                </button>

                                <button
                                    onClick={handleAddToCart}
                                    className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-lg hover:bg-violet-600 transition-all shadow-xl shadow-slate-200 active:scale-[0.98] flex items-center justify-center gap-3"
                                >
                                    <FiShoppingBag /> Add To Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

        
                <div className="mt-24 max-w-3xl mx-auto">
                    <div className="text-center mb-12">
                        <span className="text-violet-600 font-black tracking-widest text-xs uppercase">Community</span>
                        <h2 className="text-4xl font-black text-slate-900 mt-2">Share Your Thoughts</h2>
                        <div className="w-12 h-1.5 bg-violet-600 mx-auto mt-4 rounded-full"></div>
                    </div>

                    <form onSubmit={handlefeedBackSubmit} className="bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-slate-200/60 border border-slate-100 space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-black text-slate-700 ml-2">Display Name</label>
                            <input
                                required
                                className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all font-medium"
                                type="text"
                                placeholder="Enter your name"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-black text-slate-700 ml-2">Your Experience</label>
                            <textarea
                                required
                                rows="5"
                                className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all font-medium resize-none"
                                placeholder="How do you like this toy?"
                            ></textarea>
                        </div>
                        <button type="submit" className="w-full py-5 bg-violet-600 text-white rounded-2xl font-black hover:bg-violet-700 transition-all transform hover:shadow-lg hover:shadow-violet-200 active:scale-95">
                            Submit Feedback
                        </button>
                    </form>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Viewdetails;
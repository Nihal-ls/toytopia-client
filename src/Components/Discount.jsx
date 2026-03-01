import React from 'react';
import { Link, useLoaderData } from 'react-router';

// --- Premium Icons (SVG) ---
const Icons = {
    Tag: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>,
    ArrowRight: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>,
    Shield: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
};

const Discount = () => {
    // API থেকে ডেটা লোড করা হচ্ছে
    const data = useLoaderData() || [];
    // ৩টি ডিসকাউন্ট প্রোডাক্ট স্লাইস করা হচ্ছে
    const discountProducts = data.slice(10, 13);

    return (
        <section className="py-28 px-6 bg-[#F9FAFB] text-[#111827]">
            <div className="max-w-7xl mx-auto">
                
                {/* --- Section Header: Detailed & Professional --- */}
                <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20 border-b border-gray-200 pb-12">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-2 text-indigo-600 font-black text-xs uppercase tracking-[0.3em] mb-5">
                            <span className="w-8 h-[2px] bg-indigo-600"></span>
                            Exclusive Season Deals
                        </div>
                        <h2 className="text-5xl md:text-6xl font-black tracking-tighter leading-[1.1] mb-6">
                            PREMIUM PLAY. <br />
                            <span className="text-gray-400">UNBEATABLE VALUE.</span>
                        </h2>
                    </div>
                    <div className="flex flex-col items-start md:items-end gap-4">
                        <p className="text-gray-500 font-medium text-lg max-w-xs md:text-right leading-relaxed">
                            Expertly crafted toys that inspire growth, now available at special rates for a limited time.
                        </p>
                        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm">
                            <Icons.Shield />
                            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Certified Safety Standards</span>
                        </div>
                    </div>
                </div>

                {/* --- Product Grid: Detailed Cards --- */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {discountProducts.map((toy) => (
                        <div key={toy._id} className="group flex flex-col h-full bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-100 hover:-translate-y-2">
                            
                            {/* Image Wrapper */}
                            <div className="relative aspect-[4/5] overflow-hidden bg-[#F3F4F6]">
                                <img
                                    src={toy.pictureURL}
                                    alt={toy.toyName}
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                />
                                
                                {/* Status Overlays */}
                                <div className="absolute top-6 left-6 flex flex-col gap-2">
                                    <div className="bg-white/90 backdrop-blur px-4 py-1.5 rounded-full shadow-sm">
                                        <span className="text-[11px] font-black tracking-tighter text-indigo-600">NEW ARRIVAL</span>
                                    </div>
                                    <div className="bg-indigo-600 text-white px-4 py-1.5 rounded-full shadow-lg self-start">
                                        <span className="text-[11px] font-black tracking-tighter">SAVE 20%</span>
                                    </div>
                                </div>
                                
                                {/* Icons on Hover */}
                                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                        <Icons.Tag />
                                    </div>
                                </div>
                            </div>

                            {/* Detailed Content */}
                            <div className="p-10 flex flex-col flex-1">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-2xl font-black tracking-tight leading-tight group-hover:text-indigo-600 transition-colors">
                                        {toy.toyName}
                                    </h3>
                                    <div className="flex flex-col items-end">
                                        <span className="text-sm text-gray-400 line-through font-bold">$120</span>
                                        <span className="text-xl font-black text-indigo-600">$96.00</span>
                                    </div>
                                </div>
                                
                                <p className="text-gray-500 text-sm font-medium mb-8 leading-relaxed line-clamp-2">
                                    Designed to stimulate cognitive thinking and motor skills using sustainable materials.
                                </p>
                                
                                <div className="mt-auto">
                                    <Link 
                                        to={`/view-details/${toy._id}`}  
                                        className="inline-flex items-center justify-between w-full border-2 border-[#111827] text-[#111827] px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all hover:bg-[#111827] hover:text-white"
                                    >
                                        Explore Details
                                        <Icons.ArrowRight />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* --- Bottom Utility Banner --- */}
                <div className="mt-20 p-8 bg-indigo-600 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-6 text-white overflow-hidden relative">
                    <div className="flex flex-col md:flex-row items-center gap-6 relative z-10 text-center md:text-left">
                        <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20">
                            <Icons.Tag />
                        </div>
                        <div>
                            <h4 className="text-xl font-black tracking-tight">COUPON: WINTER26</h4>
                            <p className="text-indigo-100 text-sm font-medium opacity-80">Use this code at checkout for additional savings.</p>
                        </div>
                    </div>
                    <button className="bg-white text-indigo-600 px-10 py-4 rounded-xl font-black text-xs uppercase tracking-[0.2em] hover:bg-indigo-50 transition-colors relative z-10 shadow-xl">
                        Copy Code
                    </button>
                    {/* Decorative Background Element */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl"></div>
                </div>
            </div>
        </section>
    );
};

export default Discount;
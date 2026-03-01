import React, { useEffect, useRef, useState } from 'react';
import { useLoaderData } from 'react-router';
import Toycard from '../Components/Toycard';
import { motion } from 'framer-motion'; // Highly recommended for that "premium" feel
import { LuSearch, LuFilter, LuLayoutGrid } from "react-icons/lu";

const AllToys = () => {
    const loaderData = useLoaderData();

    const [toys, setToys] = useState(loaderData || []);
    const [loading, setLoading] = useState(false);

    const searchTimeout = useRef(null); 

    useEffect(() => {
        document.title = "Explore All Toys - ToyTopia";
    }, []);

    // ✅ FUNCTIONS UNCHANGED
    const handleFilter = async (type) => {
        if (type === 'default') {
            setToys(loaderData || []);
            return;
        }
        let url = '';
        if (type === 'high') url = 'https://toytopia-backhand.vercel.app/toys/filter/high';
        if (type === 'low') url = 'https://toytopia-backhand.vercel.app/toys/filter/low';
        if (!url) return;
        setLoading(true);
        try {
            const res = await fetch(url);
            const data = await res.json();
            setToys(data || []);
        } catch (err) {
            console.error('Filter failed:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (text) => {
        if (searchTimeout.current) {
            clearTimeout(searchTimeout.current);
        }
        setLoading(true);
        searchTimeout.current = setTimeout(async () => {
            if (!text.trim()) {
                setToys(loaderData);
                setLoading(false);
                return;
            }
            try {
                const res = await fetch(`https://toytopia-backhand.vercel.app/toys/search/${text}`);
                const result = await res.json();
                const unique = Array.from(
                    new Map(result.map(item => [item._id, item])).values()
                );
                setToys(unique);
            } catch (err) {
                console.error("Search failed:", err);
            } finally {
                setLoading(false);
            }
        }, 400);
    };

    useEffect(() => {
        return () => {
            if (searchTimeout.current) {
                clearTimeout(searchTimeout.current);
            }
        };
    }, []);

    return (
        <div className="min-h-screen bg-[#F8FAFC] pb-20">
            {/* --- Hero Header --- */}
            <div className="bg-white border-b border-slate-100 pt-16 pb-12 px-6">
                <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
                    <motion.span 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-[#7C3AED]/10 text-[#7C3AED] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest"
                    >
                        ToyTopia Collection
                    </motion.span>
                    <h1 className="text-4xl md:text-5xl font-black text-[#0F172A] mt-4 tracking-tight">
                        Explore Our <span className="text-[#7C3AED]">Toy Universe</span>
                    </h1>
                    <p className="text-slate-500 mt-4 max-w-xl font-medium">
                        Find the perfect gift from our curated selection of high-quality toys, 
                        collectibles, and educational sets.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6">
                
                {/* --- Search & Filter Bar --- */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-3xl shadow-sm border border-slate-100 -mt-8 relative z-10">
                    
                    {/* Search Input */}
                    <div className="relative w-full md:flex-1">
                        <LuSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input
                            type="search"
                            placeholder="Search by toy name..."
                            onChange={(e) => handleSearch(e.target.value)}
                            className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-[#7C3AED] outline-none transition-all placeholder:text-slate-400 font-medium"
                        />
                    </div>

                    {/* Filter Dropdown */}
                    <div className="dropdown dropdown-end w-full md:w-auto">
                        <label tabIndex={0} className="btn w-full md:w-auto bg-[#0F172A] hover:bg-[#1E293B] text-white rounded-2xl border-none px-8 py-3.5 h-auto flex items-center gap-2">
                            <LuFilter className="w-4 h-4" />
                            Sort & Filter
                        </label>
                        <ul tabIndex={0} className="dropdown-content menu bg-white rounded-2xl z-50 w-64 p-3 shadow-2xl border border-slate-100 mt-2">
                            <li className="menu-title text-slate-400 uppercase text-[10px] font-bold tracking-widest px-4 py-2">Price Sorting</li>
                            <li><button className="rounded-xl font-bold py-3 hover:bg-slate-50 active:bg-[#7C3AED] active:text-white" onClick={() => handleFilter('default')}>Default (All)</button></li>
                            <li><button className="rounded-xl font-bold py-3 hover:bg-slate-50 active:bg-[#7C3AED] active:text-white" onClick={() => handleFilter('high')}>High to Low Price</button></li>
                            <li><button className="rounded-xl font-bold py-3 hover:bg-slate-50 active:bg-[#7C3AED] active:text-white" onClick={() => handleFilter('low')}>Low to High Price</button></li>
                        </ul>
                    </div>
                </div>

                {/* --- Inventory Stats --- */}
                <div className="flex items-center gap-2 mt-12 mb-6">
                    <LuLayoutGrid className="text-[#7C3AED] w-5 h-5" />
                    <span className="font-bold text-[#0F172A] uppercase tracking-widest text-xs">
                        Showing {toys.length} Products
                    </span>
                    <div className="h-[2px] flex-1 bg-slate-100 rounded-full ml-4"></div>
                </div>

                {/* --- TOY GRID --- */}
                <div className="relative min-h-[400px]">
                    {loading && (
                        <div className="flex flex-col items-center justify-center py-20 space-y-4">
                            <div className="w-12 h-12 border-4 border-[#7C3AED] border-t-transparent rounded-full animate-spin"></div>
                            <p className="text-slate-500 font-bold animate-pulse uppercase tracking-widest text-xs">Scanning the Warehouse...</p>
                        </div>
                    )}

                    {!loading && toys.length === 0 && (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-20 bg-white rounded-[40px] border-2 border-dashed border-slate-100"
                        >
                            <span className="text-6xl mb-4 block">📦</span>
                            <h3 className="text-xl font-bold text-[#0F172A]">No Toys Found</h3>
                            <p className="text-slate-400 mt-2">Try adjusting your search or filters.</p>
                            <button 
                                onClick={() => handleFilter('default')}
                                className="mt-6 text-[#7C3AED] font-bold hover:underline"
                            >
                                View all inventory
                            </button>
                        </motion.div>
                    )}

                    {!loading && toys.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {toys.map((toy) => (
                                <motion.div 
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    key={toy._id}
                                >
                                    <Toycard toy={toy} />
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AllToys;
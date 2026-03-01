import React from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';

const Banner = () => {
    // Animation Variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    return (
        <div className="relative overflow-hidden bg-white py-16 lg:py-24">
            {/* Background Decorative Elements */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5 }}
                className="absolute top-0 left-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-violet-50/50 blur-3xl" 
            />
            
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    
                    {/* Left Side: Content */}
                    <motion.div 
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="text-center lg:text-left z-10"
                    >
                        <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-100 text-violet-700 text-xs font-bold uppercase tracking-widest mb-6">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
                            </span>
                            New Collection Live
                        </motion.div>
                        
                        <motion.h1 variants={fadeInUp} className="text-5xl lg:text-7xl font-black text-slate-900 leading-tight tracking-tight">
                            Where Every Toy <br /> 
                            <span className="text-violet-600 underline decoration-slate-200 decoration-8 underline-offset-8">Tells a Story</span>
                        </motion.h1>
                        
                        <motion.p variants={fadeInUp} className="mt-6 text-lg text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
                            A vibrant marketplace for premium toys. Discover unique collectibles, 
                            educational puzzles, and action figures from local sellers worldwide.
                        </motion.p>
                        
                        <motion.div variants={fadeInUp} className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Link 
                                to="/allToys" 
                                className="px-8 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-violet-600 transition-all duration-300 shadow-xl shadow-slate-200 active:scale-95 text-center"
                            >
                                Shop the Collection
                            </Link>
                            <Link 
                                to="/register" 
                                className="px-8 py-4 bg-white text-slate-900 border-2 border-slate-200 font-bold rounded-2xl hover:border-violet-600 hover:text-violet-600 transition-all duration-300 text-center"
                            >
                                Start Selling
                            </Link>
                        </motion.div>

                        {/* Quick Stats */}
                        <motion.div variants={fadeInUp} className="mt-12 flex items-center justify-center lg:justify-start gap-8 border-t border-slate-100 pt-8">
                            <motion.div whileHover={{ scale: 1.1 }}>
                                <p className="text-2xl font-black text-slate-900">12k+</p>
                                <p className="text-sm text-slate-500 font-medium">Happy Kids</p>
                            </motion.div>
                            <div className="w-px h-10 bg-slate-200"></div>
                            <motion.div whileHover={{ scale: 1.1 }}>
                                <p className="text-2xl font-black text-slate-900">4.9/5</p>
                                <p className="text-sm text-slate-500 font-medium">Avg Rating</p>
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    {/* Right Side: Image with Floating Animation */}
                    <motion.div 
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="relative group"
                    >
                        {/* Abstract Violet Shape */}
                        <motion.div 
                            animate={{ 
                                rotate: [3, -1, 3],
                                scale: [1, 1.05, 1]
                            }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -inset-4 bg-gradient-to-tr from-violet-200 to-fuchsia-100 rounded-[3rem] blur-sm -z-10"
                        />
                        
                        <motion.div 
                            whileHover={{ y: -10 }}
                            className="relative bg-white p-4 rounded-[2.5rem] shadow-2xl"
                        >
                            <img 
                                src="https://images.unsplash.com/photo-1558060370-d644479cb6f7?q=80&w=1000&auto=format&fit=crop" 
                                alt="Kids playing with toys" 
                                className="rounded-[2rem] w-full object-cover aspect-[4/3]"
                            />
                            
                            {/* Floating "New Arrival" Card */}
                            <motion.div 
                                animate={{ y: [0, -15, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 hidden md:block"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-2xl">🧸</div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-400">BEST SELLER</p>
                                        <p className="text-sm font-black text-slate-900">Action Series #04</p>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </motion.div>

                </div>
            </div>
        </div>
    );
};

export default Banner;
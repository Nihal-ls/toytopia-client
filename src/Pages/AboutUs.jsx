import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { LuRocket, LuHeart, LuUsers, LuShieldCheck } from "react-icons/lu";

const AboutUs = () => {
    useEffect(() => {
        document.title = "Our Story - ToyTopia";
    }, []);

    const stats = [
        { label: "Toys Delivered", value: "12k+", icon: <LuRocket className="text-purple-500" /> },
        { label: "Happy Kids", value: "8k+", icon: <LuHeart className="text-red-500" /> },
        { label: "Collectors", value: "5k+", icon: <LuUsers className="text-blue-500" /> },
        { label: "Verified Sellers", value: "200+", icon: <LuShieldCheck className="text-green-500" /> },
    ];

    return (
        <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] overflow-hidden">
            
            {/* --- Hero Section --- */}
            <section className="relative pt-20 pb-16 px-6 text-center overflow-hidden">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-3xl mx-auto relative z-10"
                >
                    <span className="bg-[#7C3AED]/10 text-[#7C3AED] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
                        The ToyTopia Journey
                    </span>
                    <h1 className="text-5xl md:text-7xl font-black mt-6 tracking-tight leading-tight">
                        We Bring <span className="text-[#7C3AED]">Play</span> <br /> Back to Life.
                    </h1>
                    <p className="mt-6 text-lg text-slate-500 leading-relaxed">
                        ToyTopia isn't just a marketplace; it’s a sanctuary for imagination. 
                        Founded in 2024, we’ve dedicated ourselves to connecting the world’s 
                        most unique toys with the hearts that love them most.
                    </p>
                </motion.div>

                {/* Background Decorative Elements */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-0">
                    <div className="absolute top-20 left-10 w-32 h-32 bg-purple-200 rounded-full blur-[80px] opacity-40 animate-pulse"></div>
                    <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-200 rounded-full blur-[100px] opacity-40"></div>
                </div>
            </section>

            {/* --- Stats Bento Grid --- */}
            <section className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <motion.div 
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 flex flex-col items-center text-center group hover:shadow-xl transition-all hover:-translate-y-2"
                        >
                            <div className="text-3xl mb-4 p-4 bg-slate-50 rounded-2xl group-hover:bg-white transition-colors">
                                {stat.icon}
                            </div>
                            <h4 className="text-3xl font-black">{stat.value}</h4>
                            <p className="text-slate-500 text-sm font-medium uppercase tracking-wide mt-1">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* --- Our Mission (Split View) --- */}
            <section className="max-w-7xl mx-auto px-6 py-20">
                <div className="flex flex-col md:flex-row items-center gap-16">
                    <div className="md:w-1/2 relative">
                        <motion.div 
                            initial={{ x: -50, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            className="relative z-10"
                        >
                            <img 
                                src="https://images.unsplash.com/photo-1530648672449-81f6c723e2f1?auto=format&fit=crop&q=80&w=600" 
                                alt="Toy Engineering" 
                                className="rounded-[40px] shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500"
                            />
                        </motion.div>
                        <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-[#7C3AED] rounded-[40px] -z-10 hidden md:block"></div>
                    </div>
                    
                    <div className="md:w-1/2 space-y-6">
                        <h2 className="text-4xl font-black tracking-tight">Built by <span className="text-[#7C3AED]">Collectors</span>, For the Next Generation.</h2>
                        <p className="text-slate-500 text-lg leading-relaxed">
                            Our mission is simple: To provide a safe, curated, and exciting platform where children can find their first best friend and collectors can find that elusive "missing piece."
                        </p>
                        <div className="space-y-4">
                            {['Curated Quality', 'Sustainable Packaging', 'Global Community'].map((item, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="w-6 h-6 rounded-full bg-[#7C3AED] flex items-center justify-center text-white text-[10px] font-bold">✓</div>
                                    <span className="font-bold text-slate-700">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* --- Meet the Team (Unique Layout) --- */}
            <section className="bg-[#0F172A] py-24 px-6 text-white rounded-t-[60px] md:rounded-t-[100px]">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                        <div className="max-w-xl">
                            <h2 className="text-4xl font-bold italic tracking-tight">The Minds Behind the <span className="text-[#7C3AED]">Magic</span></h2>
                            <p className="text-slate-400 mt-4">We are a diverse team of designers, engineers, and (most importantly) big kids at heart.</p>
                        </div>
                        <button className="bg-[#7C3AED] px-8 py-4 rounded-2xl font-bold hover:bg-purple-600 transition-all active:scale-95">
                            Join Our Team
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { name: "Alex Rivers", role: "Founder & Curator", img: "https://i.pravatar.cc/150?img=32" },
                            { name: "Sarah Chen", role: "Creative Director", img: "https://i.pravatar.cc/150?img=44" },
                            { name: "Marcus Toye", role: "Head of Safety", img: "https://i.pravatar.cc/150?img=12" }
                        ].map((member, i) => (
                            <motion.div 
                                key={i}
                                whileHover={{ y: -10 }}
                                className="bg-white/5 p-6 rounded-[32px] border border-white/10 flex items-center gap-5 hover:bg-white/10 transition-all cursor-pointer"
                            >
                                <img src={member.img} alt={member.name} className="w-20 h-20 rounded-2xl object-cover border-2 border-[#7C3AED]" />
                                <div>
                                    <h5 className="text-xl font-bold">{member.name}</h5>
                                    <p className="text-slate-400 text-sm font-medium uppercase tracking-widest">{member.role}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- CTA Section --- */}
            <section className="py-24 px-6 text-center">
                <div className="max-w-2xl  mx-auto bg-gradient-to-br from-[#7C3AED] to-[#4F46E5] p-12 md:p-20 rounded-[60px] text-white shadow-2xl relative overflow-hidden">
                    <h2 className="text-4xl md:text-5xl font-black mb-6 relative z-10 tracking-tight">Want to know more?</h2>
                    <p className="text-purple-100 text-lg mb-10 relative z-10 max-w-xl mx-auto">Sign up for our newsletter to get a behind-the-scenes look at how we source our toys and upcoming drops.</p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
                        <input type="email" placeholder="Enter your email" className="px-6 py-4 rounded-2xl bg-white text-slate-900 outline-none w-full sm:w-72" />
                        <button className="bg-[#0F172A] px-10 py-4 rounded-2xl font-bold hover:opacity-90 transition-all">Subscribe</button>
                    </div>
                    {/* Decorative Blobs */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
                </div>
            </section>

        </div>
    );
};

export default AboutUs;
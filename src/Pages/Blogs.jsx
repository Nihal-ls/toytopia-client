import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LuSearch, LuChevronRight, LuClock, LuTag } from "react-icons/lu";

const Blogs = () => {
    const [activeCategory, setActiveCategory] = useState('All');

    useEffect(() => {
        document.title = "ToyTopia | Blog & Stories";
    }, []);

    const categories = ['All', 'Collectors', 'Parenting', 'New Drops', 'STEM'];

    const blogPosts = [
        {
            id: 1,
            title: "The Rise of AI Toys: What 2026 Has in Store",
            excerpt: "From interactive robots to smart building blocks, discover how AI is changing the way our children play and learn.",
            category: "STEM",
            author: "Sarah Chen",
            date: "Mar 12, 2026",
            readTime: "5 min read",
            image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&q=80&w=800",
            featured: true
        },
        {
            id: 2,
            title: "Why Vintage LEGO Sets are Outperforming Gold",
            excerpt: "Investing in plastic? Experts say your 90s space sets might be worth more than you think.",
            category: "Collectors",
            author: "Alex Rivers",
            date: "Mar 10, 2026",
            readTime: "8 min read",
            image: "https://images.unsplash.com/photo-1585366119957-e556f4035a54?auto=format&fit=crop&q=80&w=600",
            featured: false
        },
        {
            id: 3,
            title: "Top 5 Sensory Toys for Toddlers with ADHD",
            excerpt: "Finding the right balance of stimulation and calm can be tricky. Here are our top picks for 2026.",
            category: "Parenting",
            author: "Dr. Maya Hills",
            date: "Mar 08, 2026",
            readTime: "6 min read",
            image: "https://images.unsplash.com/photo-1515488764276-beab7607c1e6?auto=format&fit=crop&q=80&w=600",
            featured: false
        },
        {
            id: 4,
            title: "Exclusive First Look: The 2026 Star Wars Collection",
            excerpt: "We got our hands on the latest 'Brand New Day' line before they hit the shelves.",
            category: "New Drops",
            author: "Marcus Toye",
            date: "Mar 05, 2026",
            readTime: "4 min read",
            image: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?auto=format&fit=crop&q=80&w=600",
            featured: false
        }
    ];

    const filteredPosts = activeCategory === 'All' 
        ? blogPosts 
        : blogPosts.filter(post => post.category === activeCategory);

    return (
        <div className="min-h-screen bg-[#F8FAFC] pb-20">
            
            {/* --- Header Section --- */}
            <header className="pt-20 pb-12 px-6 text-center">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-3xl mx-auto"
                >
                    <h1 className="text-5xl md:text-6xl font-black text-[#0F172A] tracking-tight">
                        ToyTopia <span className="text-[#7C3AED]">Chronicles</span>
                    </h1>
                    <p className="text-slate-500 mt-4 text-lg font-medium">Insights, stories, and the future of play.</p>
                </motion.div>
            </header>

            {/* --- Featured Post (Hero) --- */}
            <section className="max-w-7xl mx-auto px-6 mb-16">
                {blogPosts.filter(p => p.featured).map(post => (
                    <motion.div 
                        key={post.id}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="group relative h-[500px] w-full rounded-[40px] overflow-hidden cursor-pointer shadow-2xl"
                    >
                        <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent"></div>
                        <div className="absolute bottom-0 p-8 md:p-12 text-white">
                            <span className="bg-[#7C3AED] px-4 py-1 rounded-full text-xs font-bold uppercase mb-4 inline-block">{post.category}</span>
                            <h2 className="text-3xl md:text-5xl font-black mb-4 max-w-2xl leading-tight">{post.title}</h2>
                            <p className="text-slate-300 max-w-xl mb-6 line-clamp-2">{post.excerpt}</p>
                            <div className="flex items-center gap-4 text-sm font-medium">
                                <span>{post.author}</span>
                                <span className="w-1.5 h-1.5 bg-white/30 rounded-full"></span>
                                <span>{post.date}</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </section>

            {/* --- Filter Bar --- */}
            <div className="max-w-7xl mx-auto px-6 mb-12 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex bg-white p-1.5 rounded-2xl shadow-sm border border-slate-100 overflow-x-auto max-w-full">
                    {categories.map(cat => (
                        <button 
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${activeCategory === cat ? 'bg-[#0F172A] text-white shadow-lg' : 'text-slate-500 hover:text-[#7C3AED]'}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
                <div className="relative w-full md:w-72">
                    <LuSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input type="text" placeholder="Search stories..." className="w-full pl-12 pr-4 py-3 rounded-2xl border-none bg-white shadow-sm focus:ring-2 focus:ring-[#7C3AED] outline-none" />
                </div>
            </div>

            {/* --- Blog Grid --- */}
            <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.filter(p => !p.featured).map((post, index) => (
                    <motion.article 
                        key={post.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white rounded-[32px] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all group flex flex-col h-full"
                    >
                        <div className="h-60 overflow-hidden relative">
                            <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            <div className="absolute top-4 left-4">
                                <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-bold uppercase text-[#0F172A]">{post.category}</span>
                            </div>
                        </div>
                        <div className="p-8 flex flex-col flex-grow">
                            <div className="flex items-center gap-3 text-slate-400 text-[10px] font-bold uppercase mb-3">
                                <span className="flex items-center gap-1"><LuClock className="w-3" /> {post.readTime}</span>
                                <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                                <span>{post.date}</span>
                            </div>
                            <h3 className="text-xl font-black text-[#0F172A] mb-4 group-hover:text-[#7C3AED] transition-colors leading-snug">
                                {post.title}
                            </h3>
                            <p className="text-slate-500 text-sm line-clamp-3 mb-6 flex-grow">
                                {post.excerpt}
                            </p>
                            <button className="flex items-center gap-2 text-[#0F172A] font-bold text-sm hover:gap-4 transition-all group/btn">
                                Read Story <LuChevronRight className="text-[#7C3AED] w-4 h-4" />
                            </button>
                        </div>
                    </motion.article>
                ))}
            </section>

            {/* --- Newsletter --- */}
            <section className="max-w-7xl mx-auto px-6 mt-20">
                <div className="bg-[#0F172A] rounded-[40px] p-12 text-center text-white relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-3xl font-bold mb-4 tracking-tight">Stay ahead of the <span className="text-[#7C3AED]">Game</span>.</h2>
                        <p className="text-slate-400 max-w-lg mx-auto mb-8">Get weekly insights into the toy market, parenting tips, and secret drops.</p>
                        <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                            <input type="email" placeholder="Your email address" className="flex-grow px-6 py-3.5 rounded-2xl bg-white/10 border border-white/10 text-white outline-none focus:bg-white/20 transition-all" />
                            <button className="bg-[#7C3AED] px-8 py-3.5 rounded-2xl font-bold hover:bg-purple-600 transition-all shadow-lg shadow-purple-500/20">Join</button>
                        </form>
                    </div>
                    {/* Background blob */}
                    <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#7C3AED] rounded-full blur-[100px] opacity-20"></div>
                </div>
            </section>

        </div>
    );
};

export default Blogs;
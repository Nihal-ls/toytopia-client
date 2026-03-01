import React from 'react';
import { FaTruck, FaShieldAlt, FaUndoAlt, FaSmile } from "react-icons/fa";
import { motion } from "framer-motion";

// Staggered entrance for the cards
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 }
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" }
    }
};

const WhyChooseUs = () => {
    const features = [
        {
            icon: <FaShieldAlt />,
            title: "Safe & Certified",
            desc: "Non-toxic, eco-friendly materials that exceed safety standards.",
            color: "text-violet-600",
            bg: "bg-violet-50"
        },
        {
            icon: <FaTruck />,
            title: "Global Shipping",
            desc: "Fast, trackable, and reliable delivery to your doorstep.",
            color: "text-blue-600",
            bg: "bg-blue-50"
        },
        {
            icon: <FaUndoAlt />,
            title: "Easy Returns",
            desc: "Not happy? Return it within 30 days—no questions asked.",
            color: "text-rose-600",
            bg: "bg-rose-50"
        },
        {
            icon: <FaSmile />,
            title: "Premium Quality",
            desc: "Durable toys designed to last through years of active play.",
            color: "text-amber-600",
            bg: "bg-amber-50"
        }
    ];

    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                
                {/* Header Section */}
                <div className="text-center mb-16">
                    <motion.span 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-violet-600 font-black uppercase tracking-[0.3em] text-xs"
                    >
                        The ToyTopia Advantage
                    </motion.span>
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-black text-slate-900 mt-4"
                    >
                        Why Parents <span className="text-violet-600">Trust Us</span>
                    </motion.h2>
                    <div className="w-12 h-1.5 bg-slate-200 mx-auto mt-6 rounded-full"></div>
                </div>

                {/* Cards Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {features.map((item, index) => (
                        <motion.div
                            key={index}
                            variants={cardVariants}
                            whileHover={{ y: -10 }}
                            className="relative group p-8 rounded-[2rem] bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-violet-500/5 transition-all duration-300"
                        >
                            {/* Decorative Background Icon */}
                            <div className={`absolute top-6 right-6 text-5xl opacity-5 group-hover:scale-110 transition-transform ${item.color}`}>
                                {item.icon}
                            </div>

                            {/* Main Icon */}
                            <div className={`w-14 h-14 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center text-2xl mb-6 shadow-inner`}>
                                {item.icon}
                            </div>

                            <h3 className="text-xl font-black text-slate-800 mb-3 tracking-tight">
                                {item.title}
                            </h3>
                            <p className="text-slate-500 text-sm leading-relaxed">
                                {item.desc}
                            </p>

                            {/* Bottom Accent Line */}
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-violet-600 rounded-full group-hover:w-1/3 transition-all duration-500"></div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Optional: Trust Bar */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-20 py-8 border-t border-slate-50 flex flex-wrap justify-center gap-8 md:gap-16 opacity-40 grayscale"
                >
                    {/* Add small partner/brand logos here if you have them */}
                    <span className="font-bold text-slate-400">SAFE KIDS CERTIFIED</span>
                    <span className="font-bold text-slate-400">GLOBAL TOY ASSOC.</span>
                    <span className="font-bold text-slate-400">ECO-FRIENDLY PACKAGING</span>
                </motion.div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
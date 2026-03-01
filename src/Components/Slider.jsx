import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { motion } from "framer-motion"; // Added Framer Motion
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Slider = () => {
    const featuredToys = [
        {
            id: 1,
            name: "Robo-Companion V2",
            price: "129.99",
            category: "Robotics",
            rating: 4.9,
            img: "https://images.unsplash.com/photo-1546776310-eef45dd6d63c?q=80&w=600&auto=format&fit=crop"
        },
        {
            id: 2,
            name: "Retro Wooden Train",
            price: "45.00",
            category: "Handcrafted",
            rating: 4.8,
            img: "https://images.unsplash.com/photo-1515488764276-beab7607c1e6?q=80&w=600&auto=format&fit=crop"
        },
        {
            id: 3,
            name: "Astro-Explorer Kit",
            price: "89.00",
            category: "STEM",
            rating: 5.0,
            img: "https://images.unsplash.com/photo-1618842676088-c4d48a6a7c9d?q=80&w=600&auto=format&fit=crop"
        },
        {
            id: 4,
            name: "Turbo Drift Racer",
            price: "59.99",
            category: "Vehicles",
            rating: 4.7,
            img: "https://images.unsplash.com/photo-1532330393533-443990a51d10?q=80&w=600&auto=format&fit=crop"
        },
        {
            id: 5,
            name: "Dream Dollhouse",
            price: "199.00",
            category: "Playsets",
            rating: 4.9,
            img: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=600&auto=format&fit=crop"
        }
    ];

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: { duration: 0.8, staggerChildren: 0.2 } 
        }
    };

    return (
        <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="w-full max-w-7xl mx-auto  px-6"
        >
            {/* Professional Header Section */}
            <div className="text-center mb-12">
                <motion.span 
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="bg-violet-100 text-violet-600 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-[0.2em]"
                >
                    Editor's Choice
                </motion.span>
                <motion.h2 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-4xl md:text-5xl font-black text-slate-900 mt-4 tracking-tight"
                >
                    Trending Toys
                </motion.h2>
                <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: 80 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="h-1.5 bg-violet-600 mx-auto mt-4 rounded-full"
                ></motion.div>
            </div>

            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                loop={true}
                pagination={{ clickable: true }}
                navigation={true}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                spaceBetween={30}
                breakpoints={{
                    640: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                    1280: { slidesPerView: 4 },
                }}
                className="premium-toy-swiper !pb-16"
            >
                {featuredToys.map((toy) => (
                    <SwiperSlide key={toy.id}>
                        <motion.div 
                            whileHover={{ y: -12 }} // Springy lift on hover
                            className="group bg-white border border-slate-100 rounded-[2.5rem] p-5 transition-all duration-500 hover:shadow-[0_22px_45px_rgba(124,58,237,0.12)] hover:border-violet-100"
                        >
                            
                            {/* Product Image Area */}
                            <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-slate-50 mb-6">
                                <motion.img 
                                    whileHover={{ scale: 1.15 }}
                                    transition={{ duration: 0.6 }}
                                    className="h-full w-full object-cover" 
                                    src={toy.img} 
                                    alt={toy.name}
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="bg-white/90 backdrop-blur-md text-slate-900 text-[10px] font-bold px-3 py-1 rounded-lg shadow-sm">
                                        {toy.category}
                                    </span>
                                </div>
                            </div>

                            {/* Info Area */}
                            <div className="px-2">
                                <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-violet-600 transition-colors">
                                    {toy.name}
                                </h3>
                                <div className="flex items-center justify-between mt-3">
                                    <span className="text-2xl font-black text-violet-600">
                                        ${toy.price}
                                    </span>
                                    <motion.div 
                                        whileHover={{ scale: 1.1 }}
                                        className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg"
                                    >
                                        <span className="text-amber-400">★</span>
                                        <span className="text-sm font-bold text-slate-600">{toy.rating}</span>
                                    </motion.div>
                                </div>
                                
                                <motion.button 
                                    whileTap={{ scale: 0.95 }}
                                    whileHover={{ backgroundColor: "#7c3aed" }} // Violet-600
                                    className="mt-6 w-full py-3.5 bg-slate-900 text-white rounded-2xl font-bold transition-colors duration-300 shadow-lg shadow-slate-200"
                                >
                                    Add to Cart
                                </motion.button>
                            </div>
                        </motion.div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Global Swiper Overrides */}
            <style jsx="true">{`
                .premium-toy-swiper .swiper-button-next, 
                .premium-toy-swiper .swiper-button-prev {
                    color: #1e293b;
                    background: white;
                    width: 50px;
                    height: 50px;
                    border-radius: 16px;
                    border: 1px solid #f1f5f9;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.08);
                    transition: all 0.3s ease;
                }
                .premium-toy-swiper .swiper-button-next:hover, 
                .premium-toy-swiper .swiper-button-prev:hover {
                    background: #7c3aed;
                    color: white;
                    border-color: #7c3aed;
                }
                .premium-toy-swiper .swiper-button-next:after, 
                .premium-toy-swiper .swiper-button-prev:after {
                    font-size: 16px;
                    font-weight: 900;
                }
                .premium-toy-swiper .swiper-pagination-bullet {
                    background: #cbd5e1;
                    opacity: 1;
                    transition: all 0.3s ease;
                }
                .premium-toy-swiper .swiper-pagination-bullet-active {
                    background: #7c3aed !important;
                    width: 30px;
                    border-radius: 10px;
                }
            `}</style>
        </motion.div>
    );
};

export default Slider;
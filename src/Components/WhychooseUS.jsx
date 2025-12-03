import React from 'react';
import { FaTruck, FaShieldAlt, FaUndoAlt, FaSmile } from "react-icons/fa";



import { motion } from "framer-motion";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut"
        }
    }
};

const textVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8 }
    }
};

const WhychooseUS = () => {

    return (
        <div className='max-w-7xl mx-auto'>
            <motion.h2
                variants={textVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-4xl font-bold text-center text-[#A0E7E5] mb-4"
            >
                Why Choose <span className="text-gray-800">ToyTopia?</span>
            </motion.h2>


            <motion.p
                variants={textVariants}
                initial="hidden"
                whileInView="visible"
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
                className="text-center  text-gray-700 max-w-2xl mx-auto mb-10"
            >
                We provide safe, fun, and high-quality toys that bring joy to every child.
            </motion.p>
            <section className="bg-[#A0E7E5] py-16 rounded-tr-4xl rounded-bl-4xl mb-10">
                <div className="max-w-7xl mx-auto px-6">

                    {/* Title */}



                    {/* Cards */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                    >

                        {/* Card 1 */}
                        <motion.div
                            variants={cardVariants}
                            whileHover={{ scale: 1.08, rotate: 1 }}
                            className="bg-white p-6 rounded-xl shadow-md"
                        >
                            <div className="text-4xl text-[#A0E7E5] mb-4">
                                <FaShieldAlt />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Safe & Certified</h3>
                            <p className="text-gray-600 text-sm">
                                All toys are made with child-safe and eco-friendly materials.
                            </p>
                        </motion.div>

                        {/* Card 2 */}
                        <motion.div
                            variants={cardVariants}
                            whileHover={{ scale: 1.08, rotate: -1 }}
                            className="bg-white p-6 rounded-xl shadow-md"
                        >
                            <div className="text-4xl text-[#A0E7E5] mb-4">
                                <FaTruck />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
                            <p className="text-gray-600 text-sm">
                                Quick and reliable shipping straight to your door.
                            </p>
                        </motion.div>

                        {/* Card 3 */}
                        <motion.div
                            variants={cardVariants}
                            whileHover={{ scale: 1.08, rotate: 1 }}
                            className="bg-white p-6 rounded-xl shadow-md"
                        >
                            <div className="text-4xl text-[#A0E7E5] mb-4">
                                <FaUndoAlt />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Easy Returns</h3>
                            <p className="text-gray-600 text-sm">
                                100% hassle-free return policy for your peace of mind.
                            </p>
                        </motion.div>

                        {/* Card 4 */}
                        <motion.div
                            variants={cardVariants}
                            whileHover={{ scale: 1.08, rotate: -1 }}
                            className="bg-white p-6 rounded-xl shadow-md"
                        >
                            <div className="text-4xl text-[#A0E7E5] mb-4">
                                <FaSmile />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Kids Love It</h3>
                            <p className="text-gray-600 text-sm">
                                Thousands of happy kids and parents trust ToyTopia.
                            </p>
                        </motion.div>

                    </motion.div>

                </div>
            </section>
        </div>
    );
};

export default WhychooseUS;
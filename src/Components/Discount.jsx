import React from 'react';
import { useLoaderData } from 'react-router';

const Discount = () => {
    const data = useLoaderData()

    const discountProducts = data.slice(10, 13)
    console.log(discountProducts)
    return (
        <div>
            <section className="bg-[#A0E7E5] py-10 px-5 md:px-20 rounded-2xl mb-10"  >
                <div className="max-w-6xl mx-auto text-center">
                    {/* Heading */}
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4">
                        🎉 Special Offers Just for You!
                    </h2>
                    <p className="text-gray-700 mb-10 text-lg">
                        Enjoy amazing discounts on your favorite toys — this week only!
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {discountProducts.map(toy => <div className="bg-white shadow-xl rounded-2xl p-6 hover:scale-105 transition-transform">
                            <img
                                src={toy.pictureURL}
                                alt="Building Blocks"
                                className="rounded-xl w-full h-38 object-cover mb-4"
                            />
                            <h3 className="text-xl font-bold text-gray-800">{toy.toyName}</h3>
                            <p className="text-gray-600 mt-2">Flat 20% OFF on all sets</p>
                            <button className="btn mt-3 bg-[#60ece8] text-white hover:scale-120 transition ease-in-out">View Details</button>
                        </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Discount;
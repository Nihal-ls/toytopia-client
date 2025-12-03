import React from 'react';
import bannerimg from '../assets/bannerImg.jpg'

const Banner = () => {
    return (
        <div>
            <section className=' mx-auto sm:w-4/4 md:max-w-7xl lg:max-w-7xl  '>
                <div
                    className="bg-no-repeat bg-cover mt-10  rounded-2xl "
                    style={{ backgroundImage: `url(${bannerimg})` }}
                >
                    <div className="bg-black/15 rounded-2xl">
                    <div className="hero-content text-neutral-content text-center">
                        <div className="max-w-md   flex justify-center flex-col">
                            <h1 className="mb-5 text-5xl font-bold">ToyTopia </h1>
                            <p className="mb-5 text-sm">
                                A vibrant and playful online marketplace for kids' toys, encouraging families to discover and support local toy sellers.. Users can log in, browse toys, view detailed info, and leave feedback or ratings for toys they want to buy for their kids.
                            </p>
                            <button className="btn border-0 w-40 mx-auto bg-[#60ece8] text-white hover:scale-120 transition ease-in-out">Get Started</button>
                        </div>
                    </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Banner;
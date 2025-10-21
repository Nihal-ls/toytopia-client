import React from 'react';
import Banner from '../Components/Banner';
import { useLoaderData } from 'react-router';
import Toycard from '../Components/Toycard';
import Slider from '../Components/Slider';
const Home = () => {
    const AllProducts = useLoaderData()
    console.log(AllProducts)
    const popularToys = AllProducts.slice(0, 6)
    console.log(popularToys)
    return (
        <div className='min-h-[82vh]'>
            
            <Banner />
            <Slider/>
        <h2 className='text-4xl text-center mt-10 font-bold text-[#60ece8]'>Popular Pproducts </h2>
            <div className="sm:w-80 md:w-230 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {
                popularToys.map(toy => <Toycard toy={toy}></Toycard>)
            }
            </div>
        </div>
    );
};

export default Home;
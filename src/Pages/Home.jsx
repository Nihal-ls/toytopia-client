import React from 'react';
import Banner from '../Components/Banner';
import { useLoaderData } from 'react-router';
import Toycard from '../Components/Toycard';
const Home = () => {
    const AllProducts = useLoaderData()
    console.log(AllProducts)
    const popularToys = AllProducts.slice(0, 6)
    console.log(popularToys)
    return (
        <div className='min-h-[82vh]'>
            <Banner />

            <div className="sm:w-80 md:w-230 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {
                popularToys.map(toy => <Toycard toy={toy}></Toycard>)
            }
            </div>
        </div>
    );
};

export default Home;
import Banner from '../Components/Banner';
import { useLoaderData } from 'react-router';
import Toycard from '../Components/Toycard';
import Slider from '../Components/Slider';
import { Authcontext } from '../Provider/AuthProvider';
import Discount from '../Components/Discount';
import { useEffect } from 'react';
import WhychooseUS from '../Components/WhychooseUS';
const Home = () => {
    const AllProducts = useLoaderData()
    console.log(AllProducts)
    const popularToys = AllProducts.slice(0, 8)
    console.log(popularToys)

    useEffect(() => {
        document.title = "Home - Toy Store";
    }, []);
    return (
        <div className=''>

            <Banner />
            <Slider />
            <WhychooseUS />


            <h2 className='text-4xl text-center mt-10 font-bold '>Popular Pproducts </h2>
            <div className="sm:w-80 md:w-230 lg:w-7xl   mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                {
                    popularToys.map(toy => <Toycard toy={toy}></Toycard>)
                }
            </div>
            <div className="container mx-auto mt-10 rounded-md">
                <Discount />
            </div>
        </div>
    );
};

export default Home;
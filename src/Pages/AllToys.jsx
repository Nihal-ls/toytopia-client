import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { useLoaderData } from 'react-router';
import Toycard from '../Components/Toycard';

const AllToys = () => {
  const data = useLoaderData()

    return (
        <div>
            <header>
                <Navbar/>
            </header>
            <main>
                <div className="grid grid-cols-1 my-10 md:grid-cols-2 lg:grid-cols-3">
                    {
                        data.map(toy=> <Toycard toy={toy}></Toycard>)
                    }
                </div>
            </main>

            <Footer/>
        </div>
    );
};

export default AllToys;
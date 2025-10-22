import React from 'react';
import Navbar from '../Components/Navbar';
import { useLoaderData } from 'react-router';

const Viewdetails = () => {
    const data = useLoaderData()
    console.log(data)
    return (
        <div>
            <Navbar/>

            
        </div>
    );
};

export default Viewdetails;
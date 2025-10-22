import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import { useLoaderData, useParams } from 'react-router';
import Footer from '../Components/Footer';
import bgimg from '../assets/page-bg.jpg'
const Viewdetails = () => {
    const data = useLoaderData()
    console.log(data)
    const { ToyId } = useParams()
    console.log(ToyId)
    const [toy, settoy] = useState([])
    useEffect(() => {

        const clickedToy = data.find(SingleToy => SingleToy.toyId == ToyId)

        settoy(clickedToy)
    }, [data, ToyId])
    console.log(toy)
    return (
        <div className='bg-cover bg-no-repeat'
            style={{ backgroundImage: `url(${bgimg})` }}
        >
            <Navbar />
            <div className="min-h-[90vh] ">
                <div className="card lg:card-side max-w-200 rounded-lg mt-10  bg-white/20 items-center shadow-sm  mx-auto">
                    <figure className='pl-8'>
                        <img
                            className='w-[250px] mx-auto rounded-lg'
                            src={toy.pictureURL}
                            alt="Album" />
                    </figure>
                    <div className="card-body max-w-120 ">
                        <h2 className="card-title text-2xl font-bold">{toy.toyName
                        }</h2>
                        <p className='text-gray-500'>{toy.description}</p>
                        <div className=" flex gap-20">
                            <div className="price">
                                <p className='font-bold'>${toy.price}</p>
                            </div>
                            <div className="rattings">
                                <p className='font-bold text-yellow-500'>{toy.rating}</p>
                            </div>
                        </div>
                        <div className=" flex gap-20">
                            <div className="price">
                                <p className='text-lg font-bold'>{toy.sellerName}</p>
                            </div>
                            <div className="rattings">
                                <p className='text-gray-500'>Email: {toy.sellerEmail}</p>
                            </div>

                        </div>
                        <span className='bg-blue-200 w-40 py-1 text-center font-bold rounded-lg '>{toy.subCategory}</span>
                        <div className="card-actions justify-end">
                        </div>
                    </div>
                </div>
                <form action="" className='max-w-200 mt-10 mb-10 rounded-2xl bg-white/30 mx-auto py-10 '>
                    <div className="flex flex-col">
                        <label htmlFor="" className='text-center my-2 font-semibold'>Your Name</label>
                        <input className='border-2 border-gray-200 w-80 mx-auto py-2 rounded-md pl-4' type="text" name="" placeholder='Your Name' id="" />
                    </div>
                    <div className="flex flex-col text-center">
                        <label htmlFor="" className='text-center my-2 font-semibold'>Your FeedBack</label>
                        <textarea name="" className='border-2 border-gray-200 w-80 mx-auto rounded-md pl-4' placeholder='Your Feedback' rows="6" cols="45" id=""></textarea>
                    </div>
                    <button type='submit' className='btn btn-primary flex w-80 mx-auto mt-6'>Try Now</button>
                </form>

            </div>
            <footer>
                <Footer />
            </footer>

        </div>
    );
};

export default Viewdetails;
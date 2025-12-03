import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import { useLoaderData, useParams } from 'react-router';
import Footer from '../Components/Footer';
import Swal from 'sweetalert2';
import { AiFillStar } from 'react-icons/ai';
const Viewdetails = () => {
    const data = useLoaderData()
    console.log(data);
       const [toy, settoy] = useState([])
    const { ToyId } = useParams()
    console.log(ToyId)
 
    useEffect(() => {

        const clickedToy = data.find(SingleToy => SingleToy._id == ToyId)
        settoy(clickedToy)
    }, [data, ToyId])
    console.log(toy)
    const handlefeedBackSubmit = (e) => {
        e.preventDefault()
        Swal.fire({
            icon: "Success",
            title: "Successful",
            text: "FeedBack Send Successfully",
            confirmButtonColor: "#3085d6",
        });
    }
    return (
        <div className='bg-cover bg-no-repeat'
        >
            <Navbar />
            <div className="min-h-[90vh] ">
                <div className="card lg:card-side max-w-200 rounded-lg mt-10   items-center shadow-sm  mx-auto">
                    <figure className='pl-8'>
                        <img
                            className='w-[250px] mx-auto rounded-lg'
                            src={toy.pictureURL}
                            alt="Album" />
                    </figure>
                    <div className="card-body max-w-120 ">
                        <h2 className="card-title text-2xl font-bold border-b-1 pb-2 border-gray-400 border-dashed">{toy.toyName}</h2>
                        <p className='text-gray-500 border-b-1 pb-2 border-gray-400 border-dashed'>{toy.description}</p>
                        <div className=" flex  gap-20 border-b-1 pb-2 border-gray-400 border-dashed">
                            <div className="price">
                                <p className='font-bold'>${toy.price}</p>
                            </div>
                            <div className="rattings">
                                <div className=" flex flex-row-reverse items-center gap-2">
                                 <div className="flex">
                                    <AiFillStar color='gold'/>
                                    <AiFillStar  color='gold'/>
                                    <AiFillStar  color='gold'/>
                                    <AiFillStar  color='gold'/>
                                 </div>
                                    <p className='font-bold text-yellow-500'>{toy.rating}</p>
                                </div>
                            </div>
                        </div>
                        <div className=" flex gap-20 items-center border-b-1 pb-2 border-gray-400 border-dashed">
                            <div className="price">
                                <p className='text-lg font-bold'>{toy.sellerName}</p>
                            </div>
                            <div className="rattings">
                                <p className='text-gray-800'><span className='text-black font-bold'>Email:</span> {toy.sellerEmail}</p>
                            </div>

                        </div>
                        <span className='bg-blue-200 w-40 py-1 text-center text-black font-bold rounded-lg '>{toy.subCategory}</span>
                        <div className="card-actions justify-end">
                        </div>
                    </div>
                </div>
                <h1 className='text-center text-4xl font-bold mt-10 text-blue-400'>Your FeedBack</h1>
                <form onSubmit={handlefeedBackSubmit} className='max-w-130 mt-10 mb-10 rounded-2xl shadow-lg mx-auto py-10 '>
                    <div className="flex flex-col">
                        <label htmlFor="" className='text-center my-2 font-semibold'>Your Name</label>
                        <input required className='border-2 border-gray-200 w-80 mx-auto py-2 rounded-md pl-4' type="text" name="" placeholder='Your Name' id="" />
                    </div>
                    <div className="flex flex-col text-center">
                        <label htmlFor="" className='text-center my-2 font-semibold'>Your FeedBack</label>
                        <textarea required name="" className='border-2 border-gray-200 w-80 mx-auto rounded-md pl-4' placeholder='Your Feedback' rows="6" cols="45" id=""></textarea>
                    </div>
                    <button type='submit' className='btn bg-blue-400 flex w-80 mx-auto mt-6'>Try Now</button>
                </form>
            </div>
            <footer>
                <Footer />
            </footer>

        </div>
    );
};

export default Viewdetails;
import React from 'react';
import { AiFillStar } from 'react-icons/ai';
import { Link } from 'react-router';

const Toycard = ({ toy }) => {
    const { pictureURL, toyName, price, rating, availableQuantity,toyId } = toy
    return (
        <div>
            <div className="card bg-base-100  mx-auto md:mx-auto w-70 mt-5  shadow-sm hover:scale-110 transition ease-in-out">
                <figure>
                    <img
                        className="w-full h-[300px] object-contain"
                        src={pictureURL}
                        alt="Toys" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title font-bold text-md">{toyName}</h2>
                    <div className="flex justify-between">
                        <div className="font-semibold">
                            <p>$ {price}</p>
                        </div>
                        <div className="font-semibold text-yellow-500">
                            <div className="flex items-center gap-1">
                                <div className="">
                                    <AiFillStar />
                                </div>
                                <div className="">
                                    <p className=''>{rating}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-actions justify-between items-center mt-3">
                        <div className="">
                            <p className='font-semibold'>{availableQuantity} Available</p>
                        </div>
                        <div className="">
                            <Link to={`/view-details/${toyId}`}  className="btn bg-[#60ece8] text-white hover:scale-120 transition ease-in-out">View Details</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Toycard;
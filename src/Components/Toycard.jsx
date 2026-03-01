import React from 'react';
import { AiFillStar } from 'react-icons/ai';
import { Link } from 'react-router';

const Toycard = ({ toy }) => {
    const {image, name, price, category,_id } = toy;

    return (
        <div className="group bg-white border border-slate-100 rounded-[2rem] p-5 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(124,58,237,0.1)] hover:-translate-y-2 h-full flex flex-col">
            
            {/* Image Stage: Clean, light background box */}
            <div className="relative bg-slate-50 rounded-[1.5rem] overflow-hidden flex items-center justify-center h-64 mb-6">
                <img 
                    className="h-full w-full object-contain p-8 group-hover:scale-110 transition-transform duration-500" 
                    src={image} 
                    alt={name}
                />
                
                {/* Minimalist Badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black text-slate-900 shadow-sm uppercase tracking-tighter">
                    {category || 'Premium'}
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-grow flex flex-col text-center">
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-violet-600 transition-colors line-clamp-1">
                    {name}
                </h3>
                
                <div className="flex items-center justify-center gap-3 mt-2 mb-4">
                    <span className="text-violet-600 font-black text-lg">
                        ${price}
                    </span>
                    <div className="h-1 w-1 bg-slate-300 rounded-full"></div>
                    <div className="flex items-center gap-1 text-slate-500 text-sm font-medium">
                        <AiFillStar className="text-amber-400" />
                        {/* <span>{rating}</span> */}
                    </div>
                </div>

                {/* Info Text */}
                {/* <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-6">
                    {availableQuantity} Units Available
                </p> */}
                
                {/* Action Button: Matches the Slider Button */}
                <Link 
                    to={`/view-details/${_id}`}
                    className="mt-auto w-full py-4 rounded-xl bg-slate-50 text-slate-900 font-bold group-hover:bg-violet-600 group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-violet-200"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
};

export default Toycard;
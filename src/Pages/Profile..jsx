import React, { use } from 'react';
import { Authcontext } from '../Provider/AuthProvider';
import Swal from 'sweetalert2';
import profileimg from '../assets/profile.webp';
import { motion } from 'framer-motion';

const Profile = () => {
    const { user, updateUser, setUser, loading } = use(Authcontext);

    const handleUpdateprofile = (e) => {
        e.preventDefault();
        const Name = e.target.name.value;
        const photo = e.target.photo.value;

        updateUser({ displayName: Name, photoURL: photo })
            .then(res => {
                Swal.fire({
                    icon: "success", // Fixed capitalization from "Success"
                    title: "Profile Updated",
                    text: "Your collector details have been saved!",
                    confirmButtonColor: "#7c3aed", // Matching violet theme
                });
                if (photo.length > 1) {
                    return setUser({ ...user, displayName: Name, photoURL: photo });
                }
                return setUser({ ...user, displayName: Name });
            })
            .catch(err => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                    confirmButtonColor: "#f43f5e",
                });
                console.log(err);
                setUser(user);
            });
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <span className="loading loading-dots loading-lg text-violet-600"></span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50/50 py-12 px-4 sm:px-6 lg:px-8">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl mx-auto"
            >
                {/* Header Section */}
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                        Account <span className="text-violet-600">Settings</span>
                    </h2>
                    <p className="text-slate-500 mt-2">Manage your ToyTopia collector profile</p>
                </div>

                <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/60 overflow-hidden border border-slate-100">
                    <div className="flex flex-col lg:flex-row">
                        
                        {/* Left Side: Avatar & Info */}
                        <div className="lg:w-1/3 bg-slate-900 p-10 flex flex-col items-center justify-center text-center">
                            <motion.div 
                                whileHover={{ scale: 1.05 }}
                                className="relative"
                            >
                                <img 
                                    className='w-40 h-40 rounded-full object-cover ring-4 ring-violet-500/30 border-4 border-slate-800 shadow-2xl' 
                                    src={user?.photoURL || profileimg}
                                    alt="Profile" 
                                />
                                <div className="absolute -bottom-2 right-2 bg-violet-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter shadow-lg">
                                    Collector
                                </div>
                            </motion.div>
                            
                            <h3 className="text-white font-bold text-xl mt-6 leading-tight">
                                {user?.displayName || "Toy Enthusiast"}
                            </h3>
                            <p className="text-slate-400 text-sm mt-1 mb-6">{user?.email}</p>
                            
                            <div className="w-full h-px bg-slate-800 my-4"></div>
                            <p className="text-[10px] text-slate-500 uppercase font-black tracking-[0.2em]">ToyTopia Member</p>
                        </div>

                        {/* Right Side: Update Form */}
                        <div className="lg:w-2/3 p-10 sm:p-14 bg-white">
                            <form onSubmit={handleUpdateprofile} className="space-y-6">
                                <div className="space-y-2">
                                    <label className='text-sm font-bold text-slate-700 ml-1'>Full Name</label>
                                    <input 
                                        name='name' 
                                        type="text" 
                                        defaultValue={user?.displayName}
                                        className='w-full px-5 py-4 rounded-2xl border border-slate-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all outline-none text-slate-900 font-medium' 
                                        placeholder='Update your name' 
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className='text-sm font-bold text-slate-700 ml-1'>Photo URL</label>
                                    <input 
                                        name='photo' 
                                        type="url" 
                                        defaultValue={user?.photoURL}
                                        className='w-full px-5 py-4 rounded-2xl border border-slate-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all outline-none text-slate-900 font-medium' 
                                        placeholder='Enter image URL' 
                                    />
                                </div>

                                <motion.button 
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.98 }}
                                    type='submit' 
                                    className="w-full py-4 bg-violet-600 hover:bg-violet-700 text-white rounded-2xl font-black shadow-lg shadow-violet-200 transition-all duration-300 mt-4 uppercase tracking-widest text-sm"
                                >
                                    Save Changes
                                </motion.button>
                            </form>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Profile;
import React, { use, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Authcontext } from '../Provider/AuthProvider';
import { GoogleAuthProvider } from 'firebase/auth';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion'; 
import googleImg from '../assets/icons8-google.svg';

const googleprovider = new GoogleAuthProvider();

const Register = () => {
    const { createUser, setUser, googleSignin, updateUser } = use(Authcontext);
    const [nameError, setNameerror] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Join ToyTopia | Registration";
    }, []);

    const validatePassword = (password) => {
        const checkuppercase = /[A-Z]/.test(password);
        const checkLowecase = /[a-z]/.test(password);
        const passlength = password.length >= 6;
        return checkuppercase && checkLowecase && passlength;
    };

    const handleRegister = (e) => {
        e.preventDefault();
        const Name = e.target.name.value;
        if (Name.length < 5) {
            setNameerror('Name must be 5+ characters');
            return;
        } else {
            setNameerror('');
        }
        
        const photo = e.target.photo.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        if (!validatePassword(password)) {
            Swal.fire({
                icon: "error",
                title: "Weak Password",
                text: "Requires 6+ chars, 1 uppercase, 1 lowercase.",
                confirmButtonColor: "#7C3AED",
            });
            return;
        }

        createUser(email, password)
            .then(result => {
                Swal.fire({
                    icon: "success",
                    title: "Welcome to ToyTopia!",
                    confirmButtonColor: "#7C3AED",
                });
                const user = result.user;
                updateUser({ displayName: Name, photoURL: photo })
                    .then(() => {
                        setUser({ ...user, displayName: Name, photoURL: photo });
                        navigate('/');
                    }).catch(err => {
                        console.log(err);
                        setUser(user);
                    });
            }).catch(err => console.log(err));
    };

    const hanldeGoogleSignIn = () => {
        googleSignin(googleprovider)
            .then(res => {
                setUser(res.user);
                navigate('/');
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4 md:p-10 font-sans">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-5xl bg-white rounded-[32px] md:rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-slate-100"
            >
                
                {/* --- LEFT VISUAL PANEL (Hidden on Mobile/Small Devices) --- */}
                <div className="hidden md:flex md:w-5/12 bg-[#0F172A] p-12 text-white flex-col justify-center relative overflow-hidden">
                    <div className="relative z-10">
                        <motion.span 
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            className="bg-[#7C3AED] text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full"
                        >
                            New Adventure
                        </motion.span>
                        <h2 className="text-4xl font-bold mt-6 leading-tight">
                            Where Every Toy <br/> Tells a <span className="text-[#7C3AED]">Story.</span>
                        </h2>
                    </div>

                    {/* Animated Floating Toy Image */}
                    <motion.div 
                        animate={{ y: [0, -15, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="mt-12 relative z-10"
                    >
                        <img 
                            src="https://images.unsplash.com/photo-1558060370-d644479cb6f7?auto=format&fit=crop&q=80&w=400" 
                            alt="Toy" 
                            className="rounded-3xl shadow-2xl border-4 border-white/10"
                        />
                    </motion.div>

                    {/* Glow effect */}
                    <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-[#7C3AED] rounded-full blur-[120px] opacity-20"></div>
                </div>

                {/* --- RIGHT FORM PANEL (Full width on Mobile) --- */}
                <div className="w-full md:w-7/12 p-8 md:p-16">
                    <div className="mb-8">
                        <h3 className="text-3xl font-black text-[#0F172A] tracking-tight">Create Account</h3>
                        <p className="text-slate-400 mt-2 text-sm">Join the ToyTopia family today!</p>
                    </div>

                    <form onSubmit={handleRegister} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Full Name</label>
                                <input required name="name" type="text" placeholder="Your Name" className="w-full bg-slate-50 border-2 border-transparent focus:border-[#7C3AED] focus:bg-white rounded-2xl px-5 py-3 outline-none transition-all" />
                                {nameError && <p className="text-red-500 text-[10px] mt-1">{nameError}</p>}
                            </div>
                            <div className="space-y-1">
                                <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Photo URL</label>
                                <input name="photo" type="text" placeholder="https://..." className="w-full bg-slate-50 border-2 border-transparent focus:border-[#7C3AED] focus:bg-white rounded-2xl px-5 py-3 outline-none transition-all" />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Email Address</label>
                            <input required name="email" type="email" placeholder="email@example.com" className="w-full bg-slate-50 border-2 border-transparent focus:border-[#7C3AED] focus:bg-white rounded-2xl px-5 py-3 outline-none transition-all" />
                        </div>

                        <div className="space-y-1">
                            <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Password</label>
                            <input required name="password" type="password" placeholder="••••••••" className="w-full bg-slate-50 border-2 border-transparent focus:border-[#7C3AED] focus:bg-white rounded-2xl px-5 py-3 outline-none transition-all" />
                        </div>

                        <motion.button 
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            className="w-full bg-[#0F172A] text-white font-bold py-4 rounded-2xl shadow-lg hover:bg-[#1e293b] transition-all mt-4"
                        >
                            Sign Up
                        </motion.button>
                    </form>

                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
                        <div className="relative flex justify-center text-[10px]"><span className="bg-white px-4 text-slate-400 font-bold uppercase tracking-widest">Or Register With</span></div>
                    </div>

                    <button 
                        onClick={hanldeGoogleSignIn} 
                        type="button"
                        className="w-full flex items-center justify-center gap-3 border-2 border-slate-100 py-3 rounded-2xl hover:bg-slate-50 hover:border-slate-200 transition-all"
                    >
                        <img className="w-5" src={googleImg} alt="Google" />
                        <span className="text-[#0F172A] font-bold text-sm">Google</span>
                    </button>

                    <p className="text-center mt-8 text-slate-400 text-sm">
                        Already have an account? 
                        <Link className="text-[#7C3AED] font-bold ml-2 hover:underline" to="/login">Login</Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;
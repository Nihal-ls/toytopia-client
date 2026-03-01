import React, { use, useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { Authcontext } from '../Provider/AuthProvider';
import { GoogleAuthProvider } from 'firebase/auth';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import googleimg from '../assets/icons8-google.svg';

const googleprovider = new GoogleAuthProvider();

const Login = () => {
    const { login, googleSignin, setUser, forgetpassword } = use(Authcontext);
    const [error, seterror] = useState("");
    const emailref = useRef();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Login | ToyTopia";
    }, []);

    const hanldeGoogleSignIn = () => {
        googleSignin(googleprovider)
            .then(res => {
                setUser(res.user);
                Swal.fire({
                    icon: "success",
                    title: "Welcome Back!",
                    text: "Login Successful With Google",
                    confirmButtonColor: "#7C3AED",
                });
                navigate(location.state ? location.state : '/');
            })
            .catch(err => console.log(err));
    };

    const handleLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        login(email, password)
            .then(res => {
                Swal.fire({
                    icon: "success",
                    title: "Successful",
                    text: "Welcome back to ToyTopia!",
                    confirmButtonColor: "#7C3AED",
                });
                navigate(location.state ? location.state : '/');
            })
            .catch(err => {
                seterror("Invalid email or password. Please try again.");
                console.log(err.code, err.message);
            });
    };

    const handleForgetPassword = () => {
        const email = emailref.current.value;
        if (!email) {
            Swal.fire({
                icon: "warning",
                title: "Wait!",
                text: "Please enter your email address first.",
                confirmButtonColor: "#7C3AED",
            });
            return;
        }
        forgetpassword(email)
            .then(() => {
                Swal.fire({
                    icon: "success",
                    title: "Verify",
                    text: "Password reset link sent! Please check your email.",
                    confirmButtonColor: "#7C3AED",
                });
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4 md:p-10 font-sans">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-5xl bg-white rounded-[32px] md:rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-slate-100"
            >
                
                {/* --- LEFT VISUAL PANEL (Hidden on Small Devices) --- */}
                <div className="hidden md:flex md:w-5/12 bg-[#0F172A] p-12 text-white flex-col justify-center relative overflow-hidden">
                    <div className="relative z-10 text-center md:text-left">
                        <motion.span 
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            className="bg-[#7C3AED] text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full"
                        >
                            Welcome Back
                        </motion.span>
                        <h2 className="text-4xl font-bold mt-6 leading-tight">
                            Ready for More <br/> <span className="text-[#7C3AED]">Adventures?</span>
                        </h2>
                        <p className="text-slate-400 mt-4 text-sm">
                            Log in to access your wishlist, orders, and exclusive toy drops.
                        </p>
                    </div>

                    {/* Animated Floating Asset */}
                    <motion.div 
                        animate={{ y: [0, -15, 0], rotate: [-2, 2, -2] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        className="mt-12 relative z-10 flex justify-center"
                    >
                        <img 
                            src="https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?auto=format&fit=crop&q=80&w=400" 
                            alt="Toy Action Figure" 
                            className="rounded-3xl shadow-2xl border-4 border-white/10"
                        />
                    </motion.div>

                    <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-[#7C3AED] rounded-full blur-[120px] opacity-20"></div>
                </div>

                {/* --- RIGHT FORM PANEL --- */}
                <div className="w-full md:w-7/12 p-8 md:p-16 flex flex-col justify-center">
                    <div className="mb-8">
                        <h3 className="text-3xl font-black text-[#0F172A] tracking-tight">Login</h3>
                        <p className="text-slate-400 mt-2 text-sm">Enter your credentials to access your account</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div className="space-y-1">
                            <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Email Address</label>
                            <input 
                                ref={emailref}
                                required 
                                name="email" 
                                type="email" 
                                placeholder="hello@toytopia.com" 
                                className="w-full bg-slate-50 border-2 border-transparent focus:border-[#7C3AED] focus:bg-white rounded-2xl px-5 py-3.5 outline-none transition-all" 
                            />
                        </div>

                        <div className="space-y-1">
                            <div className="flex justify-between items-center px-1">
                                <label className="text-[11px] font-bold text-slate-500 uppercase">Password</label>
                                <button 
                                    type="button"
                                    onClick={handleForgetPassword}
                                    className="text-[10px] font-bold text-[#7C3AED] hover:underline uppercase tracking-tighter"
                                >
                                    Forgot Password?
                                </button>
                            </div>
                            <input 
                                required 
                                name="password" 
                                type="password" 
                                placeholder="••••••••" 
                                className="w-full bg-slate-50 border-2 border-transparent focus:border-[#7C3AED] focus:bg-white rounded-2xl px-5 py-3.5 outline-none transition-all" 
                            />
                        </div>

                        {error && (
                            <motion.p 
                                initial={{ opacity: 0 }} 
                                animate={{ opacity: 1 }} 
                                className="text-red-500 text-xs font-medium ml-1"
                            >
                                {error}
                            </motion.p>
                        )}

                        <motion.button 
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            type="submit"
                            className="w-full bg-[#0F172A] text-white font-bold py-4 rounded-2xl shadow-xl shadow-blue-900/10 hover:bg-[#1e293b] transition-all mt-4"
                        >
                            Sign In
                        </motion.button>
                    </form>

                    <div className="relative my-10">
                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
                        <div className="relative flex justify-center text-[10px]"><span className="bg-white px-4 text-slate-400 font-bold uppercase tracking-widest">Or Secure Login With</span></div>
                    </div>

                    <button 
                        onClick={hanldeGoogleSignIn} 
                        type="button"
                        className="w-full flex items-center justify-center gap-3 border-2 border-slate-100 py-3.5 rounded-2xl hover:bg-slate-50 hover:border-slate-200 transition-all group"
                    >
                        <img className="w-5" src={googleimg} alt="Google" />
                        <span className="text-[#0F172A] font-bold text-sm">Continue with Google</span>
                    </button>

                    <p className="text-center mt-10 text-slate-400 text-sm">
                        New to ToyTopia? 
                        <Link className="text-[#7C3AED] font-bold ml-2 hover:underline" to="/register">Create Account</Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
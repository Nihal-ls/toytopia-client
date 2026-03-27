import React, { use } from 'react';
import { Authcontext } from '../Provider/AuthProvider';
import { Link, NavLink } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { path } from 'framer-motion/client';
import { MdManageAccounts } from 'react-icons/md';
import { IoMdExit } from 'react-icons/io';
import { BsCart4 } from 'react-icons/bs';

const Navbar = () => {
    const { user, logOut } = use(Authcontext);

    const handleLogout = () => {
        logOut()
            .then(() => alert('Logout successful'))
            .catch(err => alert('Error: ' + err.message));
    };

    const linkStyle = ({ isActive }) =>
        `relative px-1 py-2 text-sm font-medium transition-all duration-300 group ${isActive
            ? 'text-violet-600'
            : 'text-slate-500 hover:text-slate-900'
        }`;

    // Animation Variants
    const navVariants = {
        hidden: { y: -100 },
        visible: { y: 0, transition: { type: 'spring', stiffness: 50, damping: 15 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: { opacity: 1, y: 0 }
    };

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'All Toys', path: '/allToys' },
        { name: 'About us', path: '/Aboutus' },
        { name: 'Blogs', path: '/Blogs' },
        { name: 'Shipping Information', path: '/Shipping-info' },

    ];

    return (
        <motion.nav
            initial="hidden"
            animate="visible"
            variants={navVariants}
            className='bg-white/95 backdrop-blur-sm sticky top-0 z-50 border-b border-slate-200'
        >
            <div className="navbar max-w-7xl mx-auto px-4 lg:px-8 py-4">

                {/* Brand Section */}
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content bg-white rounded-box z-[1] mt-3 w-52 p-4 shadow-2xl border border-slate-100 gap-3">
                            {navLinks.map((link) => (
                                <li key={link.path}>
                                    <NavLink to={link.path}>{link.name}</NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link to="/" className="flex items-center gap-2">
                            <span className="text-2xl font-black text-slate-900 tracking-tight">
                                TOY<span className="text-violet-600 font-light">TOPIA</span>
                            </span>
                        </Link>
                    </motion.div>
                </div>

                {/* Desktop Navigation */}
                <div className="navbar-center hidden lg:flex">
                    <motion.ul
                        initial="hidden"
                        animate="visible"
                        transition={{ staggerChildren: 0.1 }}
                        className="flex items-center gap-8"
                    >
                        {navLinks.map((link) => (
                            <motion.li key={link.path} variants={itemVariants}>
                                <NavLink to={link.path} className={linkStyle}>
                                    {link.name}
                                    <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-violet-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                                </NavLink>
                            </motion.li>
                        ))}
                    </motion.ul>
                </div>

                {/* User Actions */}
                <div className="navbar-end gap-4">
                    <AnimatePresence mode="wait">
                        {user ? (
                            <motion.div
                                key="user-meta"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="flex items-center gap-4"
                            >
                                <div className="flex flex-col items-end hidden sm:flex">
                                    <span className="text-sm font-bold text-slate-900 leading-none">{user?.displayName}</span>
                                    <span className="text-[10px] text-violet-500 font-bold uppercase tracking-widest">Collector</span>
                                </div>

                                <div className="dropdown dropdown-end">
                                    <div tabIndex={0} role="button" className=" m-1"> <motion.img
                                        whileHover={{ rotate: 360 }}
                                        transition={{ duration: 0.5 }}
                                        className='w-10 h-10 rounded-full ring-2 ring-slate-100 hover:ring-violet-200 transition-all cursor-pointer'
                                        src={user?.photoURL}
                                        alt="User Profile"
                                    /></div>
                                    <ul tabIndex="-1" className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">

                                        <li>
                                            <Link to="/profile" className='text-lg font-bold'><MdManageAccounts size={24} />Profile</Link>


                                        </li>
                                        <li>
                                            <Link to="/dashboard" className='text-lg font-bold'><MdManageAccounts size={24} />Profile</Link>


                                        </li>
                                        <li>
                                            <button
                                                onClick={handleLogout}
                                                className="text-lg font-bold text-slate-400 hover:text-rose-500 transition-colors"
                                            >
                                               <IoMdExit size={24} /> Sign Out
                                            </button>
                                        </li>

                                    </ul>
                                </div>
                               <Link to="/My-cart"><BsCart4 size={28} /></Link>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="auth-btns"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex items-center gap-2"
                            >
                                <Link to='/login' className="px-5 py-2 text-sm font-bold text-slate-600 hover:text-slate-900 transition">
                                    Log in
                                </Link>
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Link
                                        to='/register'
                                        className="bg-slate-900 hover:bg-violet-600 text-white text-sm font-bold px-6 py-2.5 rounded-full transition-all duration-300 shadow-lg shadow-slate-200 block"
                                    >
                                        Get Started
                                    </Link>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;
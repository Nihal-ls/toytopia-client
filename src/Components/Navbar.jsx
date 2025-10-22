import React, { use } from 'react';
import { Authcontext } from '../Provider/AuthProvider';
import profileimg from "../assets/profile.webp"
import { Link } from 'react-router';
const Navbar = () => {
    const { user, logOut,loading } = use(Authcontext)
    console.log({user})
    const handleLogout = () => {
        console.log('logout')
        logOut()
            .then(res => {
                console.log(res)
                alert('logOut successful')
            })
            .catch(err => {
                alert('something went Wrong,please try again later', err.massage)
            })
    }
    if(loading){
        return <span className="loading loading-spinner text-info"></span>
    }
    return (
        <div className='bg-[#A0E7E5]'>
            <div className="navbar container mx-auto">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex="-1"
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li><a>Item 1</a></li>
                            <li>
                                <a>Parent</a>
                                <ul className="p-2">
                                    <li><a>Submenu 1</a></li>
                                    <li><a>Submenu 2</a></li>
                                </ul>
                            </li>
                            <li><a>Item 3</a></li>
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-2xl font-bold">TOYTOPIA</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li><a>Item 1</a></li>
                        <li>
                            <details>
                                <summary>Parent</summary>
                                <ul className="p-2">
                                    <li><a>Submenu 1</a></li>
                                    <li><a>Submenu 2</a></li>
                                </ul>
                            </details>
                        </li>
                        <li><a>Item 3</a></li>
                    </ul>
                </div>
                <div className="navbar-end items-center">
                   <img className='w-[40px] rounded-full mr-2 border-2 ' src={ user?.photoURL || profileimg }
                     title={user.displayName}
                   alt="" />

                    {
                        user ?
                            <a onClick={handleLogout} className="btn btn-primary hover:scale-120 transition ease-in-out" >Log Out</a>
                            : <Link to='/login' className="btn btn-primary hover:scale-120 transition ease-in-out" >Login</Link>

                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;
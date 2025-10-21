import React from 'react';
import bgimg from '../assets/page-bg.jpg'
import googleimg from '../assets/icons8-google.svg'
import { Link } from 'react-router';
const Login = () => {
    return (
        <div>
            <div className="hero min-h-screen bg-cover bg-no-repeat"
                style={{ backgroundImage: `url(${bgimg})` }}

            >
                <div className="hero-content bg-white/20 px-10 py-5 md:px-20 md:px-10 rounded-2xl flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold text-white"> Now!</h1>
                    </div>
                    <div className="card   w-full max-w-sm shrink-0 ">
                        <div className="card-body">
                            <fieldset className="fieldset  ">
                                <label className="label">Email</label>
                                <input type="email" className="input" placeholder="Email" />
                                <label className="label">Password</label>
                                <input type="password" className="input" placeholder="Password" />
                                <div><a className="link link-hover">Forgot password?</a></div>
                                <button className="btn bg-[#60ece8] text-white border-0 mt-2">Login</button>
                                <p className=''>Don't Have An Account? <Link className='text-blue-500' to='/register'>Register</Link></p>
                            </fieldset>
                            <button><img className='w-[30px] mx-auto bg-white rounded-full' src={googleimg} alt="" /></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
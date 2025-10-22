import React, { use } from 'react';
import bgimg from '../assets/page-bg.jpg'
import { Link } from 'react-router';
import googleImg from '../assets/icons8-google.svg'
import { Authcontext } from '../Provider/AuthProvider';
import { LuChevronsLeftRightEllipsis } from 'react-icons/lu';
import { GoogleAuthProvider } from 'firebase/auth';
const googleprovider = new GoogleAuthProvider()
const Register = () => {
    const { createUser, setUser, googleSignin } = use(Authcontext)
    const handleRegister = (e) => {
        e.preventDefault()
        const Name = e.target.name.value
        const photo = e.target.photo.value
        const email = e.target.email.value
        const password = e.target.password.value



        createUser(email, password)
            .then(result => {
                const user = result.user
                console.log(user)
                setUser(user)

            }).catch(err => console.log(err))



    }
    const hanldeGoogleSignIn = () => {
        googleSignin(googleprovider)
            .then(res => setUser(res.user)
            )
            .catch(err => console.log(err))
    }
    return (
        <div>
            <div className="hero min-h-screen bg-cover bg-no-repeat"
                style={{ backgroundImage: `url(${bgimg})` }}

            >

                <div className="hero-content bg-white/20 px-10 py-5 md:py-20 md:px-10 items-center rounded-2xl flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold text-white">Register Now!</h1>
                    </div>
                    <div className="card   w-full max-w-sm shrink-0 ">
                        <div className="card-body">
                            <form className="fieldset " onSubmit={handleRegister}>
                                {/* Name */}
                                <label className="label">Name</label>
                                <input name='name' type="text" className="input" placeholder="Name" />
                                {/* Photo URL */}
                                <label className="label">Photo URL</label>
                                <input name='photo' type="text" className="input" placeholder="Photo URL" />
                                {/* email */}
                                <label className="label">Email</label>
                                <input name='email' type="email" className="input" placeholder="Email" />
                                {/* password */}
                                <label className="label">Password</label>
                                <input name='password' type="password" className="input" placeholder="Password" />
                                <div><a className="link link-hover">Forgot password?</a></div>
                                <button className="btn bg-[#60ece8] text-white border-0 mt-2">Login</button>
                                <p typeof='submit' className=''>Already Have An Account? <Link className='text-blue-500' to='/login'>Login</Link></p>
                            </form>
                            <button onClick={hanldeGoogleSignIn}><img className='w-[40px] p-1 mx-auto bg-white rounded-full' src={googleImg} alt="" /></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
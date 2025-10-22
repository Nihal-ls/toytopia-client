import React, { use, useEffect, useState } from 'react';
import bgimg from '../assets/page-bg.jpg'
import googleimg from '../assets/icons8-google.svg'
import { Link, useLocation, useNavigate } from 'react-router';
import { Authcontext } from '../Provider/AuthProvider';
import { GoogleAuthProvider } from 'firebase/auth';
import Swal from 'sweetalert2';

const googleprovider = new GoogleAuthProvider()
const Login = () => {
    const { login, googleSignin, setUser } = use(Authcontext)

    const [error, seterror] = useState("")

    const location = useLocation()
    const navigate = useNavigate()
    console.log(location)

    useEffect(() => {
        document.title = "Login Page - ToyTopia";
    }, []);

    const hanldeGoogleSignIn = () => {
        googleSignin(googleprovider)
            .then(res => {
                setUser(res.user)

                Swal.fire({
                    icon: "Success",
                    title: "Successful",
                    text: "Login Successful With Google",
                    confirmButtonColor: "#3085d6",
                });
                navigate(`${location.state ? location.state : '/'}`)
            }
            )
            .catch(err => {
                console.log(err)


            })
    }

    const handleLogin = (e) => {
        e.preventDefault()

        const email = e.target.email.value
        const password = e.target.password.value
        login(email, password)
            .then(res => {
                console.log(res)
                Swal.fire({
                    icon: "Success",
                    title: "Successful",
                    text: "Login Successful",
                    confirmButtonColor: "#3085d6",
                });
                navigate(`${location.state ? location.state : '/'}`)
            })
            .catch(err => {
                console.log(err)
                const errorCode = err.code
                const erromessage = err.message
                seterror(errorCode, erromessage)
            })

    }
    return (
        <div>
            <div className="hero min-h-screen bg-cover bg-no-repeat"
                style={{ backgroundImage: `url(${bgimg})` }}

            >
                <div className="hero-content bg-white/20 px-10 py-5 md:px-20 md:px-10 rounded-2xl flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold text-white">Welcome Back!</h1>
                        <h1 className="text-4xl font-bold text-white">Login Now!</h1>
                    </div>
                    <div className="card   w-full max-w-sm shrink-0 ">
                        <div className="card-body">
                            <form className="fieldset" onSubmit={handleLogin}>
                                <label className="label">Email</label>
                                <input required name='email' type="email" className="input" placeholder="Email" />
                                <label className="label">Password</label>
                                <input required name='password' type="password" className="input" placeholder="Password" />
                                <div><a className="link link-hover">Forgot password?</a></div>
                                <button type='submit' className="btn bg-[#60ece8] text-white border-0 mt-2">Login</button>
                                <p className=''>Don't Have An Account? <Link className='text-blue-500' to='/register'>Register</Link></p>
                                {
                                    error && <p className='text-sm text-red-500'>{error}</p>
                                }
                            </form>
                            <button onClick={hanldeGoogleSignIn}><img className='w-[40px] p-1 mx-auto bg-white rounded-full' src={googleimg} alt="" /></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
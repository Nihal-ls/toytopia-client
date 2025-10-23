import React, { use, useEffect, useState } from 'react';
import bgimg from '../assets/page-bg.jpg'
import { Link, useNavigate } from 'react-router';
import googleImg from '../assets/icons8-google.svg'
import { Authcontext } from '../Provider/AuthProvider';
import { LuChevronsLeftRightEllipsis } from 'react-icons/lu';
import { GoogleAuthProvider } from 'firebase/auth';
import Swal from 'sweetalert2';
import { CiLineHeight } from 'react-icons/ci';
const googleprovider = new GoogleAuthProvider()
const Register = () => {
    const { createUser, setUser, googleSignin, updateUser} = use(Authcontext)

    const [nameError, setNameerror] = useState('')

    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Registration Page - ToyTopia";
    }, []);

    const validatePassword = (password) => {
        const checkuppercase = /[A-Z]/.test(password);
        const checkLowecase = /[a-z]/.test(password);
        const passlength = password.length >= 6;

        return checkuppercase && checkLowecase && passlength;
    };

    const handleRegister = (e) => {
        e.preventDefault()
        const Name = e.target.name.value
        if (Name.length < 5) {
            setNameerror('Name should be more then 5 character long')
            return
        }
        else {
            setNameerror('')
        }
        const photo = e.target.photo.value
        const email = e.target.email.value
        const password = e.target.password.value

        if (!validatePassword(password)) {
            Swal.fire({
                icon: "error",
                title: "Weak Password",
                text: "Password must contain at least one uppercase, one lowercase letter, and be at least 6 characters long.",
                confirmButtonColor: "#3085d6",
            });
            return;
        }

        createUser(email, password)
            .then(result => {
                Swal.fire({
                    icon: "Success",
                    title: "Successful",
                    text: "Registration Successful",
                    confirmButtonColor: "#3085d6",
                });
                const user = result.user
                console.log(user)
                updateUser({ displayName: Name, photoURL: photo })
                    .then(() => {
                        setUser({ ...user, displayName: Name, photoURL: photo })
                        navigate('/')
                    }).catch(err => {
                        alert('something went wrong')
                        console.log(err);
                        setUser(user)
                    })



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
            <div className="hero min-h-screen bg-cover bg-no-repeat overflow-hidden" 
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
                                <input required name='name' type="text" className="input" placeholder="Name" />
                                {nameError && <p className='text-red-500'>{nameError}</p>}
                                {/* Photo URL */}
                                <label className="label">Photo URL</label>
                                <input name='photo' type="text" className="input" placeholder="Photo URL" />
                                {/* email */}
                                <label className="label">Email</label>
                                <input required name='email' type="email" className="input" placeholder="Email" />
                                {/* password */}
                                <label className="label">Password</label>
                                <input required name='password' type="password" className="input" placeholder="Password" />
                                <button className="btn bg-[#60ece8] text-white border-0 w-80 mt-2">Login</button>
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
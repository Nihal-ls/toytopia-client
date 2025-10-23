import React, { use } from 'react';
import Navbar from '../Components/Navbar';
import { Authcontext } from '../Provider/AuthProvider';
import Swal from 'sweetalert2';
import Footer from '../Components/Footer';

const Profile = () => {
    const { user, updateUser, setUser,loading } = use(Authcontext)
    const handleUpdateprofile = (e) => {
        e.preventDefault()
        const Name = e.target.name.value
        const photo = e.target.photo.value
        updateUser({ displayName: Name, photoURL: photo })
            .then(res => {
                console.log(res)
                Swal.fire({
                    icon: "Success",
                    title: "Successful",
                    text: "Changed Successfully",
                    confirmButtonColor: "#3085d6",
                });
                if (photo.length > 1) {
                    return setUser({ ...user, displayName: Name, photoURL: photo })
                }
                return setUser({ ...user, displayName: Name, })
            })
            .catch(err => {
                alert('something went wrong')
                console.log(err);
                setUser(user)
            })
    if(loading){
        return
    }
    }
    return (

        <div>
            <Navbar />
            <div className="hero w-100 md:w-200 mx-auto   min-h-screen overflow-hidden">
                <div className="shadow-lg rounded-lg ">
                    <div className="hero-content py-10 flex-col  lg:flex-row">
                        {
                            user ?
                                <img className='w-60 rounded-full mr-2 border-2 ' src={user?.photoURL}
                                    title={user.displayName}
                                    alt="" /> : <img className='w-[40px] rounded-full mr-2 border-2 ' src={profileimg}
                                        alt="" />
                        }
                        <div>
                            <h1 className="text-5xl font-bold ">Display Name:{user.displayName}</h1>
                            <p className='text-sm mt-2'> <span className='font-bold'>Email:</span> {user.email}</p>

                            <form action="" onSubmit={handleUpdateprofile}>
                                <div className="flex flex-col">
                                    <label className='text-sm font-semibold' htmlFor="">Name</label>
                                    <input name='name' type="text" className='border w-80 pl-3 text-sm py-2' placeholder='Name' />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="" className='tes-sm text-sm font-semibold '>Photo URL</label>
                                    <input name='photo' type="url" className='border w-80 pl-3 text-sm py-2' id="" placeholder='Photo URL' /><br />
                                </div>
                                <button type='submit' className="btn bg-[#A0E7E5]  w-80">Change</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
};

export default Profile
import React from 'react';
import { Outlet } from 'react-router';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';

const HomeLayout = () => {
    return (
        <div>
            <header>
                 <Navbar/>
            </header>
            <main>
                <Outlet/>
            </main>
            <footer>
               <Footer/> 
            </footer>
        </div>
    );
};

export default HomeLayout;
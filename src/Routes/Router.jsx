import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layout/HomeLayout";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Viewdetails from "../Pages/Viewdetails";
import PrivateRoute from "../Provider/PrivateRoute";
import AllToys from "../Pages/AllToys";
import Profile from "../Pages/Profile.";
import ToyTopiaLoader from "../Components/ToyTopiaLoader";
import AboutUs from "../Pages/AboutUs";
import Blogs from "../Pages/Blogs";

const router = createBrowserRouter([{
    path: '/',
    element: <HomeLayout></HomeLayout>,
    hydrateFallbackElement: <ToyTopiaLoader />,
    children: [
        {
            index: true,
            Component: Home,
            loader: () => fetch('https://toytopia-backhand.vercel.app/toys'),
            hydrateFallbackElement: <ToyTopiaLoader />
        },
        {
            path: 'allToys',
            element: <AllToys />,
            loader: () => fetch('https://toytopia-backhand.vercel.app/toys'),
            hydrateFallbackElement: <ToyTopiaLoader />

        },
         {
            path: '/Aboutus',
            element: <AboutUs />,

        },
         {
            path: '/Blogs',
            element: <Blogs />,

        },

    ]
},
{
    path: '/login',
    Component: Login
},
{
    path: '/register',
    Component: Register
},
{
    path: 'view-details/:ToyId',
    element: <Viewdetails></Viewdetails>,
    loader: () => fetch(`https://toytopia-backhand.vercel.app/toys`),
    hydrateFallbackElement: <ToyTopiaLoader />,

},

{
    path: 'profile',
    element: <PrivateRoute>
        <Profile />
    </PrivateRoute>,

},

])
export default router
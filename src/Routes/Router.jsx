import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layout/HomeLayout";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Viewdetails from "../Pages/Viewdetails";
import PrivateRoute from "../Provider/PrivateRoute";
import AllToys from "../Pages/AllToys";
import Profile from "../Pages/Profile.";

const router = createBrowserRouter([{
    path: '/',
    element: <HomeLayout></HomeLayout>,
    children: [
        {
            index: true,
            Component: Home,
            loader: () => fetch('https://toytopia-backhand.vercel.app//toys'),
            hydrateFallbackElement: <div className="flex justify-center"><span className="loading loading-spinner text-info min-h-screen items-center w-20"></span></div>,
        },
        {
            path: 'allToys',
            element: <AllToys />,
            loader: () => fetch('https://toytopia-backhand.vercel.app//toys'),
            hydrateFallbackElement: <div className="flex justify-center"><span className="loading loading-spinner text-info min-h-screen items-center w-20"></span></div>,


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
    loader:  => fetch(`https://toytopia-backhand.vercel.app//toys`),
    hydrateFallbackElement: <div className="flex justify-center"><span className="loading loading-spinner text-info min-h-screen items-center w-20"></span></div>,


},

{
    path: 'profile',
    element: <PrivateRoute>
        <Profile />
    </PrivateRoute>,

},

])
export default router
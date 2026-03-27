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
import ShippingInfo from "../Pages/ShippingInfo";
import MyCart from "../Pages/Cart";
import Success from "../Pages/Sucess";
import MyOrders from "../Pages/Myorders";
import DashboardLayout from "../Layout/DashboardLayout.";

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
            path: '/success',
            element: <PrivateRoute>
                <Success />
            </PrivateRoute>,

        },
        {
            path: '/Blogs',
            element: <Blogs />,

        },
        {
            path: '/Shipping-info',
            element: <ShippingInfo />,

        },
        {
            path: '/My-cart',
            element: <PrivateRoute><MyCart /></PrivateRoute>,

        },
        {
            path: '/my-orders',
            element: <PrivateRoute><MyOrders /></PrivateRoute>,

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
{
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [{
        index: true,
        element: <PrivateRoute><MyOrders /></PrivateRoute>,


    }]
}
])
export default router
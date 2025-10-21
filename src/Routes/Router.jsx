import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layout/HomeLayout";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";

const router = createBrowserRouter([{
    path: '/',
    element: <HomeLayout></HomeLayout>,
    children: [
        {
            index: true,
            Component: Home,
            loader: () => fetch('../Toys.json')
        }


    ]
},
{
path:'/login',
Component: Login
},
{
path:'/register',
Component: Register
},

])
export default router
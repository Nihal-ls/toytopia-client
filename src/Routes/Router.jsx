import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layout/HomeLayout";
import Home from "../Pages/Home";

const router = createBrowserRouter([{
    path: '/',
    element: <HomeLayout></HomeLayout>,
    children: [{
        index: true,
        Component: Home
    }]
}])
export default router
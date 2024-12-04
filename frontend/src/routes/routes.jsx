import { useRoutes } from "react-router-dom";
import PrivateRoute from "../auth/PrivateRoute.jsx";
import Login from "../pages/authentication/Login.jsx";
import CustomerLayout from "../pages/customer/CustomerLayout.jsx";
import Signup from "../pages/authentication/Signup.jsx";
import AdminHome from "../pages/admin/AdminHome.jsx";
import RetailerLayout from "../pages/retailer/RetailerLayout.jsx";
import RetailerDashboard from "../pages/retailer/RetailerDashboard.jsx";
import Authorization from "../auth/Authorization.jsx";
import CustomerHome from "../pages/customer/CustomerHome.jsx";

const AppRoutes = () => {
    const routes = useRoutes([
        {
            path: "/login",
            element: <Login />,
        },
        {
            path: "/signup",
            element: <Signup />,
        },
        {
            path: "/",
            element: <PrivateRoute />,
            children: [
                {
                    index: true,
                    element: <Authorization />,
                },
                {
                    path: "customer",
                    element: <CustomerLayout />,
                    children: [
                        {
                            index: true,
                            element: <CustomerHome />,
                        },
                    ],
                },
                {
                    path: "retailer",
                    element: <RetailerLayout />,
                    children: [
                        {
                            index: true,
                            element: <RetailerDashboard />,
                        },
                    ],
                },
                {
                    path: "admin",
                    element: <AdminHome />,
                },
            ],
        },
    ]);

    return routes;
};

export default AppRoutes;
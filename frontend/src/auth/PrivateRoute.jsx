import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = () => {
 const { isAuthenticated } = useContext(AuthContext);
 return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;

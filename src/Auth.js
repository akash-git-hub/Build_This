import { Navigate, Outlet } from "react-router-dom"

const checkAuth = () => {
    const token = localStorage.getItem('Authorization');
    if (token) { return true; } else return false;
}

const Auth = () => {
    const isValid = checkAuth();
    return isValid ? <Outlet /> : <Navigate to="/" />
}
export default Auth
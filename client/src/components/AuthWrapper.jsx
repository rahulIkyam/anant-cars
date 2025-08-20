import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"

const AuthWrapper = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const userData = sessionStorage.getItem('userData');
        const authToken = sessionStorage.getItem('authToken');
        const isAuthenticated = !!userData && !!authToken;

        if(!isAuthenticated && location.pathname !== '/login') {
            navigate('/login', { replace: true });
        }
    }, [location.pathname, navigate]);

    return children;
};

export default AuthWrapper;
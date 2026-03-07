import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

function ProtectedRouter({ children }) {
    const location = useLocation();
    const token = localStorage.getItem('token');
    useEffect(() => {
        if (!token)
            toast.warning('Bạn cần đăng nhập để thao tác');
            
    }, [token]);
    if (!token) {
        return <Navigate to='/login' state={{ from: location }} replace />
        
    }
    else {
        return children;
    }
}

export default ProtectedRouter;    
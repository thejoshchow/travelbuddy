import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useGetAccountQuery } from "./authApi";

const RequireAuth = () => {
    const { data: account } = useGetAccountQuery()
    const location = useLocation()
    return (
        account?.access_token
            ? <Outlet />
            : <Navigate to='/login/' state={{ from: location }} replace />
    )
}

export default RequireAuth;
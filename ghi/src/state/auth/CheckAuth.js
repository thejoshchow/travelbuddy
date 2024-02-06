import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { useGetAccountQuery } from "../../services/authApi";
import { setToken, deleteToken } from "./authSlice";

const CheckAuth = () => {
    const { data: account, isLoading, isError } = useGetAccountQuery()
    const dispatch = useDispatch()
    if (!isLoading) {
        if (!isError) {
            dispatch(setToken(account?.access_token))
        } else {
            dispatch(deleteToken())
        }
    }
    return <Outlet />
}

export default CheckAuth;
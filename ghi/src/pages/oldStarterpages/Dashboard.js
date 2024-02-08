import { useLogoutMutation } from "../../services/authApi";
import { useDispatch, useSelector } from "react-redux";
import { deleteToken, selectToken } from "../../state/auth/authSlice";
import { Link, Outlet } from "react-router-dom";
import { useGetAllTripsQuery } from "../../services/tripsApi";



const Dashboard = () => {
    const [logout] = useLogoutMutation()
    const dispatch = useDispatch()
    const token = useSelector(selectToken)
    const { data } = useGetAllTripsQuery()
    const handleClick = async () => {
        logout()
        dispatch(deleteToken())
    }
    const showToken = () => console.log(token)
    return (
        <>
            <div>
            <Link to='/'>Home</Link>
            <h1>Dashboard</h1>
            <button onClick={handleClick}>Logout</button>
            <br />
                <button onClick={showToken}>Show token</button>
            </div>
            <div>
                <Outlet />
            </div>
        </>

    )
}

export default Dashboard;

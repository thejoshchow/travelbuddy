import { useLogoutMutation } from "../services/authApi";
import { useDispatch, useSelector } from "react-redux";
import { deleteToken, selectToken } from "../state/auth/authSlice";
import { Link } from "react-router-dom";


const Dashboard = () => {
    const [logout] = useLogoutMutation()
    const dispatch = useDispatch()
    const token = useSelector(selectToken)

    const handleClick = async () => {
        logout()
        dispatch(deleteToken())
    }
    const showToken = () => console.log(token)
    return (
        <>
            <Link to='/'>Home</Link>
            <h1>Dashboard</h1>
            <button onClick={handleClick}>Logout</button>
            <br/>
            <button onClick={showToken}>Show token</button>
        </>
    )
}

export default Dashboard;
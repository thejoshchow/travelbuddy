import { useNavigate } from "react-router-dom";
import { useGetAccountQuery } from "../features/auth/authApi";
import { Link } from "react-router-dom";

const Landing = () => {
    const navigate = useNavigate()
    const { data: token } = useGetAccountQuery()
    return (
        <>
            <Link to='/dashboard'>Dashboard</Link>
            <h1>hello, world</h1>
            <div>
                <p>You are {!token?.access_token? 'not': null} logged in</p>
                <button onClick={() => {navigate('/login')}}>Log in</button>
            </div>
        </>
    )
}

export default Landing;
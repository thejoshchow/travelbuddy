import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { useGetAccountQuery, useLogoutMutation } from "../features/auth/authApi";
import { deleteToken } from '../features/auth/authSlice';
import { useDeleteVoteMutation } from '../features/items/itemsApi';

import { useSelector, useDispatch } from 'react-redux';


const Dashboard = () => {
    const navigate = useNavigate()
    const token = useSelector((state) => state.auth.token)
    const dispatch = useDispatch()

    const [logout, {reset}] = useLogoutMutation()
    const { data: account } = useGetAccountQuery()

    const handleClick = async () => {
        logout()
        reset()
        dispatch(deleteToken())
        navigate('/')
    }

    const [deleteVote, data]  = useDeleteVoteMutation()
    const handleTest = async () => {
        deleteVote({ trip_id: 1, item_id: 1 })
        console.log(token)
        console.log(data)
    }
    return (
        <>
            <Link to='/'>Home</Link>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>username</th>
                            <th>user_id</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{account.account.username}</td>
                            <td>{account.account.user_id}</td>
                        </tr>
                    </tbody>
                </table>
                <button onClick={handleClick}>Log out</button>
            </div>
        </>
    )
}

export default Dashboard;
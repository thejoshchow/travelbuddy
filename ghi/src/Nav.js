import './styles/App.css';
import { NavLink, useLocation, Link } from 'react-router-dom';
import { useLogoutMutation } from './services/authApi';
import { useGetCurrentUserQuery } from './services/usersApi';

function Nav() {
   const location = useLocation();
   const { data: user } = useGetCurrentUserQuery()
   const [logout] = useLogoutMutation()

  if (location.pathname === '/login' || location.pathname === '/signup') {
    return null;
  }
  return (
    <nav className="main-navbar-tb navbar-expand-lg navbar-dark custom-navbar">
        <div className="nav-links">
          <Link to="#"><img src={require('./public/TB_transparent_logo_orange.png')} style={{width: '45px', height: '45px'}} alt='' disable /></Link>
          <div className='align-self-center'>
          <NavLink className="navbar-link" to="/dashboard">
            Dashboard
          </NavLink>
          <NavLink className="navbar-link" to="/history">
            Past Trips
          </NavLink>
          </div>
        </div>  
        <div className='nav-right align-self-center' >
            <li className='nav-item dropdown'>
                <button className='nav-link dropdown-toggle' data-bs-toggle="dropdown">Hello, {user?.first_name}</button>
                <ul className='dropdown-menu'>
                    <li><Link className="dropdown-item dropdown-link" to="user">Update user profile</Link></li>
                    <li><Link className='dropdown-item dropdown-link' to='account'>Update account settings</Link></li>
                    <li><Link className='dropdown-item dropdown-link' onClick={() => logout()} to='#'>Sign out</Link></li>
                </ul>
            </li>
        </div>
        
    </nav>

  );
}

export default Nav;





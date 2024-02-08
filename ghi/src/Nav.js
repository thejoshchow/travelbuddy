import './styles/App.css';
import { NavLink,useLocation} from 'react-router-dom';


function Nav() {
   const location = useLocation();

  if (location.pathname === '/login' || location.pathname === '/signup') {
    return null;
  }
  
  return (
    <nav className="main-navbar-tb navbar-expand-lg navbar-dark custom-navbar">
      <div className="navbar-tb">
     

        <div className="nav-links ml-auto">
          <NavLink className="navbar-link" to="/dashboard">
            Dashboard
          </NavLink>
          <NavLink className="navbar-link" to="/dashboard/past">
            Past Trips
          </NavLink>
          <NavLink className="navbar-link" to="signup">
            Signup
          </NavLink>
          <NavLink className="navbar-link" to="login">
            Login
          </NavLink>
        </div>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          </ul>
        </div>
      </div>
    </nav>

  );
}

export default Nav;





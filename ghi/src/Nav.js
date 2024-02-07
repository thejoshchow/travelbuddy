import './App.css';
import { NavLink } from 'react-router-dom';


function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark custom-navbar">
      <div className="container-fluid">
        <a className="logo" href="/">
          <img src="logo-transparent-png.png" alt="" width="60" height="48"/>
        </a>

        <div className="nav-links ml-auto">
          <NavLink className="navbar-link" to="/">
            Home
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





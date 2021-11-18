import React ,{useEffect} from 'react';
import './Navbar.css';
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom'
import { GiHamburgerMenu } from "react-icons/gi";

function NavBar() {
  let history = useHistory();
  const logout = () => {
    localStorage.removeItem('token');
    history.push("/login")
  }
  return (
    <nav className="navbar navbar-expand-lg  ">
      <div className="container-fluid">
        <Link className="navbar-brand krida" to="/">KR<span>1</span>DA</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="hamb"><GiHamburgerMenu /></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact Us</Link>
            </li>
            {localStorage.getItem('token') ?
              <li className="nav-item">
                <Link className="nav-link" to="/profile">Profile</Link>
              </li> : null}

            {!localStorage.getItem('token') ?

              <li className="nav-item log" >
                <Link className="nav-link  logout" style={{ marginRight: 5 + 'vw' }} to="/login">Login</Link>
                <Link className="nav-link  logout" to="/signup">SignUp</Link>
              </li>
              :
              <li className="nav-item ">
                <Link className="nav-link  logout" onClick={logout} to="/login">Logout</Link>
              </li>}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default NavBar

import "./styles/Navbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext.js";

function Navbar() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    setUser(null); 
    navigate("/register"); 
  };

  return (
    <nav className="navbar">
     
      <Link to="/" className="navbar-title">
        UNICORN - AI
      </Link>

      
      <div className="navbar-links">
        <Link to="/" className={location.pathname === "/" ? "active" : ""}>
          Home
        </Link>
        <Link
          to="/dashboard"
          className={location.pathname === "/dashboard" ? "active" : ""}
        >
          Dashboard
        </Link>

        {!user ? (
          <>
            <Link
              to="/login"
              className={location.pathname === "/login" ? "active" : ""}
            >
              Login
            </Link>
            <Link
              to="/register"
              className={location.pathname === "/register" ? "active" : ""}
            >
              Register
            </Link>
          </>
        ) : (
          <>
            
            <Link to="/dashboard" className="user-info">
              {user.profilePic ? (
                <img
                  src={user.profilePic}
                  alt="profile"
                  className="nav-profile-pic"
                />
              ) : (
                <span className="nav-profile-pic-placeholder">👤</span>
              )}
              <span className="nav-username">
                Hi{user.username ? `, ${user.username}` : ""}
              </span>
            </Link>

            
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

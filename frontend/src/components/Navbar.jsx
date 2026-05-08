import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";
import '../styles/Navbar.css'

export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar__brand">
        <span className="navbar__brand-y">Y</span> HackerNews
      </Link>

      <div className="navbar__links">
        {user ? (
          <>
            <span className="navbar__user">Hey, {user.name}</span>
            <Link to="/bookmarks" className="navbar__link">Bookmarks</Link>
            <button onClick={handleLogout} className="navbar__btn navbar__btn--logout">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="navbar__link">Login</Link>
            <Link to="/register" className="navbar__btn navbar__btn--register">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

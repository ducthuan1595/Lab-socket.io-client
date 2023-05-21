import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Context } from "../store/useContext";

const Navigation = () => {
  const { user, setUser } = useContext(Context);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
  }

  const handleHomePage = () => {
    navigate('/');
  }

  return (
    <main className="navigate">
      <div className="logo" onClick={handleHomePage}>MessageNode</div>
      <ul className="link">
        {user ? (
          <>
            <li>
              <div>{user.email}</div>
            </li>
            <li>
              <div style={{cursor: 'pointer'}} onClick={handleLogout}>Logout</div>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink
                to="/auth/login"
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active" : ""
                }
              >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/auth/signup"
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active" : ""
                }
              >
                Signup
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </main>
  );
};

export default Navigation;

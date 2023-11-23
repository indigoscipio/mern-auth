import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../slices/authSlice";
import { useLogoutMutation } from "../slices/usersApiSlice";

const Header = () => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  console.log(userInfo);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <nav className="header">
      {userInfo ? (
        <>
          <h2>Hello, {userInfo.username}!</h2>
          <Link onClick={handleLogout}>Log Out</Link>
        </>
      ) : (
        <>
          <Link to="/">
            <h1>LOGO</h1>
          </Link>
          <div className="header-links">
            <Link to="/signin">Sign In</Link>
            <Link to="/register">Sign Up</Link>
          </div>
        </>
      )}
    </nav>
  );
};

export default Header;

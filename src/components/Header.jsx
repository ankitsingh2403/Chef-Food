import { LOGO_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import { FaCartArrowDown, FaUserTie } from "react-icons/fa6";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import { useSelector } from "react-redux";

const Header = () => {
  // const [btnNameReact, setBtnNameReact] = useState("Login");
  const onlineStatus = useOnlineStatus();
  const cartItems = useSelector((store) => store.cart.items);

  return (
    <div className="header">
      <div className="logo-container">
        <img className="logo" src={LOGO_URL} alt="Chef Food Logo" />
      </div>
      <div className="nav-items">
        <ul>
          <li>Online Status: {onlineStatus ? "🟢" : "🔴"}</li>

          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/about">
            <li>About Us</li>
          </Link>
          <Link to="/contact">
            <li>Contact</li>
          </Link>
          <Link to="/cart">
            <li className="cart-icon">
              <FaCartArrowDown />
              <span className="cart-count">{cartItems.length}</span>
            </li>
          </Link>

          <Link
            to={
              localStorage.getItem("isLoggedIn") === "true"
                ? "/profile"
                : "/login"
            }
          >
            <FaUserTie className="profile-icon" />
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Header;

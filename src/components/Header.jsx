import { LOGO_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import { FaCartArrowDown } from "react-icons/fa6";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import { useSelector } from "react-redux";

const Header = () => {
  const [btnNameReact, setBtnNameReact] = useState("Login");
  const onlineStatus = useOnlineStatus();
  // if no dependancy array => useEffect is called on every Render
  //if dependancy array is there => useEffect is called at initial render(just Once)
  //if dependaancy array is [btnnamereact] => called everytime btnnameReact is updated
  useEffect(() => {}, []);

  const cartItems= useSelector(store => store.cart.items);
  console.log(cartItems);

  return (
    <div className="header">
      <div className="logo-container">
        <img className="logo" src={LOGO_URL} alt="" />
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
              <FaCartArrowDown/>
              <span className="cart-count">{cartItems.length}</span>
            </li>
          </Link>
          <Link to="/login">
          <button
            className="login-btn"
            onClick={() => {
              btnNameReact === "Login"
                ? setBtnNameReact("Logout")
                : setBtnNameReact("Login");
            }}
          >
            {btnNameReact}
          </button>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Header;

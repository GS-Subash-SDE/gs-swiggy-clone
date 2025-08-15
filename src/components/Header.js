import { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { LOGO_URL } from "../../utils/constants";
import useOnlineStatus from "../../utils/useOnlineStatus";
import UserContext from "../../utils/UserContext";
import { useSelector } from "react-redux";


const Header = () => {
  const [btnToggle, setBtnToggle] = useState(true);
  const onlineStatus = useOnlineStatus();
  const {loggedInUser} = useContext(UserContext);

  const itemsArray = useSelector((store) => store.cart.items);
  // console.log("header",itemsArray);
  
  
  
  return (
    <div className="flex sm:bg-blue-100 md:bg-green-100 lg:bg-pink-100  justify-between  shadow-lg px-2 sticky top-0 z-10">
      <div className="logoContainer">
        <img className="w-24" src={LOGO_URL} alt="" />
      </div>
      <div className="flex items-center">
        <ul className="flex items-center p-4 m-4">
          <li className="px-4">Online Status: {onlineStatus ? "✅" : "⛔"}</li>
          <li className="px-4">
            <Link to={"/"}>Home</Link>
          </li>
          <li className="px-4">
            <Link to={"/about"}>About Us</Link>
          </li>
          <li className="px-4">
            <Link to={"/contact"}>Contact Us</Link>
          </li>
          <li className="px-4 font-bold text-2xl">
            <Link to={"/cart"}>Cart ({itemsArray.length})</Link>
          </li>
          <li className="px-4">
            <Link to={"/grocery"}>Grocery</Link>
          </li>
          <button
            className="loginBtn w-20 hover:cursor-pointer hover:bg-blue-400 bg-blue-500 inline-block text-white  rounded-sm py-2"
            onClick={() => setBtnToggle((a) => !a)}
          >
            {btnToggle ? "Login" : "Logout"}
          </button>
          <li className="px-4">{loggedInUser}</li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
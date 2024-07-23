import React from "react";
import userProfile from "../public/userProfile.png";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector(item=>item.user)
  console.log(user)
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="absolute w-[100%] px-5 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
      <img
        className="w-40"
        src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
      />

    {
      user?(
        <div className="text-center">
        
        <p className="[line-height:.8] text-gray-600">
          <img className="w-12 m-auto" src={user.photoURL} /><br/>{user.displayName}</p>
        <button
          className="text-sm text-white font-bold"
          onClick={handleSignOut}
        >
          Sign Out
        </button>
      </div>
      ):(null)
    }
    </div>
  );
};

export default Header;

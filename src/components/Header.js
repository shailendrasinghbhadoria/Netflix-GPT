import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import {LOGO} from "../utils/constants"

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const user = useSelector(state=>state.user)
  
  useEffect(()=>{

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const {uid, email, displayName, photoURL} = user ;
        dispatch(addUser({uid, email, displayName, photoURL}))
        navigate("/browse")        

      } else {
        dispatch(removeUser())
        navigate("/")          
      }

      return ()=> unsubscribe();
    });

  },[])

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {

      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="absolute w-[100%] px-5 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
      <img
        className="w-40"
        src={LOGO}
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

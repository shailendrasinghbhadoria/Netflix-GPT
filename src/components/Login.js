import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth} from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import Google_icon from "../public/Google_Icon.png"
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);

  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch(addUser)
  const provider = new GoogleAuthProvider();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const handleGoogleSignIn =()=>{
      auth.languageCode = 'it';
      //auth.useDeviceLanguage();
      provider.setCustomParameters({
        'login_hint': 'netflix-gpt.com'
      });

      signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;       
        const user = result.user;
        updateProfile(auth.currentUser, {
          displayName: user.displayName, photoURL: "https://avatars.githubusercontent.com/u/82870578?v=4"
        }).then(() => {
          const {uid, email, displayName, photoURL} = auth.currentUser ;
          dispatch(addUser({uid, email, displayName, photoURL}))
        }).catch((error) => {
          console.log(error)
        })
        navigate("/browse");
        
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;        
        const email = error.customData.email;        
        const credential = GoogleAuthProvider.credentialFromError(error);        
        console.log(credential, errorCode, errorMessage, email)
      });

  }
  

  const handleButtonClick = (e) => {
    e.preventDefault();

    const err = checkValidData(email.current.value, password.current.value);
    setError(err);
    if (err) return;

    if (!isSignInForm) {
      //SignUp Logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode + "-" + errorMessage);
          navigate("/browse");
        });
    } else {
      //SignUp Logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode + "-" + errorMessage);
          navigate("/browse");
        });
    }
  };

  return (
    <>
      <Header />
      <div className="absolute max-w-full">
        <img src="https://assets.nflxext.com/ffe/siteui/vlv3/fc164b4b-f085-44ee-bb7f-ec7df8539eff/d23a1608-7d90-4da1-93d6-bae2fe60a69b/IN-en-20230814-popsignuptwoweeks-perspective_alpha_website_large.jpg" />
      </div>
      <div className="w-3/12 absolute p-10 bg-black mx-auto my-24 left-0 right-0 bg-opacity-80 max-w-full">
      <form >
        <h1 className="text-white text-3xl p-2 font-bold">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            type="text"
            placeholder="Name"
            ref={name}
            className="p-3 my-3 w-full rounded-md bg-gray-700 text-white"
            required={true}
          />
        )}
        <input
          type="text"
          placeholder="Email Address"
          ref={email}
          className="p-3 my-3 w-full rounded-md bg-gray-700 text-white"
          required={true}
        />
        <input
          type="password"
          placeholder="Password"
          ref={password}
          className="p-3 my-3 w-full rounded-md  bg-gray-700"
          required={true}
        />
        <p className="text-red-700 font-medium">{error ? error : ""}</p>
        <button
          className="w-full p-3 my-3 bg-[#e50914] rounded-md text-white"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>

        <p className="text-white">
          {isSignInForm ? "New to Netflix" : "Already a user"}?
          <span className="cursor-pointer font-bold" onClick={toggleSignInForm}>
            {isSignInForm ? " Sign Up" : " Sign In"} Now
          </span>
        </p>          
      </form>

      <p className="text-white text-center mt-4 pr-5">Or Sign In with Google</p>
     <img src={Google_icon} className="max-w-10 mx-auto cursor-pointer" onClick={handleGoogleSignIn}/>
    </div>
    </>
  );
};

export default Login;

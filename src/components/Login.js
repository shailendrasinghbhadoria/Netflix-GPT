import React, { useState } from 'react'
import Header from './Header'

const Login = () => {

    const [isSignInForm, setIsSignInForm] = useState(true)

    const toggleSignInForm =()=>{
        setIsSignInForm(!isSignInForm)
    }


  return (
    <div>
    <Header/>
    <div className='absolute'>
        <img src="https://assets.nflxext.com/ffe/siteui/vlv3/fc164b4b-f085-44ee-bb7f-ec7df8539eff/d23a1608-7d90-4da1-93d6-bae2fe60a69b/IN-en-20230814-popsignuptwoweeks-perspective_alpha_website_large.jpg"/>
    </div>
    <form className='w-3/12 absolute p-10 bg-black mx-auto my-24 left-0 right-0 bg-opacity-80'>
        <h1 className='text-white text-3xl p-2 font-bold'>{isSignInForm?"Sign In":"Sign Up"}</h1>
        {!isSignInForm &&<input type="text" placeholder='Name' className='p-3 my-3 w-full rounded-md bg-gray-700'/>}
        <input type="text" placeholder='Email Address' className='p-3 my-3 w-full rounded-md bg-gray-700'/>
        <input type="password" placeholder='Password' className='p-3 my-3 w-full rounded-md  bg-gray-700'/>
        <button className='w-full p-3 my-3 bg-[#e50914] rounded-md text-white'>{isSignInForm?"Sign In":"Sign Up"}</button>

        <p className='text-white'>
            {isSignInForm?"New to Netflix":"Already a user"}? 
            <span className='cursor-pointer font-bold' onClick={toggleSignInForm}>
                {isSignInForm?" Sign Up":" Sign In"} Now</span>
        </p>
    </form>
    </div>
  )
}

export default Login
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


function Auth() {
  const navigate = useNavigate();
  const [isSignIn, setIsSignIn] = useState(false);
  const [role, setRole]=useState("");
  function handleRegister(e) {
    e.preventDefault();
    navigate("/")
  }
  return (
    <div className='h-[88vh] w-[100vw] flex justify-center items-center authContainer'>
      {isSignIn ? <form className='signIn authCard w-[60%] h-[80%] rounded-2xl p-12 py-8' onSubmit={handleRegister}>
        <h2 className='text-4xl font-semibold mb-10 text-white'>Welcome back!<br />sign in to continue</h2>
        <div className='flex flex-col mb-5'>
          <label className='text-2xl mb-3 text-white'>Enter your registered GMail</label>
          <input className='px-5 py-3 rounded-xl outline-none border-gray-100 border-4' type='email' placeholder='Enter your registered GMail' required />
        </div>
        <div className='flex flex-col'>
          <label className='text-2xl mb-3 text-white'>Enter your Password</label>
          <input className='px-5 py-3 rounded-xl outline-none border-gray-100 border-4' type='password' placeholder='Enter your password' required />
        </div>
        <div className='w-[100%]'>
          <button className='w-15 bg-green-500 text-white px-5 py-3 rounded-lg mt-10 mx-auto block' type='submit'>Sign In</button>
        </div>
        <p className='text-blue-200 cursor-pointer w-max ml-auto' onClick={() => setIsSignIn(false)}>Click here to create a new account</p>
      </form> :
        <form className='signUp authCard flex flex-col gap-4 w-[60%] h-auto rounded-2xl px-12 py-8' onSubmit={handleRegister}>
          <h2 className='text-4xl font-semibold text-white'>Create a new Account to continue</h2>
          <div className='flex'>
            <div className="flex flex-col gap-4 w-1/2 px-5">
              <input className='px-3 py-1 rounded-md outline-none border-gray-100 border-2' type='email' placeholder='Enter your GMail' required />
              <input className='px-3 py-1 rounded-md outline-none border-gray-100 border-2' type='password' placeholder='Set your password' required />
              {role==="seller"&&<input className='px-3 py-1 rounded-md outline-none border-gray-100 border-2' type='text' placeholder='Enter your location' required />}
            </div>
            <div className='roleContainer flex items-center justify-around w-1/2 px-5'>
              <p className='text-2xl text-green-700'>Im a </p>
              <div className='flex gap-2' onClick={()=>setRole("buyer")}><input type='radio' name='role' id='buyer' className='text-xl'  required/><label htmlFor='buyer' className='text-xl text-green-700'>Buyer</label></div>
              <div className='flex gap-2' onClick={()=>setRole("seller")}><input type='radio' name='role' id='seller' className='text-xl' required /><label htmlFor='seller' className='text-xl text-green-700'>Seller</label></div>
            </div>
          </div>
          <div className='w-[100%]'>
            <button className='w-15 bg-green-500 text-white px-5 py-3 rounded-lg mx-auto block' type='submit'>Create Account</button>
          </div>
          <p className='text-blue-200 cursor-pointer w-max ml-auto' onClick={() => setIsSignIn(true)}>Already have an account? click here</p>
        </form>}
    </div>
  )
}

export default Auth

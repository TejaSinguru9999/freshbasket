import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../context/Contextapi';
function Auth() {
  const { setUser } = useContext(Context);
  const [isAuth, setIsAuth] = useState(false)
  const navigate = useNavigate();
  const [isSignIn, setIsSignIn] = useState(true);
  const [signIn, setSignIn] = useState({
    gmail: "",
    password: "",
  });
  const [newUser, setNewUser] = useState({
    gmail: "",
    password: "",
    doorNo: "",
    street: "",
    villageOrCity: "",
    district: "",
    state: "",
    pincode: "",
    role: ""
  })
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({
      ...prev, [name]: value,
    }));
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      setIsAuth(true)
      const response = await fetch("http://localhost:8080/api/v1/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signIn)
      })
      const jsonResponse = await response.json();
      if (!jsonResponse.success) {
        throw new Error(jsonResponse.message)
      }
      localStorage.setItem("user", JSON.stringify(jsonResponse.message))
      setUser(jsonResponse.message);
      navigate("/")
    } catch (error) {
      alert(error.message)
    } finally {
      setIsAuth(false)
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      setIsAuth(true)
      const response = await fetch("http://localhost:8080/api/v1/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser)
      })
      const jsonResponse = await response.json();
      if (!jsonResponse.success) {
        throw new Error(jsonResponse.message)
      }
      setUser(jsonResponse.message);
      navigate("/")
    } catch (error) {
      alert(error.message)
    } finally {
      setIsAuth(false)
    }
  }
  return (
    <div className='h-[88vh] w-[100vw] flex justify-center items-center authContainer'>
      {isSignIn ? <form className='authCard w-1/2 h-[75%] rounded-2xl p-12 py-8' onSubmit={handleSignIn}>
        <h2 className='text-4xl font-semibold mb-10 text-white'>Welcome back!<br />Login in to continue</h2>
        <div className='flex flex-col mb-5'>
          <label className='text-2xl mb-3 text-white'>Enter your registered GMail</label>
          <input className='px-5 py-3 rounded-xl outline-none border-gray-100 border-4' type='email' placeholder='Enter your registered GMail' required onChange={(e) => setSignIn(prev => ({ ...prev, gmail: e.target.value }))} />
        </div>
        <div className='flex flex-col'>
          <label className='text-2xl mb-3 text-white'>Enter your Password</label>
          <input className='px-5 py-3 rounded-xl outline-none border-gray-100 border-4' type='password' placeholder='Enter your password' required onChange={(e) => setSignIn(prev => ({ ...prev, password: e.target.value }))} />
        </div>
        <div className='w-[100%]'>
          <button disabled={isAuth} className='w-15 bg-green-500 text-white px-5 py-3 rounded-lg mt-10 mx-auto block' type='submit'>{isAuth ? "loading..." : "Log In"}</button>
        </div>
        <p className='text-blue-200 cursor-pointer w-max ml-auto' onClick={() => setIsSignIn(false)}>Click here to create a new account</p>
      </form> :
        <form className='authCard flex flex-col items-center gap-4 w-1/2 rounded-2xl py-8' onSubmit={handleRegister}>
          <h2 className='text-4xl font-semibold text-white'>Create a new Account to continue</h2>
          <div className="flex flex-col gap-4 w-3/4 px-5">
            <input className='px-3 py-1 rounded-md outline-none border-gray-100 border-2' name='gmail' onChange={handleChange} type='email' placeholder='Enter your GMail' required />
            <input className='px-3 py-1 rounded-md outline-none border-gray-100 border-2' name='password' onChange={handleChange} type='password' placeholder='Set your password' required />
            <select name='role' onChange={handleChange} required value={newUser.role||""} className='h-8 rounded-md px-3'>
              <option hidden value="">Choose your role</option>
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
              <option value="farmer">Farmer</option>
            </select>
            <input className='px-3 py-1 rounded-md outline-none border-gray-100 border-2' name='doorNo' onChange={handleChange} type='text' placeholder='Door no' required />
            <input className='px-3 py-1 rounded-md outline-none border-gray-100 border-2' name='street' onChange={handleChange} type='text' placeholder='Street name' required />
            <input className='px-3 py-1 rounded-md outline-none border-gray-100 border-2' name='villageOrCity' onChange={handleChange} type='text' placeholder='Village/City' required />
            <input className='px-3 py-1 rounded-md outline-none border-gray-100 border-2' name='district' onChange={handleChange} type='text' placeholder='District' required />
            <input className='px-3 py-1 rounded-md outline-none border-gray-100 border-2' name='state' onChange={handleChange} type='text' placeholder='State' required />
            <input className='px-3 py-1 rounded-md outline-none border-gray-100 border-2' name='pincode' onChange={handleChange} type='text' placeholder='Pincode' required />
          </div>
          <div className='w-[100%]'>
            <button disabled={isAuth} className='w-15 bg-green-500 text-white px-5 py-3 rounded-lg mx-auto block' type='submit'>{isAuth ? "loading..." : "Create Account"}</button>
          </div>
          <p className='text-blue-200 cursor-pointer w-max ml-auto mr-6' onClick={() => setIsSignIn(true)}>Already have an account? click here</p>
        </form>}
    </div>
  )
}

export default Auth

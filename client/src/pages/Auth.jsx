import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


function Auth() {
  const navigate = useNavigate();
  const [isSignIn, setIsSignIn] = useState(false);
  const [signIn, setSignIn]=useState({
    gmail:"",
    password:"",
  });
  const [newUser, setNewUser]=useState({
    gmail:"",
    password:"",
    doorNo:"",
    street:"",
    villageOrCity:"",
    district:"",
    state:"",
    pincode:"",
    role:""
  })
  const handleChange = (e) => {
    const { name, value } = e.target; 
    setNewUser((prev) => ({
      ...prev, [name]: value,
    }));
  };

  const handleSignIn=async(e)=>{
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/v1/users/login",{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify(signIn)
      })
      const jsonResponse = await response.json();
      if(!jsonResponse.success){
        throw new Error("Failed to login, try again")
      }
      navigate("/")
    } catch (error) {
      alert(error.message)
    }
  }

  const handleRegister=async(e)=>{
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/api/v1/users/register/${newUser.role}`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify(newUser)
      })
      const jsonResponse = await response.json();
      if(!jsonResponse.success){
        throw new Error(jsonResponse.message)
      }
      navigate("/")
    } catch (error) {
      alert(error.message)
    }
  }
  return (
    <div className='h-[88vh] w-[100vw] flex justify-center items-center authContainer'>
      {isSignIn ? <form className='signIn authCard w-[60%] h-[80%] rounded-2xl p-12 py-8' onSubmit={handleSignIn}>
        <h2 className='text-4xl font-semibold mb-10 text-white'>Welcome back!<br />Login in to continue</h2>
        <div className='flex flex-col mb-5'>
          <label className='text-2xl mb-3 text-white'>Enter your registered GMail</label>
          <input className='px-5 py-3 rounded-xl outline-none border-gray-100 border-4' type='email' placeholder='Enter your registered GMail' required onChange={(e)=>setSignIn(prev=>({...prev,gmail:e.target.value}))}/>
        </div>
        <div className='flex flex-col'>
          <label className='text-2xl mb-3 text-white'>Enter your Password</label>
          <input className='px-5 py-3 rounded-xl outline-none border-gray-100 border-4' type='password' placeholder='Enter your password' required onChange={(e)=>setSignIn(prev=>({...prev,password:e.target.value}))}/>
        </div>
        <div className='w-[100%]'>
          <button className='w-15 bg-green-500 text-white px-5 py-3 rounded-lg mt-10 mx-auto block' type='submit'>Log In</button>
        </div>
        <p className='text-blue-200 cursor-pointer w-max ml-auto' onClick={() => setIsSignIn(false)}>Click here to create a new account</p>
      </form> :
        <form className='signUp authCard flex flex-col gap-4 w-[60%] h-auto rounded-2xl px-12 py-8' onSubmit={handleRegister}>
          <h2 className='text-4xl font-semibold text-white'>Create a new Account to continue</h2>
          <div className='flex'>
            <div className="flex flex-col gap-4 w-1/2 px-5">
              <input className='px-3 py-1 rounded-md outline-none border-gray-100 border-2' name='gmail' onChange={handleChange} type='email' placeholder='Enter your GMail' required />
              <input className='px-3 py-1 rounded-md outline-none border-gray-100 border-2' name='password' onChange={handleChange} type='password' placeholder='Set your password' required />
              {newUser.role==="buyer"&&<input className='px-3 py-1 rounded-md outline-none border-gray-100 border-2' name='villageOrCity' onChange={handleChange} type='text' placeholder='Enter your village/city' required />}
              {(newUser.role === "seller" || newUser.role === "farmer") && <>
                <input className='px-3 py-1 rounded-md outline-none border-gray-100 border-2' name='doorNo' onChange={handleChange} type='text' placeholder='Door no' required />
                <input className='px-3 py-1 rounded-md outline-none border-gray-100 border-2' name='street' onChange={handleChange} type='text' placeholder='Street name' required />
                <input className='px-3 py-1 rounded-md outline-none border-gray-100 border-2' name='villageOrCity' onChange={handleChange} type='text' placeholder='Village/City' required />
                <input className='px-3 py-1 rounded-md outline-none border-gray-100 border-2' name='district' onChange={handleChange} type='text' placeholder='District' required />
                <input className='px-3 py-1 rounded-md outline-none border-gray-100 border-2' name='state' onChange={handleChange} type='text' placeholder='State' required />
                <input className='px-3 py-1 rounded-md outline-none border-gray-100 border-2' name='pincode' onChange={handleChange} type='text' placeholder='Pincode' required />
              </>}
            </div>
            <div className='roleContainer flex items-center justify-around w-1/2 px-5'>
              <p className='text-2xl text-green-700'>Im a </p>
              <div className='flex gap-2' onClick={()=>setNewUser(prev=>({...prev, role:"buyer"}))}><input type='radio' name='role' id='buyer' className='text-xl' required /><label htmlFor='buyer' className='text-xl text-green-700'>Buyer</label></div>
              <div className='flex gap-2' onClick={()=>setNewUser(prev=>({...prev, role:"seller"}))}><input type='radio' name='role' id='seller' className='text-xl' required /><label htmlFor='seller' className='text-xl text-green-700'>Seller</label></div>
              <div className='flex gap-2' onClick={()=>setNewUser(prev=>({...prev, role:"farmer"}))}><input type='radio' name='role' id='farmer' className='text-xl' required /><label htmlFor='farmer' className='text-xl text-green-700'>Farmer</label></div>
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

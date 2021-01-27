import React from 'react'
import LoginCard from '../components/LoginCard'



function Login() {

  
  return (
    <div className="relative w-full h-screen overflow-hidden flex justify-center items-center select-none">
      <img
        src="/images/bg.jpeg"
        className="w-full h-full absolute inset-0 object-cover"
        alt="login_bg"
      />
      <button className="w-full h-full inset-0 absolute bg-gray-800 opacity-50 z-10"></button>
      <LoginCard />
    </div>
  )
}

export default Login

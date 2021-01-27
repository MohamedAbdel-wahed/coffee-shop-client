import React from 'react'


function NotFound() {
  if(!localStorage.getItem('token')) window.location.href="/login"


  return (
    <div className="py-32 text-center text-4xl font-bold text-gray-500">
     404 Page Not Found!
    </div>
  )
}

export default NotFound

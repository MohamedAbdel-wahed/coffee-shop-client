import React,{useState} from 'react'
import Cart from '../components/orders/Cart'
import TableProducts from '../components/orders/TableProducts'


function AddOrder({match}) {
  if(!localStorage.getItem('token')) window.location.href="/login"
  
  const [cartOrders,setCartOrders]= useState([])
 
  return (
    <div className="w-full h-screen flex space-x-5 pt-24 bg-gray-800 overflow-hidden">
      <div className="w-5/12 p-4 border border-gray-700">
        <Cart cartOrders={cartOrders} setCartOrders={setCartOrders} tableNumber={match.params.code}/>
      </div>
      <div className="w-7/12 p-4 border border-gray-700">
        <TableProducts setCartOrders={setCartOrders} />
      </div>
    </div>
  )
}

export default AddOrder

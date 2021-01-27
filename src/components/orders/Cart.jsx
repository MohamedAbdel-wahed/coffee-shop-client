import React,{Fragment, useEffect, useState} from 'react'
import {withRouter} from 'react-router-dom'
import { useTranslation } from "react-i18next"
import {gql,useLazyQuery,useMutation} from '@apollo/client'
import CartProduct from './CartProduct'
import OrderBillModal from '../bills/OrderBillModal'
import NoItemsFound from "../NoItemsFound"


const GET_CART_ITEMS = gql`
  query cartItems($table: Int!) {
    cartItems(table: $table) { 
      id table product count description price
    }
  }
`
const ADD_ORDER = gql`
  mutation addOrder($table: Int!) {
    addOrder(table: $table)
  }
`

function Cart({history,cartOrders,setCartOrders,tableNumber}) {
  if(!localStorage.getItem('token')) window.location.href="/login"
  
  const { t } = useTranslation()

  const [orderBillModal,setOrderBillModal]= useState(false)

  const [getCartItems] = useLazyQuery(GET_CART_ITEMS, {
    fetchPolicy: "no-cache",
    variables: {table: parseInt(tableNumber) || ''},
    onCompleted: (data) => setCartOrders(data.cartItems)
  })

  useEffect(()=>{
      getCartItems()
  },[getCartItems])

  const [addOrder,{loading}] = useMutation(ADD_ORDER, {
    onCompleted: () => history.push("/orders")
  })

  const submitOrder= ()=> addOrder({variables: {table: parseInt(tableNumber) || ''}})

  return (
    <div className="w-full h-full">
      <h1 className="mx-2 py-3 text-gray-300 font-semibold text-2xl uppercase">
        Table &nbsp;{tableNumber + " "}&nbsp;Order
      </h1>
      <hr className="mx-2 border-b border-gray-700" />
      <div className="w-full h-96 my-3 flex flex-col overflow-scroll overflow-x-hidden">
        {!cartOrders.length ? (<NoItemsFound name={t('orders.noCartOrders')} />) : cartOrders.map((order) => (
          <Fragment key={order.id}>
            <CartProduct
              cartOrders={cartOrders}
              setCartOrders={setCartOrders}
              orderDesc={order.description}
              uuid={order.product}
              count={order.count}
              img="http://www.dar-elweb.com/demos/zarest/files/products/1edf7ab30f3069cd7d448e3bd78db98b_thumb.jpg"
            />
            <hr className="border border-gray-700 opacity-40 px-10" />
          </Fragment>
        ))}
      </div>

      <div className="w-full my-3 flex justify-center items-center space-x-6">
        <button
          onClick={submitOrder}
          disabled={cartOrders.length ? false : true}
          className="w-5/12 px-5 py-2 rounded-lg focus:outline-none focus:opacity-50 bg-yellow-500 text-gray-800 text-sm font-semibold capitalize"
        >
          {t(`${loading ? "loading" : "orders.addOrderBtn"}`)}
        </button>
        <button
          onClick={() => setOrderBillModal(true)}
          className="w-5/12 px-5 py-2 rounded-lg focus:outline-none focus:opacity-50 bg-blue-600 text-white text-sm font-semibold capitalize"
        >
          {t("orders.getBillBtn")}
        </button>
      </div>
      {orderBillModal && (
        <OrderBillModal
          setModal={setOrderBillModal}
          tableNumber={tableNumber}
          cartOrders={cartOrders}
        />
      )}
    </div>
  )
}

export default withRouter(Cart)

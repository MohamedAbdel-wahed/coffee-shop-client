import React,{useState,useEffect} from 'react'
import {withRouter} from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {FaMoneyBillWave,FaCartPlus} from 'react-icons/fa'
import {motion} from 'framer-motion'
import {gql,useLazyQuery} from '@apollo/client'
import PaymentBillModal from '../bills/PaymentBillModal'


const GET_ORDERS= gql`
  query orders($table:Int!){
      orders(table:$table){
        id product count price
      }
    }
`

function OrderRow({history,table,tables,setTables}) {
  if(!localStorage.getItem('token')) window.location.href="/login"

  const { t } = useTranslation()

  const [orders,setOrders]= useState([])
  const [totalPrice,setTotalPrice]= useState(0)

  const [paymentBillModal,setPaymentBillModal]= useState(false)

  const [getOrder,{loading}]= useLazyQuery(GET_ORDERS,{
    fetchPolicy: 'no-cache',
    variables: {table},
    onCompleted: (data)=> {
      if(data){
        setOrders(data.orders)
        const prices = data.orders.map(({ price, count }) =>
          parseFloat((price * count))
        )
        setTotalPrice(prices.reduce((acc,curr)=> (acc + curr) ,0).toFixed(1))
      }
    }
  })

  useEffect(()=>{
    getOrder()
  },[getOrder])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex justify-around border-b border-gray-300"
    >
      <span className="text-sm font-semibold p-3 w-3/12 flex justify-center items-center text-gray-600 border-r break-words">
        {table}
      </span>
      <span className="text-sm font-semibold py-3 w-4/12 flex justify-center items-center text-gray-600 border-r">
        {loading ? 'loading...' : totalPrice}
      </span>
      <span className="p-3 w-5/12 flex justify-center items-center space-x-6 text-gray-800">
        <button
          onClick={() => history.push(`/add-order/${table}`)}
          className="p-1.5 bg-blue-300 text-blue-600 focus:outline-none bg-opacity-60 focus:bg-opacity-100 rounded-full"
          title={t("orders.table.actions.addBtn")}
        >
          <FaCartPlus size="1.3em" />
        </button>

        <button
          onClick={() => setPaymentBillModal(true)}
          className="p-1.5 bg-green-300 text-green-600 focus:outline-none bg-opacity-60 focus:bg-opacity-100 rounded-full"
          title={t("orders.table.actions.payBtn")}
        >
          <FaMoneyBillWave size="1.3em" />
        </button>
      </span>
      {paymentBillModal && (
        <PaymentBillModal
          setModal={setPaymentBillModal}
          table={table}
          totalPrice={totalPrice}
          orders={orders}
          tables={tables}
          setTables={setTables}
        />
      )}
    </motion.div>
  )
}

export default withRouter(OrderRow)

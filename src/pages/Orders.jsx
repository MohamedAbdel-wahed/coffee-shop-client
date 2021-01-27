import React,{useState} from 'react'
import { useTranslation } from 'react-i18next'
import {gql,useQuery} from '@apollo/client'
import OrderRow from '../components/orders/OrderRow'
import NoItemsFound from '../components/NoItemsFound'


const GET_ORDERED_TABLES = gql`
  query orderedTables {
    orderedTables {
      table
    }
  }
`

function Orders() {
  if(!localStorage.getItem('token')) window.location.href="/login"

  const { t } = useTranslation()

  const [orderedTables,setOrderedTables]= useState([])
  const [searchTerm,setSearchTerm]= useState("")

  const {loading}= useQuery(GET_ORDERED_TABLES, {
      fetchPolicy: "no-cache",
      onCompleted: (data)=> {
       if(data){
          let arr= []
          data.orderedTables.forEach(({ table }) => {
            if (arr.indexOf(table) === -1) {
              arr.push(table)
            }
            setOrderedTables(arr)
          })
       }
     }
  })


  return (
    <div className="relative w-full h-screen pt-16 pb-3 px-8 bg-gray-100 flex flex-col items-center overflow-hidden select-none">
      <div className="pt-10 pb-4 w-full flex">
        <input
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-1/2 px-4 py-2 text-gray-700 text-sm border border-gray-300 focus:outline-none focus:border-blue-300 rounded-md placeholder-gray-500 placeholder-opacity-50"
          placeholder={t("orders.searchPlaceholder")}
        />
      </div>
      <div className="w-full flex border-b-2 border-gray-300 bg-gray-300 text-gray-800 font-bold shadow-md rounded-tr-md rounded-tl-md">
        <span className="py-3 w-3/12 text-center border-r">
          {t("orders.table.code")}
        </span>
        <span className="py-3 w-4/12 text-center border-r">
          {t("orders.table.totalPrice")}
        </span>
        <span className="py-3 w-5/12 text-center">
          {t("orders.table.actions.title")}
        </span>
      </div>
      <div className="w-full h-full pb-1 border flex flex-col border-gray-300 bg-white rounded-br-md rounded-bl-md shadow-md overflow-x-hidden overflow-scroll">
        {loading ? (
          <div className="my-28 text-gray-500 font-bold text-3xl text-center">
            {t("loading")}
          </div>
        ) : orderedTables.length ? (
          orderedTables
            .filter((table) =>
              searchTerm !== "" ? table === parseInt(searchTerm) || "" : table
            )
            .map((table, index) => <OrderRow key={index} table={table} tables={orderedTables} setTables={setOrderedTables} />)
        ) : (
          <NoItemsFound name={t("orders.noOrders")} />
        )}
      </div>
    </div>
  )
}

export default Orders

import React,{useState} from 'react'
import ModalTemplate from '../ModalTemplate'
import { useTranslation } from "react-i18next"
import {gql,useMutation} from '@apollo/client'


const ADD_ORDER_OPTIONS= gql`
    mutation addOptions($table:Int! $product:String! $description:String){
      addOptions(table:$table product:$product description:$description)
    }
`

function OptionsModal({setModal,table,uuid,orderDesc,cartOrders,setCartOrders}) {
  const { t } = useTranslation()

  const [description,setDescription]= useState(null)

  const [addOptions,{loading}]= useMutation(ADD_ORDER_OPTIONS,{
    onCompleted: ()=> {
      const newCartOrders= [...cartOrders]
      newCartOrders.find(order=> order.product===uuid).description= description
      setCartOrders(newCartOrders)
      setModal(false)
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    addOptions({variables: {table, product:uuid, description}})
  }

  return (
    <ModalTemplate setModal={setModal} title={t("orders.optionsModal.title")}>
      <form onSubmit={handleSubmit}>
        <div className="my-3">
          <textarea
            rows="3"
            className="w-full px-4 py-2 text-gray-700 text-sm border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-300"
            placeholder={t("orders.optionsModal.descriptionPlaceholder")}
            defaultValue={orderDesc}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <button className="w-full mb-3 py-2.5 px-4 text-sm text-white bg-red-500 rounded-full focus:outline-none uppercase focus:bg-opacity-80 tracking-wide">
          {t(`${loading ? "loading" : "orders.optionsModal.addBtn"}`)}
        </button>
      </form>
    </ModalTemplate>
  )
}

export default OptionsModal

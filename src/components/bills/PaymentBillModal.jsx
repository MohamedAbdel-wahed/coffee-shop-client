import React from 'react'
import { useTranslation } from "react-i18next"
import ModalTemplate from '../ModalTemplate'
import PaymentBillRow from './PaymentBillRow'
import {gql,useMutation} from '@apollo/client'


const PAY_ORDER= gql`
    mutation payOrder($table:Int!){
      payOrder(table:$table)
    }
`

function PaymentBillModal({setModal,table,orders,totalPrice,tables,setTables}) {
  const { t } = useTranslation()

  const [payOrder]= useMutation(PAY_ORDER)

  const payAndPrintBill= ()=> {
    payOrder({variables: {table}})
    window.print()
    setTables(tables.filter(item=> item!==table))
    setModal(false)
  }

  return (
    <ModalTemplate
      setModal={setModal}
      title={`${t("orders.paymentBill.title")} ${table}`}
    >
      <div className="mt-7 w-full h-80 relative select-none overflow-hidden">
        <table className="w-full table-auto text-gray-800">
          <thead>
            <tr className="h-10 text-sm border-b border-gray-900 border-opacity-50">
              <th className="w-4/12">
                {t("orders.paymentBill.header.product")}
              </th>
              <th className="w-2/12">{t("orders.paymentBill.header.price")}</th>
              <th className="w-3/12">
                {t("orders.paymentBill.header.amount")}
              </th>
              <th className="w-3/12">
                {t("orders.paymentBill.header.subTotal")}
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <PaymentBillRow key={order.id} order={order} />
            ))}
          </tbody>
        </table>
      </div>
      <hr className="border-b border-gray-400 opacity-50" />
      <div className="py-2 flex justify-between px-8">
        <span className="font-bold text-gray-800">{t('orders.paymentBill.totalPrice')}</span>
        <p className="flex items-center space-x-1">
          <span className="text-gray-600 font-semibold">{t('orders.paymentBill.currency')}</span>
          <span className="font-bold text-gray-800">{totalPrice}</span>
        </p>
      </div>
      <div id="no-print" className="w-full flex mt-6 mb-4">
        <button
          onClick={payAndPrintBill}
          className="px-6 py-2 bg-blue-500 text-white focus:outline-none rounded-lg focus:bg-opacity-70 font-semibold tracking-wide z-10"
        >
          {t('orders.paymentBill.payBtn')}
        </button>
      </div>
    </ModalTemplate>
  )
}

export default PaymentBillModal

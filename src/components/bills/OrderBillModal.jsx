import React from 'react'
import { useTranslation } from "react-i18next"
import ModalTemplate from '../ModalTemplate'
import OrderBillRow from './OrderBillRow'


function OrderBillModal({setModal,tableNumber,cartOrders}) {
  const { t } = useTranslation()

  const printOrderBill= ()=> {
    window.print()
    setModal(false)
  }

  return (
    <ModalTemplate
      setModal={setModal}
      title={`${t("orders.billModal.title")} ${tableNumber}`}
    >
      <div className="mt-6 w-96 h-80 relative select-none overflow-hidden">
        <table className="w-full table-auto text-gray-800">
          <thead>
            <tr className="text-left h-10 text-sm border-b border-gray-900 border-opacity-50">
              <th className="w-4/12 px-1">{t('orders.billModal.header.product')}</th>
              <th className="w-3/12 px-1">{t('orders.billModal.header.amount')}</th>
              <th className="w-5/12 px-1">{t('orders.billModal.header.description')}</th>
            </tr>
          </thead>
          <tbody>
            {cartOrders.map(({ id, product, count, description }) => (
              <OrderBillRow key={id} uuid={product} count={count} description={description} />
            ))}
          </tbody>
        </table>
      </div>
      <div id="no-print" className="w-full flex mt-6 mb-4">
        <button
          onClick={printOrderBill}
          className="px-6 py-2 bg-blue-500 text-white focus:outline-none rounded-lg focus:bg-opacity-70 font-semibold tracking-wide z-10"
        >
          {t('orders.billModal.printBtn')}
        </button>
      </div>
    </ModalTemplate>
  )
}

export default OrderBillModal

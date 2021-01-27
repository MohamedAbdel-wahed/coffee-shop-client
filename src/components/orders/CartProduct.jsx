import React,{useState,useEffect} from "react"
import {withRouter} from "react-router-dom"
import {gql,useLazyQuery,useMutation} from '@apollo/client'
import { useTranslation } from "react-i18next"
import {Image} from 'cloudinary-react'
import OptionsModal from './OptionsModal'


const GET_PRODUCT= gql`
   query product($uuid:String!) {
     product(uuid:$uuid){
      image name price 
     }
   }
`
const HANDLE_COUNT = gql`
  mutation handleCount($table: Int!, $product: String!, $count: Int!) {
    handleCount(table: $table, product: $product, count: $count) {
      id table product count description price
    }
  }
`

function CartProduct({match,uuid,count,orderDesc,setCartOrders,cartOrders}) {
  if (!localStorage.getItem("token")) window.location.href = "/login"

  const { t } = useTranslation()

  const [product, setProduct] = useState({})
  const [optionsModal, setOptionsModal] = useState(false)

  const [getSelectedProduct, { loading }] = useLazyQuery(GET_PRODUCT, {
    fetchPolicy: "no-cache",
    variables: { uuid },
    onCompleted: (data) => data && setProduct(data.product),
  })

  const [handleCount] = useMutation(HANDLE_COUNT, {
    errorPolicy: 'ignore',
    onCompleted: (data) => data && setCartOrders(data.handleCount),
  })

  const manageCount = (val) => {
    const table= parseInt(match.params.code) || ''
    handleCount({variables: {table, product:uuid, count:val}})
  }

  useEffect(() => {
    getSelectedProduct()
    return ()=> window.removeEventListener('click',handleCount)
  }, [getSelectedProduct,handleCount])

    return (
      <div className="my-4 flex justify-between space-x-3 select-none">
        <div className="flex space-x-2 flex-1">
          {loading ? (
            <img
              src="/images/loading-spinner.gif"
              className="h-24 rounded-sm object-cover"
              width="100px"
              alt="loading_spinner"
            />
          ) : !product.image ? (
            <img
              src="/images/default.png"
              className="h-24 rounded-sm object-cover"
              width="100px"
              alt="default"
            />
          ) : (
            <Image
              cloudName="cafe-shop"
              publicId={product.image}
              width="100"
              height="90"
              crop="scale"
            />
          )}

          <div className="flex flex-col justify-between text-white">
            <h1 className="text-lg font-bold">{product.name}</h1>
            {!loading && (
              <p className="text-base">
                <span className="font-bold">{product.price + " "}</span>
                <span className="text-gray-300 font-semibold">EGP</span>
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <div className="ml-auto mr-5">
            <button
              onClick={() => setOptionsModal(true)}
              className="px-2 py-1 bg-indigo-500 text-xs text-white tracking-wide font-bold focus:outline-none focus:bg-opacity-60 rounded-lg"
            >
              {t('orders.optionsBtn')}
            </button>
          </div>
          {optionsModal && (
            <OptionsModal
              cartOrders={cartOrders}
              setCartOrders={setCartOrders}
              orderDesc={orderDesc}
              setModal={setOptionsModal}
              table={parseInt(match.params.code) || ""}
              uuid={uuid}
            />
          )}
          <div className=" flex items-center justify-end pr-5 space-x-3">
            <button
              onClick={() => manageCount(count - 1)}
              className="px-2.5 py-.5 bg-red-500 focus:outline-none focus:bg-opacity-50 text-xl text-white font-extrabold rounded-lg"
            >
              -
            </button>
            <span className="inline-block py-1 px-2.5 text-gray-800 font-bold text-sm bg-gray-100 rounded-sm">
              {count}
            </span>
            <button
              onClick={() => manageCount(count + 1)}
              className="px-2 py-.5 bg-green-500 focus:outline-none focus:bg-opacity-50 text-xl text-white font-extrabold rounded-lg"
            >
              +
            </button>
          </div>
        </div>
      </div>
    )
}

export default withRouter(CartProduct)

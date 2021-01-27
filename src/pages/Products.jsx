import React,{useState,useContext} from 'react'
import { useTranslation } from 'react-i18next';
import AddProductModal from '../components/products/AddProductModal';
import ProductRow from '../components/products/ProductRow';
import {gql,useQuery} from '@apollo/client'
import NoItemsFound from '../components/NoItemsFound';
import {AuthContext} from '../contexts/AuthContext'
import {CREDENTIALS} from '../env'


const GET_PRODUCTS = gql`
  query products {
    products {
      uuid category name description price
    }
  }
`

function Products() {
  if(!localStorage.getItem('token')) window.location.href="/login"

  const { t } = useTranslation()

  const { authState }= useContext(AuthContext)
  const {user} = authState

  const [products,setProducts]= useState([])
  const [searchTerm,setSearchTerm]= useState("")
  const [addProductModal,setAddProductModal]= useState(false)

  const {loading}= useQuery(GET_PRODUCTS, {
      fetchPolicy: "no-cache",
      onCompleted: (data)=> data && setProducts(data.products)
  })

  return (
    <div className="relative w-full h-screen pt-16 pb-3 px-8 bg-gray-100 flex flex-col items-center overflow-hidden select-none">
      <div className="w-full flex justify-between pt-10 pb-4 space-x-72">
        <input
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-5/12 px-4 py-2 text-gray-700 text-sm border border-gray-300 focus:outline-none focus:border-blue-300 rounded-md placeholder-gray-500 placeholder-opacity-50"
          placeholder={t("products.searchPlaceholder")}
        />
        {user && user.verified === CREDENTIALS.username && (
          <button
            onClick={() => setAddProductModal(true)}
            className="px-4 py-2 text-sm font-bold capitalize text-white bg-green-500 focus:outline-none focus:bg-opacity-70 rounded-lg"
          >
            {t("products.addBtn")}
          </button>
        )}
      </div>
      {user && user.verified === CREDENTIALS.username && addProductModal && (
        <AddProductModal
          setModal={setAddProductModal}
          products={products}
          setProducts={setProducts}
        />
      )}
      <div className="w-full flex border-b-2 border-gray-300 bg-gray-300 text-gray-800 font-bold shadow-md rounded-tr-md rounded-tl-md">
        <span className="py-3 w-2/12 text-center border-r">
          {t("products.table.category")}
        </span>
        <span className="py-3 w-2/12 text-center border-r">
          {t("products.table.name")}
        </span>
        <span className="py-3 w-4/12 text-center border-r">
          {t("products.table.description")}
        </span>
        <span className="py-3 flex-1 text-center border-r">
          {t("products.table.price")}
        </span>
        {user && user.verified === CREDENTIALS.username && (
          <span className="py-3 w-2/12 text-center">
            {t("products.table.actions")}
          </span>
        )}
      </div>
      <div className="w-full h-full pb-1 border flex flex-col border-gray-300 bg-white rounded-br-md rounded-bl-md shadow-md overflow-x-hidden overflow-scroll">
        {loading ? (
          <div className="my-28 text-gray-500 font-bold text-3xl text-center">
            {t("loading")}
          </div>
        ) : products && products.length ? (
          products
            .filter((product) =>
              searchTerm !== ""
                ? product.name.toLowerCase().match(searchTerm.toLowerCase())
                : product
            )
            .map((product) => (
              <ProductRow
                key={product.uuid}
                product={product}
                products={products}
                setProducts={setProducts}
              />
            ))
        ) : (
          <NoItemsFound name={t("products.noProducts")} />
        )}
      </div>
    </div>
  )
}

export default Products

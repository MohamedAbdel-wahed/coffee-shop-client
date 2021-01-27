import React,{useState} from 'react'
import { useTranslation } from 'react-i18next'
import {gql,useQuery} from '@apollo/client'
import {motion} from 'framer-motion'
import ProductsTabs from './ProductsTabs'
import ProductItem from './ProductItem'
import NoItemsFound from '../NoItemsFound'


const GET_PRODUCTS = gql`
  query products {
    products {
      uuid
      category
      name
    }
  }
`

function TableProducts({ setCartOrders }) {
  const { t } = useTranslation()

  const [activeTab, setActiveTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [products, setProducts] = useState([])

  const { loading } = useQuery(GET_PRODUCTS, {
    fetchPolicy: "no-cache",
    onCompleted: (data) => setProducts(data.products),
  })
  
   
  return (
    <div>
      <ProductsTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        products={products}
      />
      <div className="w-full my-3">
        <input
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 text-gray-400 text-sm font-semibold tracking-wide bg-gray-800 border border-gray-600 focus:outline-none focus:border-blue-900 rounded-md placeholder-gray-500 placeholder-opacity-40"
          placeholder={t("products.searchPlaceholder")}
        />
        <motion.div
          layout
          className="py-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1 overflow-scroll overflow-x-hidden"
          style={{ height: "57.4vh" }}
        >
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
              .filter((product) =>
                activeTab !== "all"
                  ? product.category.toLowerCase().match(activeTab.toLowerCase())
                  : product
              )
              .map((product) => (
                <ProductItem
                  setCartOrders={setCartOrders}
                  key={product.uuid}
                  img="http://www.dar-elweb.com/demos/zarest/files/products/1edf7ab30f3069cd7d448e3bd78db98b_thumb.jpg"
                  uuid={product.uuid}
                />
              ))
          ) : (
            <NoItemsFound name={t("products.noProducts")} />
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default TableProducts

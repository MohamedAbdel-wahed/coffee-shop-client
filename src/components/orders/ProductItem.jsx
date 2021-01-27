import React,{useState,useEffect} from 'react'
import {withRouter} from 'react-router-dom'
import {gql,useMutation,useLazyQuery} from '@apollo/client'
import {Image} from 'cloudinary-react'
import {motion} from 'framer-motion'


const ADD_TO_CART = gql`
  mutation addToCart($table: Int!, $product: String!) {
    addToCart(table: $table, product: $product) { 
      id table product count description price
    }
  }
`

const GET_PRODUCT= gql`
   query product($uuid:String!) {
     product(uuid:$uuid){
      image name color price 
     }
   }
`

function ProductItem({match,uuid,setCartOrders}) {
  const [scale,setScale]= useState('scale-100')

  const [product, setProduct] = useState({})

  const [addToCart]= useMutation(ADD_TO_CART,{
    onCompleted: (data)=> data && setCartOrders(data.addToCart)
  })

  const  addItemToCart= ()=> {
    const table= parseInt(match.params.code) || ''
    addToCart({ variables: { table, product: uuid } })
  }

  // get the product info
  const [getSelectedProduct, { loading }] = useLazyQuery(GET_PRODUCT, {
    fetchPolicy: "no-cache",
    variables: { uuid },
    onCompleted: (data) => data && setProduct(data.product)
  })

  useEffect(() => {
    getSelectedProduct()
  }, [getSelectedProduct])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{delay: .2}}
      onClick={addItemToCart}
      className="relative w-32 h-32 rounded-lg overflow-hidden shadow-xl cursor-pointer select-none"
    >
      <button
        onMouseOver={() => setScale("scale-125")}
        onMouseOut={() => setScale("scale-100")}
        className={`absolute inset-0 w-full h-full bg-${product.color}-700 bg-opacity-40 hover:bg-opacity-50 focus:outline-none z-20`}
      ></button>
      <div
        className={`p-1 absolute inset-0 flex flex-col items-center z-10 text-${product.color}-700`}
      >
        {product.name && (
          <p className="my-1 text-xl font-bold z-20 break-words text-white capitalize">
            {product.name}
          </p>
        )}
        {product.price && scale === "scale-125" && (
          <p className="mt-4 text-center text-xl font-bold">
            {product.price + " EGP"}
          </p>
        )}
      </div>
      {loading ? (
        <img
          src="/images/loading-spinner.gif"
          className="w-full h-full object-cover"
          alt="loading_spinner"
        />
      ) : !product.image ? (
        <img
          src="/images/default.png"
          className={`w-full h-full object-cover opacity-60 transform ${scale} transition duration-500 ease-out`}
          alt="default"
        />
      ) : (
        <Image
          cloudName="cafe-shop"
          publicId={product.image}
          className={`w-full h-full object-cover transform ${scale} transition duration-500 ease-out`}
          crop="scale"
        />
      )}
    </motion.div>
  )
}

export default withRouter(ProductItem)

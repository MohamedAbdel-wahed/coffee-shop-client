import React,{useState,useContext} from 'react'
import {FaImage,FaEdit,FaTrashAlt} from 'react-icons/fa'
import ImageModal from './ImageModal'
import EditProductModal from './EditProductModal'
import RemoveModal from '../RemoveModal'
import { useTranslation } from 'react-i18next'
import {gql,useMutation} from '@apollo/client'
import {motion} from 'framer-motion'
import {AuthContext} from '../../contexts/AuthContext'
import {CREDENTIALS} from '../../env'


const REMOVE_PRODUCT= gql`
    mutation deleteProduct($uuid:String!) {
      deleteProduct(uuid:$uuid)
    }
`

function ProductRow({product,products,setProducts}) {
  if(!localStorage.getItem('token')) window.location.href="/login"

  const {uuid,category,name,description,price}= product

  const { authState }= useContext(AuthContext)
  const {user} = authState

  const { t } = useTranslation()

  const [imageModal,setImageModal]= useState(false)
  const [editModal,setEditModal]= useState(false)
  const [removeModal,setRemoveModal]= useState(false)

  const [deleteProduct]= useMutation(REMOVE_PRODUCT,{
      onCompleted: ()=> setRemoveModal(false)
  })

  const removeProduct= (key)=> {
    const newProductsList= products.filter(product=> product.uuid!==key)
    deleteProduct({variables: {uuid: key}})
    setProducts(newProductsList)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex justify-around border-b border-gray-300"
    >
      <span className="text-sm p-3 w-2/12 flex justify-center items-center text-gray-800 border-r break-words">
        {category}
      </span>
      <span className="text-sm p-3 w-2/12 flex justify-center items-center text-gray-800 border-r break-words">
        {name}
      </span>
      <span className="text-sm p-3 w-4/12 flex justify-center items-center text-gray-800 border-r break-words">
        {!description || description.trim() === "" ? "_______" : description}
      </span>
      <span className="text-sm py-3 flex-1 flex justify-center items-center text-gray-800 border-r">
        {price}
      </span>
      {user && user.verified===CREDENTIALS.username && (
        <span className="p-3 w-2/12 flex justify-center items-center space-x-4 text-gray-800">
          <button
            onClick={() => setImageModal(true)}
            className="p-1.5  bg-gray-300 text-gray-600 focus:outline-none bg-opacity-60 focus:bg-opacity-100 rounded-full"
            title={t("products.productImage")}
          >
            <FaImage />
          </button>
          <button
            onClick={() => setEditModal(true)}
            className="p-1.5 bg-blue-300 text-blue-600 focus:outline-none bg-opacity-60 focus:bg-opacity-100 rounded-full"
            title={t("products.editBtn")}
          >
            <FaEdit />
          </button>

          <button
            onClick={() => setRemoveModal(true)}
            className="p-1.5 bg-red-300 text-red-600 focus:outline-none bg-opacity-60 focus:bg-opacity-100 rounded-full"
            title={t("products.removeBtn")}
          >
            <FaTrashAlt />
          </button>
        </span>
      )}

      {imageModal && (
        <ImageModal setModal={setImageModal} uuid={product.uuid} />
      )}

      {editModal && (
        <EditProductModal
          setModal={setEditModal}
          product={product}
          setProducts={setProducts}
          products={products}
        />
      )}

      {removeModal && (
        <RemoveModal
          setModal={setRemoveModal}
          removeEntry={removeProduct}
          removedKey={uuid}
          name={name}
        />
      )}
    </motion.div>
  )
}

export default ProductRow

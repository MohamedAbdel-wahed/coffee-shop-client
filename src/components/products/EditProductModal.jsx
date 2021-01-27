import React,{useState} from "react"
import ModalTemplate from "../ModalTemplate"
import { useTranslation } from "react-i18next"
import {gql,useMutation} from '@apollo/client'


const EDIT_PRODUCT= gql`
   mutation updateProduct($uuid:String! $category:String! $name:String! $description:String $price:Float!){
     updateProduct(uuid:$uuid category:$category name:$name description:$description price:$price){
      uuid category name price description 
     }
   }
`

function EditProductModal({ setModal, product, products, setProducts }) {
  const { t } = useTranslation()

  const [errors,setErrors]= useState({}) 

  const [updatedProduct,setUpdatedProduct]= useState(product) 

  const [editProduct,{loading}]= useMutation(EDIT_PRODUCT,{
      onError: (err)=> setErrors(err.graphQLErrors[0].extensions.errors),
      onCompleted(data) {
        setErrors({})
        const productIndex=  products.findIndex(item=> item.uuid===product.uuid)
        products[productIndex]= data.updateProduct
        setProducts([...products])
        setModal(false)
      }
    })
  
  const handleSubmit= (e)=> {
      e.preventDefault()
      editProduct({variables: updatedProduct})
  }

  return (
    <ModalTemplate
      setModal={setModal}
      title={t("products.productModal.editTitle")}
    >
      <form onSubmit={handleSubmit}>
        <div className="my-3">
          <input
            type="text"
            className="w-full px-4 py-2 text-gray-700 text-sm border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-300"
            placeholder={t("products.productModal.categoryPlaceholder")}
            value={updatedProduct.category}
            onChange={(e) => setUpdatedProduct({ ...updatedProduct, category: e.target.value })}
          />
          {errors.category && (
            <p className="mt-1 ml-2 text-xs text-red-600">{errors.category}</p>
          )}
        </div>

        <div className="my-3">
          <input
            type="text"
            className="w-full px-4 py-2 text-gray-700 text-sm border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-300"
            placeholder={t("products.productModal.namePlaceholder")}
            value={updatedProduct.name}
            onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
          />
          {errors.name && (
            <p className="mt-1 ml-2 text-xs text-red-600">{errors.name}</p>
          )}
        </div>

        <div className="my-3">
          <input
            type="number"
            className="w-7/12 px-4 py-2 text-gray-700 text-sm border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-300"
            placeholder={t("products.productModal.pricePlaceholder")}
            value={updatedProduct.price}
            onChange={(e) => setUpdatedProduct({...updatedProduct, price: parseFloat(e.target.value) || ''})}
            required
          />
          {errors.price && (
            <p className="mt-1 ml-2 text-xs text-red-600">{errors.price}</p>
          )}
        </div> 

        <div className="my-3">
          <textarea
            rows="3"
            className="w-full px-4 py-2 text-gray-700 text-sm border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-300"
            placeholder={t("products.productModal.descriptionPlaceholder")}
            defaultValue={updatedProduct.description}
            onChange={(e) => setUpdatedProduct({ ...updatedProduct, description: e.target.value })}
          ></textarea>
          {errors.description && (
            <p className="mt-1 ml-2 text-xs text-red-600">{errors.description}</p>
          )}
        </div>

        <button className="w-full my-3 py-2.5 px-4 text-sm text-white bg-red-500 rounded-full focus:outline-none uppercase focus:bg-opacity-80 tracking-wide">
          {t(
              `${
                loading
                  ? "loading"
                  : "products.productModal.updateBtn"
              }`
            )}
        </button>
      </form>
    </ModalTemplate>
  )
}

export default EditProductModal

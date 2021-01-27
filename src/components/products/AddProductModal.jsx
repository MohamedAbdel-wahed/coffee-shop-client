import React,{useState} from "react"
import ModalTemplate from "../ModalTemplate"
import { useTranslation } from "react-i18next"
import {gql,useMutation} from '@apollo/client'


const ADD_PRODUCT= gql`
   mutation addProduct($category:String! $name:String! $description:String $price:Float!){
     addProduct(category:$category name:$name description:$description price:$price){
      uuid category name price description 
     }
   }
`

function AddProductModal({ setModal, products,setProducts }) {
  const { t } = useTranslation()

  const [errors, setErrors] = useState({})

  const [product, setProduct] = useState({
    category: "",
    name: "",
    description: "",
    price: 0,
  })

  const [addProduct, { loading }] = useMutation(ADD_PRODUCT, {
    onError: (err) => setErrors(err.graphQLErrors[0].extensions.errors),
    onCompleted(data) {
      setErrors({})
      const newProducts = [...products, data.addProduct]
      setProducts(newProducts)
      setModal(false)
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    addProduct({ variables: product })
  }

  return (
    <ModalTemplate
      setModal={setModal}
      title={t("products.productModal.addTitle")}
    >
      <form onSubmit={handleSubmit}>
        <div className="my-3">
          <input
            type="text"
            className="w-full px-4 py-2 text-gray-700 text-sm border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-300"
            placeholder={t("products.productModal.categoryPlaceholder")}
            value={product.category}
            onChange={(e) =>
              setProduct({ ...product, category: e.target.value })
            }
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
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
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
            value={product.price}
            onChange={(e) =>
              setProduct({ ...product, price: parseFloat(e.target.value) || '' })
            }
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
            onChange={(e) =>
              setProduct({ ...product, description: e.target.value })
            }
            defaultValue={product.description}
          ></textarea>
          {errors.description && (
            <p className="mt-1 ml-2 text-xs text-red-600">
              {errors.description}
            </p>
          )}
        </div>

        <button className="w-full my-3 py-2.5 px-4 text-sm text-white bg-red-500 rounded-full focus:outline-none uppercase focus:bg-opacity-80 tracking-wide">
          {t(`${loading ? "loading" : "products.productModal.createBtn"}`)}
        </button>
      </form>
    </ModalTemplate>
  )
}

export default AddProductModal

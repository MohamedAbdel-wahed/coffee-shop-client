import React,{useState,useEffect} from "react"
import ModalTemplate from "../ModalTemplate"
import { useTranslation } from "react-i18next"
import {gql,useMutation,useLazyQuery} from '@apollo/client'
import {FiPlusCircle} from 'react-icons/fi'
import {Image} from 'cloudinary-react'


const UPLOAD_IMAGE= gql`
   mutation uploadImage($product:String! $image:String!) {
     uploadImage(product:$product image:$image)
   }
`

const GET_PRODUCT= gql`
   query product($uuid:String!) {
     product(uuid:$uuid){
      image
     }
   }
`

function ImageModal({setModal,uuid}) {
  if(!localStorage.getItem('token')) window.location.href="/login"
  
  const { t } = useTranslation()

  const [imgPreview,setImgPreview]= useState(null)
  const [error,setError]= useState("")
  const [productImage,setProductImage]= useState(null)


   const [uploadImage,{loading: uploadLoading}]= useMutation(UPLOAD_IMAGE,{
      onCompleted: ()=> setModal(false) 
   })

   const [getSelectedProduct,{loading: imgLoading}] = useLazyQuery(GET_PRODUCT, {
      fetchPolicy: "no-cache",
      variables: {uuid},
      onCompleted: (data) => setProductImage(data.product.image),
    })

  const handleChange= (e)=> {
    const file= e.target.files[0]
    if(file){
      const reader= new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend= ()=> setImgPreview(reader.result)
    }
  }

   const handleSubmit= (e)=>{
     e.preventDefault()
     if(imgPreview){
      const params= {product:uuid, image: imgPreview}
      uploadImage({variables: params})
     }
     else{
       setError("please select an image")
     }
   }

   useEffect(()=>{
    getSelectedProduct()
   },[getSelectedProduct])

  return (
    <ModalTemplate setModal={setModal}>
      {imgLoading ? (
        <div
          width="500"
          height="300"
          className="text-gray-400 font-bold tegxt-2xl text-center"
        >
          Loading...
        </div>
      ) : productImage ? (
        <Image
          cloudName="cafe-shop"
          publicId={productImage}
          width="500"
          height="300"
          crop="scale"
        />
      ) : (
        <form
          onSubmit={handleSubmit}
          className="px-6 py-3 flex flex-col items-center"
        >
          {imgPreview ? (
            <img
              src={imgPreview}
              width="300"
              height="100"
              className="rounded-sm"
              alt="preview_image"
            />
          ) : (
            <div className="w-full">
              <label
                htmlFor="product_image"
                className="inline-block my-2 cursor-pointer"
              >
                <FiPlusCircle size="5em" color="orange" />
              </label>
              <input
                type="file"
                onChange={handleChange}
                className="hidden"
                id="product_image"
              />
              {error && <p className="text-red-600 text-xs my-1">{error}</p>}
            </div>
          )}

          <button className="mt-5 px-4 py-2 bg-black text-sm font-semibold text-white focus:outline-none focus:bg-opacity-70 rounded-lg uppercase">
            {t(`${uploadLoading ? "uploading" : "products.productModal.uploadBtn"}`)}
          </button>
        </form>
      )}
    </ModalTemplate>
  )
}

export default ImageModal

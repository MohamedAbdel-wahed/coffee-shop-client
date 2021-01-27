import React,{useState,useEffect} from 'react'
import {gql,useLazyQuery} from '@apollo/client'



const GET_PRODUCT= gql`
   query product($uuid:String!) {
     product(uuid:$uuid){
      image name color description price 
     }
   }
`

function OrderBillRow({uuid,count,description}) {
  const [productName, setProductName] = useState(null)

  // get the product name
  const [getSelectedProduct] = useLazyQuery(GET_PRODUCT, {
    fetchPolicy: "no-cache",
    variables: { uuid },
    onCompleted: (data) => setProductName(data.product.name)
  })

  useEffect(() => {
    getSelectedProduct()
  }, [getSelectedProduct])

  return (
    <tr className="py-4 leading-tight">
      <td className="py-2 px-1">{productName}</td>
      <td className="py-2 px-4">{count}</td>
      <td className="py-2 px-1 break-words text-xs">{description? description : "____"}</td>
    </tr>
  )
}

export default OrderBillRow

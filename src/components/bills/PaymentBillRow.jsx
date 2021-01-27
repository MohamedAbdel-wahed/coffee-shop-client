import React,{useState,useEffect} from 'react'
import {gql,useLazyQuery} from '@apollo/client'


 const GET_PRODUCT= gql`
   query product($uuid:String!) {
     product(uuid:$uuid){
        name 
     }
   }
`

function BillProduct({order}) {

  const [product,setProduct]= useState({})

  const [getProduct]= useLazyQuery(GET_PRODUCT,{
      fetchPolicy: 'no-cache',
      variables: {uuid: order.product},
      onCompleted: (data)=> data && setProduct(data.product)
  })

  useEffect(()=>{
    getProduct()
  },[getProduct])

  return (
    <tr className="h-14 text-center leading-tight">
      <td className="text-sm leading-tight">{product?.name || ''}</td>
      <td>{order.price}</td>
      <td>{order.count}</td>
      <td>{(order.price*order.count).toFixed(1)}</td>
  </tr>
  )
}

export default BillProduct

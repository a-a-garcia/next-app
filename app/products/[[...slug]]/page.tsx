import React from 'react'

//slug is an array of strings
interface Props {
    params: { slug: string[]};
    //for accessing query string parameters 
    //sortOrder= any string you want
    searchParams: { sortOrder: string }
}

const ProductPage = ( {params: { slug }, searchParams : { sortOrder } } : Props) => {
  return (
    <div>ProductPage {slug} {sortOrder} </div>
  )
}

export default ProductPage
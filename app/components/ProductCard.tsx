// 'use client';
 //this will tell the next.js to include this component in our javascript bundle. That means, if this component is depenedont on other components, those components will also become client components. So you don't need to include 'use client' on every client component.
//ONLY USE WHEN ABSOLUTELY NECESSARY
import React from 'react'
import AddToCart from './AddToCart'

const ProductCard = () => {
  return (
    <div>
        <AddToCart />
    </div>
  )
}

export default ProductCard
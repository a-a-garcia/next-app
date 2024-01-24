'use client'; //remember to add this to client components
import React from 'react'

const AddToCart = () => {
  return (
    <div>
        {/* this button was moved here as server components can't handle clicks.  */}
        <button onClick={() => console.log('click')}>Add to Cart</button>
    </div>
  )
}

export default AddToCart
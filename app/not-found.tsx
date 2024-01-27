import React from 'react'

const NotFound = () => {
  return (
    // &apos; is the HTML entity for the apostrophe character
    // you'll get an error at build time if you don't use &apos; instead of '
    <div>The Requested Page Doesn&apos;t Exist</div>
  )
}

export default NotFound
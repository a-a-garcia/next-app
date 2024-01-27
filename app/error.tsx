//this page must be a client component, due to the reset button onClick()
'use client';
import React from 'react'

//only use reset in certain parts of your app or else your error log can be flooded with errors

//need to access the error that occured - starts with defining Props
//next.js will automatically pass the error object to this component
interface Props {
    error: Error;
    // reset syntax - reset gives the user the option to reset the page 
    reset: () => void;
}


//destructing error from props..
const ErrorPage = ( {error, reset} : Props ) => {
    console.log('error', error)

    return (
    <>
        <div>An unexpected error has occured.</div>
        <button className='btn'
        onClick={() => reset()}
        >Retry</button>
    </>
  )
}

export default ErrorPage
'use client';
import React, { useState } from 'react'
import { CldUploadWidget, CldImage } from 'next-cloudinary';

// we need an interface here to specify the shape of the result object that is passed to the onUpload function, otherwise typescript won't know what type of data result.info is
interface CloudinaryResult {
    public_id: string;
}

// https://demo.cloudinary.com/uw/#/ is where you can customize the upload widget
// this portal will only give you plain javascript. you'll have to take the properties and insert them into the CldUploadWidget component as 'options'


// must use client directive bc of the onclick
const UploadPage = () => {
    //initialize state here so we can pass the public id to the image component
    const [publicId, setPublicId] = useState('')
  return (
    <>
        {/* displaying the uploaded img */}
        {publicId && 
            <CldImage src={publicId} width={270} height={180} alt="a random screenshot"/>
        }

        {/* // to get your uploadPreset, go to Cloudinary, settings -> upload -> add upload preset. Can use either unsigned or signed upload preset, lookup documentation
        // you can specify there also what folder you want uploaded items to go to, for this example its left blank so it will go to the root folder */}
        <CldUploadWidget 
        uploadPreset='zhoi50ir'
        options={{
            sources: ['local'],
            multiple: false,
            maxFiles: 5,
            styles: {}
        }}
        onUpload={(result, widget) => {
            if (result.event !== 'success') return;
            //using type assertion to tell typescript that result.info is of type CloudinaryResult
            const info = result.info as CloudinaryResult;
            setPublicId(info.public_id)
        }}>
            {/* this component expects a function as a child */}
            {/* next cloudinary passes an object as an argument. we can destructure that object */}
            { ({open}) => 
                <button className='btn btn-primary' onClick={() => open()}>Upload</button>
                }
        </CldUploadWidget>
    
    </>
  )
}

export default UploadPage
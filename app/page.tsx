// note client components cannot be async
'use client';
import Image from 'next/image'
import { Metadata } from 'next'
import nonsense from '@/public/images/nonsense-christmas.jpg'
import Link from 'next/link'
import ProductCard from './components/ProductCard/ProductCard'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import { useState } from 'react';
// `_` is a common convention for lodash
// commented out to lazy load lodash
// import _ from 'lodash';

// we can use the dynamic function to lazy load heavy components
import dynamic from 'next/dynamic';

// commented out to show how to lazy load lodash
// call the dynamic function, then pass it a loader function
// returns a component
// const HeavyComponent = dynamic(
//   () => import('./components/HeavyComponent'),
//   // optional second argument to display loading
//   { 
//     // client components by default are pre-rendered on the server, sometimes can cause issues IE trying to access certain browser APIS. you can set ssr to false to disable pre-rendering on the server
//     ssr: false,
//     loading: () => <p>Loading...</p>}
// )

// async removed for lazy loading lesson
export default function Home() {
  // const [isVisible, setIsVisible] = useState(false);
  return (
    // when you use `fill`, the parent element should be relative, fixed, or absolute
    // it must also have a height
    <main className='relative h-screen'>
      <h1>Hello World</h1>

      <button onClick={async () => {
        // we lazy load lodash by only importing it when the button is clicked
        const _ = (await import('lodash')).default;

        const users = [
          { name: 'c'},
          { name: 'b'},
          { name: 'a'}
        ]

        //pass the array, and then an array of strings that determine the properties we want to use for sorting
        const sorted = _.orderBy(users, ['name'])
        console.log(sorted)
      }}>Show</button>

      {/* // commented out to show how to lazy load lodash */}
      {/* <button onClick={() => setIsVisible(true)}>Show</button>
      { isVisible && <HeavyComponent /> } */}

      {/* <Image src={nonsense} alt="album cover of nonsense christmas"/> */}
      {/* you must register domains for images from the cloud - go to next.js config*/}
      {/* you must also set an explicit height and width because next.js does not know the dimensions of remote images OR you can just set `fill` for responsiveness*/}
      {/* using fill may cause the image to lose its aspect ratio - try to change the objectFit to cover or contain - you can use tailwind*/}
      {/* most of the time you probably want to use cover to prevent whitespace */}
      {/* when using fill, you should set `sizes` property too - determines how much of the width of the viewport the image is going to take*/}
      {/* sizes='100vw' means the image will take 100% of the viewport width on every device */}
      {/* <Image 
      src="https://bit.ly/react-cover" 
      alt="react course cover"
      // width={300}
      // height={170}
      fill
      // style={ { objectFit: 'cover'} }
      className='object-cover'
      // sizes='100vw'
      // doesn't affect how the image is displayed, but tells next.js how to serve the image
      sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw"
      // optional
      quality={100}
      // for images that should appear above the fold.
      // Image components are lazy loading by default
      priority
      ></Image> */}
    </main>
  )







  //all code commented out below for the optimization part of the course

  // Pass authentication options. this is the object we use when initializing NextAuth
  // returns a promise, so must async await
  //this is for accessing session on the server
  // const session = await getServerSession(authOptions)
  // return (
  //   <main>
  //     {/* exclamation mark to tell compiler we DO have a user here */}
  //     <h1>Hello { session && <span>{session.user!.name}</span> }</h1>
  //     <Link href="/users">Users</Link>
  //     {/* Note - we do not want to use a tags here for navigation, because each time you navigate, all resources have to re-download. Use a Link instead */}
  //     {/* <a href="/users">Users</a> */}
  //     <ProductCard></ProductCard>
  //   </main>
  // )
}

// this is where we can override the default metadata for this page
// export const metadata: Metadata = {
//   title: '...',
//   description: '...'
// }

// on some pages, typically pages that have route or query string parameters, we need to generate the metadata dynamically IE a product page, where the metadata will depend on what product we are looking at
// we export an async function instead
// export async function generateMetadata(): Promise<Metadata> {
//   const product = await fetch('')
//   // or you might use prisma
//   // const product = await prisma.product.findUnique({ where: { id: '1' }})
//   return {
//     title: product.title,
//     description: product.description
//   }
// }
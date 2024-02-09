'use client';
import React from 'react'
import Link from 'next/link';
import { useSession } from 'next-auth/react';
const NavBar = () => {
  // to display user's name...
  // use the hook useSession from next-auth/react
  // we get an object with a few properties, which we can destructure
  // `data: session` is just renaming the `data` property to `session`
  const {status, data: session} = useSession()
  // status can be one of 3 things: loading, authenticated, or unauthenticated
  return (
    <div className='flex bg-slate-200 text-black p-5 space-x-3'>
        <Link className='mr-5 font-poppins' href="/">Next.js</Link>
        <Link href="/users">Users</Link>
        { status === 'loading' && <div>Loading...</div>}
        {/* use a `!` here to clear error "user is possibly undefined"*/}
        { status === 'authenticated' && 
        <div>
          {session.user!.name}
          {/* signing out is as simple as adding Link below */}
          {/* another endpoint that's handled by NextAuth*/}
          <Link href="/api/auth/signout" className='ml-3'>Sign Out</Link>
        </div>
        }
        { status === 'unauthenticated' && <Link href="/api/auth/signin">Login</Link>}
    </div>
  )
}

export default NavBar
import React from 'react'
import Link from 'next/link';
const NavBar = () => {
  return (
    <div className='flex bg-slate-200 text-black p-5'>
        <Link className='mr-5' href="/">Next.js</Link>
        <Link href="/users">Users</Link>
    </div>
  )
}

export default NavBar
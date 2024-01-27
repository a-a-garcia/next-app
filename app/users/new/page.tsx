'use client'; //client directive - can't do onClicks on a server component
// you MUST import useRouter from next/navigation, not next/router or you'll get an error
import { useRouter } from 'next/navigation';
import React from 'react'

const NewUsersPage = () => {
  const router = useRouter();

  return (
    <div>
      <button 
      className='btn btn-primary'
      onClick={() => router.push('/users')}
      >Create</button>
    </div>
  )
}

export default NewUsersPage
import React from 'react'
import UserTable from './UserTable'
import Link from 'next/link'
import { Suspense } from 'react'

//when we need to access query string parameters, we have to do that in our page.tsx's and pass data down to our components
interface Props {
    searchParams: { sortOrder: string }
}

const UsersPage = async ( {searchParams : { sortOrder}} : Props) => {
    
  return (
    <div>
        <h1>Users</h1>

        <Link href="/users/new" className='btn'>New User</Link>

        {/* wrap the component you want a loading UI to show - one option */}
        <Suspense fallback={<p>Loading...</p>}>
          {/* below we pass sortOrder as props */}
          {/* you'll get an error until you go to UserTable component and define props there */}
          <UserTable sortOrder={sortOrder} /> 
        </Suspense>

    </div>
  )
}

export default UsersPage
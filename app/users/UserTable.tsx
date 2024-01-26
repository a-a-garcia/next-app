import React from 'react'
import Link from 'next/link';
import { sort } from 'fast-sort';

//In TS, you can use interfaces to define the shape of your user objects.
//better to place this interface in its own place if its going to be used elsewhere
interface User {
    id: number;
    name: string;
    email: string;
}

interface Props {
    sortOrder: string;
}


const UserTable = async ( {sortOrder} : Props) => {
  //no need to useEffect or useState! Just fetch your data and render the returned promises
  //optional second argument, you can pass in an object to define the behavior of the cache.
  // { cache: 'no-store' } useful when we want to always show fresh data to users
  // { next: {revalidate: 10} } this tells next.js to fetch fresh data every 10 seconds
  // remember this ONLY works with the fetch function. 3rd party tools like Axios won't provide this data cache functionality
  const res = await fetch('https://jsonplaceholder.typicode.com/users', 
  // { next: {revalidate: 10} }
  { cache: 'no-store'}
  )
  //We do ...: User[] to apply the User interface to users. It tells TS that we expect users to be an array of User objects
  const users: User[] = await res.json();

  // to sort users via email or name alphabetically...
  //call the sort method and check if sortOrder is email or name
  // store result (a new array) in sortedUsers
  const sortedUsers = sort(users).asc(
    sortOrder === 'email' 
    ? user => user.email 
    : user => user.name);

return (
  <div>
      {/* timestamp will not change in production. only in development, because next.js will treat this page as a static page. BECAUSE fetch + cache is used, data is treated as static. You need to configure the cache to render dynamically */}
      <p>{new Date().toLocaleTimeString()}</p>
      {/* Note that user is initially of type any. Not good */}
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th>
                <Link href="/users?sortOrder=name" >User Name</Link>
            </th>
            <th>
                <Link href="/users?sortOrder=email">Email</Link>
            </th>
          </tr>
        </thead>
        <tbody>
          {/* users becomes sortedUsers */}
          {sortedUsers.map(user => <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td></tr>)}
        </tbody>
      </table>
  </div>
)
}

export default UserTable
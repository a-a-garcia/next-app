import React from 'react'

//In TS, you can use interfaces to define the shape of your user objects.
interface User {
    id: number;
    name: string;
}

const UsersPage = async () => {
    //no need to useEffect or useState! Just fetch your data and render the returned promises
    const res = await fetch('https://jsonplaceholder.typicode.com/users')
    //We do ...: User[] to apply the User interface to users. It tells TS that we expect users to be an array of User objects
    const users: User[] = await res.json();

  return (
    <div>
        <h1>Users</h1>
        {/* Note that user is initially of type any. Not good */}
        {users.map(user => <li key={user.id}>{user.name}</li>)}
    </div>
  )
}

export default UsersPage
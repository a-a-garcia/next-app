import React from 'react'
import { notFound } from 'next/navigation'
//create an interface for props

interface Props {
    params: { id: number }
}

//{ params : { id } } is destructuring syntax
// this approach only works on page.tsx's (and route.tsx's).

const UserDetailPage = ( { params : { id } }: Props) => {
  //syntax for throwing error defined in /app/not-found.tsx
  if (id > 10) notFound();
  //if you have a not-found.tsx inside of /[id], it will render that instead of the one at /app. Useful for error customization
  

  return (
    //
    <div>UserDetailPage {id}</div>
  )
}

export default UserDetailPage
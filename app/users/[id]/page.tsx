import React from 'react'

//create an interface for props

interface Props {
    params: { id: number }
}

//{ params : { id } } is destructuring syntax
// this approach only works on pages.
const UserDetailPage = ( { params : { id } }: Props) => {
  return (
    //
    <div>UserDetailPage {id}</div>
  )
}

export default UserDetailPage
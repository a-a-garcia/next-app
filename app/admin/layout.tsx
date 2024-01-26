import React, { ReactNode } from 'react'

//layouts MUST have children of type ReactNode
interface Props {
    children: ReactNode
}

const AdminLayout = ( {children} : Props) => {
  return (
    <div className='flex'>
        {/* lets say we want a side bar for ALL admin pages */}
        <aside className='bg-slate-200 p-5 mr-5'>Admin Sidebar</aside>
        {/* this can be any of the admin pages*/}
        <div> {children} </div>
    </div>
  )
}

export default AdminLayout
'use client'
import React, {useState, } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

const UpdatePage = () => {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const {status, data: session} = useSession();

  console.log(session)


  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => { 

    e.preventDefault();

    fetch('/api/register', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            // provide a default value should session be undefined
            email: session?.user?.email ?? '', 
            password: password})
    })
    .then(res => res.json())
    .then(data => console.log(data, 'submitted successfully',
    router.push('/')
    ))
    .catch(err => console.log(err))
  }

  return (
    <div>
      <form action="/api/register" className='flex flex-col p-2 text-black' onSubmit={handleSubmit}>
        <input className="p-2 m-2" type="password" name="password" placeholder="New Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <input type="submit" value="Submit" className='bg-white p-2 m-2 w-1/4 rounded-sm hover:bg-slate-400 transition-colors cursor-pointer'/>
      </form>
    </div>
  )
}

export default UpdatePage;
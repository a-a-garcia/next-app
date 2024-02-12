'use client'
import React, {useState} from 'react'
import { useRouter } from 'next/navigation'

const RegisterPage = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name, email, password})
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
        <input className="p-2 m-2" type="text" name="name" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
        <input className="p-2 m-2" type="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <input className="p-2 m-2" type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <input type="submit" value="Submit" className='bg-white p-2 m-2 w-1/4 rounded-sm hover:bg-slate-400 transition-colors cursor-pointer'/>
      </form>
    </div>
  )
}

export default RegisterPage;
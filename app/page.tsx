import Image from 'next/image'
import Link from 'next/link'
import ProductCard from './components/ProductCard/ProductCard'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'

export default async function Home() {
  // Pass authentication options. this is the object we use when initializing NextAuth
  // returns a promise, so must async await
  //this is for accessing session on the server
  const session = await getServerSession(authOptions)
  return (
    <main>
      {/* exclamation mark to tell compiler we DO have a user here */}
      <h1>Hello { session && <span>{session.user!.name}</span> }</h1>
      <Link href="/users">Users</Link>
      {/* Note - we do not want to use a tags here for navigation, because each time you navigate, all resources have to re-download. Use a Link instead */}
      {/* <a href="/users">Users</a> */}
      <ProductCard></ProductCard>
    </main>
  )
}

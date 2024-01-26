import Image from 'next/image'
import Link from 'next/link'
import ProductCard from './components/ProductCard/ProductCard'

export default function Home() {
  return (
    <main>
      <h1>Hello World</h1>
      <Link href="/users">Users</Link>
      {/* Note - we do not want to use a tags here for navigation, because each time you navigate, all resources have to re-download. Use a Link instead */}
      {/* <a href="/users">Users</a> */}
      <ProductCard></ProductCard>
    </main>
  )
}

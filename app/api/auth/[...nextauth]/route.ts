import NextAuth from "next-auth"
import { authOptions } from "../authoptions"

// again, remember only HTTP methods can be exported from a route file

// now pass it to NextAuth
const handler = NextAuth(authOptions)

//letting next-auth expose a bunch of endpoints that start with /auth
export { handler as GET, handler as POST }
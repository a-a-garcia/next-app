import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/prisma/client";

// exporting options so we can use it outside of this module 
// we must set authOptions to be of type NextAuthOptions so that we can define our session strategy as jwt instead of the default of "database". (thats the default for when we use adapters.)
export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),

    // specify which providers you want to use
    providers: [
        // process.env allows us to read our environment variables
        GoogleProvider({
            // you'll get an error here unless you put a '!' at the end of these variables because clientId and clientSecret expect strings, but process.env variables could be undefined. in most cases though, we know that these variables will be defined, so we can use the '!' to tell typescript to ignore the undefined possibility
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
    ],

    // changing the session strategy to jwt
    session: {
        strategy: "jwt",
    }
}

// now pass it to NextAuth
const handler = NextAuth(authOptions)

//letting next-auth expose a bunch of endpoints that start with /auth
export { handler as GET, handler as POST }
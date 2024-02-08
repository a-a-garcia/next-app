import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/prisma/client";
import bcrypt from "bcrypt";


// exporting options so we can use it outside of this module 
// we must set authOptions to be of type NextAuthOptions so that we can define our session strategy as jwt instead of the default of "database". (thats the default for when we use adapters.)
export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),

    // specify which providers you want to use
    providers: [
        CredentialsProvider({
            name: `Credentials`,
            credentials: {
                email: { label: 'Email', type: 'email', placeholder: 'Email'},
                password: { label: 'Password', type: 'password', placeholder: 'Password'}
            },
            async authorize(credentials, req) {
                // check if user is valid
                // if user doesn't enter an email or password, we'll return null
                if (!credentials?.email || !credentials.password) return null
                // else look for the user
                const user = await prisma.user.findUnique({ where: {email: credentials.email}})

                // if user is not found, return null
                if (!user) return null

                // if user is found, compare entered password with password in database
                //compare doesn't accept null so we need to use `!` to tell typescript that we know that hashedPassword will not be null
                //compare will return a boolean
                const passwordsMatch = await bcrypt.compare(credentials.password, user.hashedPassword!)

                return passwordsMatch ? user : null
            }
        }),

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
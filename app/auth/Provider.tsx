'use client';
import React, { ReactNode } from 'react'
import { SessionProvider } from 'next-auth/react'

// auth provider takes a children prop (you can destructure props right away here)
// we can also define an interface or define it inline (done below)

const AuthProvider = ( {children} : { children: ReactNode } ) => {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}

//go to layout.tsx to see how we use this AuthProvider
//and go to NavBar to see how the useSession hook is used

export default AuthProvider
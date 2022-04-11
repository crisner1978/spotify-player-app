import Head from 'next/head'
import React from 'react'
import { SessionProvider } from "next-auth/react"
import { RecoilRoot } from 'recoil'

const AppProviders = ({ session, children }) => {
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <Head>
          <title>Spotify Player App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {children}
      </RecoilRoot>
    </SessionProvider>
  )
}

export default AppProviders
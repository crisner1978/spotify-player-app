import AppProviders from 'AppProviders'
import '../styles/globals.css'

function MyApp({ Component, pageProps: { session, ...pageProps} }) {
  return (
    
    <AppProviders session={session}>
      <Component {...pageProps} />
    </AppProviders>
  )
}

export default MyApp

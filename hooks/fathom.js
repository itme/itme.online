import { useEffect } from 'react'
import * as Fathom from 'fathom-client'
import { useRouter } from 'next/router'

const VercelEnv = process.env.VERCEL_ENV || ''
const FathomSiteId = process.env.FATHOM_SITE_ID || ''

export function useFathom() {
  const router = useRouter()
  return useEffect(() => {
    Fathom.load(FathomSiteId, {
      includedDomains: [
        (VercelEnv === "production") ?
        'understory.garden' :
        'staging.understory.garden'
      ],
    })

    function onRouteChangeComplete() {
      Fathom.trackPageview()
    }
    // Record a pageview when route changes
    router.events.on('routeChangeComplete', onRouteChangeComplete)
    // Unassign event listener
    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete)
    }
  }, [])
}

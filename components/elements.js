import { forwardRef } from 'react'
import ReactLoader from 'react-loader-spinner'
import auth from "solid-auth-client"
import NextLink from 'next/link'

import Button from "./Button"
import useWebId from "~hooks/useWebId"
import { AuthProvider, useAuthContext } from '~lib/auth'


export const Loader = () => <ReactLoader type="Puff" color="white" />

export function AuthButton() {
  const { logOut } = useAuthContext()
  const webId = useWebId()
  if (webId === undefined) {
    return <div><Loader /></div>
  } else if (webId === null) {
    return (
      <Button onClick={() => auth.popupLogin({ popupUri: "/popup.html" })}>
        Log In
      </Button>
    )
  } else {
    return <Button onClick={() => logOut()}>Log Out</Button>
  }
}

export const Link = forwardRef(({ children, className = '', ...props }, ref) => {
  return (
    <NextLink {...props} >
      <a ref={ref} className={`lowercase text-pink-900 no-underline ${className}`}>{children}</a>
    </NextLink>
  )
})

export { Button }

"use client"

import { signOut } from "next-auth/react"

const Logout = () => {
  return (
    <button onClick={() => signOut({ callbackUrl: "/login" })}>Sign out</button>
  )
}

export default Logout

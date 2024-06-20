"use client"

import { login } from "@/_actions"
import { useRouter } from "next/navigation"
import { useState } from "react"

const LoginForm = () => {
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const formdata = new FormData(event.currentTarget)
      // console.log(formdata.get('email'), formdata.get('password'))

      const response = await login(formdata)

      // console.log(response);

      if (!!response.error) {
        setError(response.error)
      } else {
        router.push("/bookings")
      }
    } catch (e) {
      // console.log(e.message)
      setError(e.message)
    }
  }

  return (
    <>
      {error && <div className="text-red-500 text-lg font-bold">{error}</div>}
      <form className="login-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email Address</label>
          <input type="email" name="email" id="email" />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" />
        </div>

        <button type="submit" className="btn-primary w-full mt-4">
          Login
        </button>
      </form>
    </>
  )
}

export default LoginForm

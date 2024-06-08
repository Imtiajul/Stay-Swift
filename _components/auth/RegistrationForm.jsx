"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

const RegistrationForm = () => {
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (event) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const fname = formData.get("fname")
    const lname = formData.get("lname")
    const email = formData.get("email")
    const password = formData.get("password")

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Ccontent-Type": "application/json",
        },
        body: JSON.stringify({
          fname,
          lname,
          email,
          password,
        }),
      })

      response.status === 201 && router.push("/login");
    } catch (error) {
      setError(error.message)
      console.error(error.message)
    }
  }

  return (
    <>
    <form className="login-form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="fname">First Name</label>
        <input type="text" name="fname" id="fname" required />
      </div>

      <div>
        <label htmlFor="lname">Last Name</label>
        <input type="text" name="lname" id="lname" required/>
      </div>

      <div>
        <label htmlFor="email">Email Address</label>
        <input type="email" name="email" id="email" required/>
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" required />
      </div>

      <button type="submit" className="btn-primary w-full mt-4">
        Create account
      </button>
    </form>

      <div className="mt-2 text-xl text-red-500 text-center">{error && error}</div>
    </>
  )
}

export default RegistrationForm

"use client"

import Image from "next/image";
import { signIn } from "next-auth/react"
import Link from "next/link";

const SocialLogins = ({mode}) => {

  
  const handleLogin = () => {
    signIn("google", {callbackUrl: "/bookings"})
  }


  return (
    <>
      <div className="text-center text-xs text-gray-500">
        {mode === "register" ? (
          <Link href="/login" className="underline">Login</Link>
        ) : (
          <Link href="/register" className="underline">Register</Link>
        )} {" "}
        or Signup with
        </div>
      <div className="flex gap-4">
        <button className=" w-full mt-4 py-2 border-gray-600/30 border rounded-md flex items-center gap-2 justify-center">
          <Image src="/fb.png" alt="facebook" width={40} height={38} />
          <span>Facebook</span>
        </button>
        
        <button onClick={handleLogin} className=" w-full mt-4 py-2 border-gray-600/30 border rounded-md flex items-center gap-2 justify-center">
          <Image src="/google.png" alt="google" width={40} height={38} />
          <span>Google</span>
        </button>
      </div>
    </>
  );
};

export default SocialLogins;

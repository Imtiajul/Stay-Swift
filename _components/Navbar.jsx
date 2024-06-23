import { auth } from "@/auth";
import Image from "next/image"
import Link from "next/link"
import Logout from "./auth/Logout";

const Navbar = async ({ headerMenu }) => {
  const session = await auth();
  return (
    <nav>
      <Link href="/">
        <Image
          src="/stayswift.svg"
          alt="Stay Swift Logo"
          width={200}
          height={50}
          priority
        />
      </Link>

      <ul>
        {headerMenu && (
          <>
            <li>
              <Link href="#">Recommended Places</Link>
            </li>
            <li>
              <Link href="/hotels">Hotels</Link>
            </li>
          </>
        )}
        <li>
          <Link href="#">About Us</Link>
        </li>

        <li>
          <Link href="#">Contact us</Link>
        </li>

        {headerMenu && (
          <>
            <li>
              <Link href="/bookings">Bookings</Link>
            </li>
            <li>
              {session?.user ? (
                <>
                  <span>{session?.user?.name}</span>
                  <span> | </span>
                  <Logout/>
                </>
              ) :(
                <Link href="/login" className="login">
                  Login
                </Link>
              )}
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}

export default Navbar

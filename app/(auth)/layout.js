import Navbar from "@/_components/Navbar";
import { Inter } from "next/font/google";
import "../globals.css";
import { dbConnect } from "@/_services/mongoConnection";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Stay Swift",
  description: "One Place Stop for Hospitality",
};

export default async function RootLayout({ children }) {
  await dbConnect();

  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar headerMenu={false}/>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}

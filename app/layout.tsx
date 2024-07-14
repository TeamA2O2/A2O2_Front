import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html>
    <body className={inter.className}>
      <div className="container">
        <nav>
          <Link href="/user/info">userInfo /</Link>
          <Link href="/user/register">register /</Link>
          <Link href="/user/login">login /</Link>
          <Link href="/funding/create">create /</Link>
          <Link href="/funding/detail/41">detail(41)</Link>
        </nav>
        {children}
      </div>
    </body>
  </html>
);

export default RootLayout;

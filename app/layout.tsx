import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html>
    <body className={inter.className}>
      <div className="container">{children}</div>
    </body>
  </html>
);

export default RootLayout;

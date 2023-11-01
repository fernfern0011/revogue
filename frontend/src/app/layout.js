import "./globals.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Inter } from "next/font/google";
import TopNavigation from "./layout/TopNavigation";
import Footer from "./layout/Footer";
import NextAuthSessionProvider from "./sessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ReVogue",
  description: "Your sustainable shoppping destination",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthSessionProvider>
          <TopNavigation />
          {children}
          <Footer />
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}

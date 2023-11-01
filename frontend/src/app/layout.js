import "./globals.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Inter } from "next/font/google";
import TopNavigation from "./layout/TopNavigation";
import Footer from "./layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ReVogue",
  description: "Your sustainable shoppping destination",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body className={inter.className}>
        <TopNavigation />
        <div>{children}</div>
        <Footer />
      </body>
    </html>
  );
}

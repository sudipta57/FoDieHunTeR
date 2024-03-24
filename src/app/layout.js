import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
const inter = Inter({ subsets: ["latin"] });
import Nav from "./components/nav";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Divider } from "@chakra-ui/react";
import Sessionwrapper from "./components/seassionprovider";
import CartcontextProvider from "../context/cartcontext";
import "react-toastify/dist/ReactToastify.css";
import Script from "next/script";
const metadata = {
  title: "Foodie-Hunter",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Add the Razorpay script here */}
        <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      </head>
      <body className={inter.className}>
        <Providers>
          <Sessionwrapper>
            <CartcontextProvider>
              <ToastContainer />
              <Nav />
              <Divider />
              {children}
            </CartcontextProvider>
          </Sessionwrapper>
        </Providers>
      </body>
    </html>
  );
}

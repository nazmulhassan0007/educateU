import type { Metadata } from "next";
import localFont from "next/font/local";
import { MotionConfig } from "motion/react";
import { CartProvider } from "@/components/cart-context";
import { LoaderProvider } from "@/components/loader-context";
import { Preloader } from "@/components/Preloader";
import { SmoothScroll } from "@/components/SmoothScroll";
import "./globals.css";

const stackNotch = localFont({
  src: "../fonts/StackSansNotch.woff2",
  variable: "--font-stack-notch",
  weight: "200 700",
  display: "swap",
});

const stackText = localFont({
  src: "../fonts/StackSansText.woff2",
  variable: "--font-stack-text",
  weight: "200 700",
  display: "swap",
});

const geistMono = localFont({
  src: "../fonts/GeistMono.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  title: "educateU Business — Online courses and certification made simple",
  description:
    "Accredited online CPD courses for businesses, teams and individuals across the UK. Every course is £15, one-off priced, certificate included.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-GB"
      className={`${stackNotch.variable} ${stackText.variable} ${geistMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col">
        <MotionConfig reducedMotion="user">
          <LoaderProvider>
            <CartProvider>
              <Preloader />
              <SmoothScroll />
              {children}
            </CartProvider>
          </LoaderProvider>
        </MotionConfig>
      </body>
    </html>
  );
}

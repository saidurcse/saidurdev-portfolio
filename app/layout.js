import { GoogleTagManager } from "@next/third-parties/google";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/footer";
import ScrollToTop from "./components/helper/scroll-to-top";
import WhatsAppButton from "./components/helper/whatsapp-button";
import Navbar from "./components/navbar";
import SkipLink from "./components/seo/skip-link";
import {
  OrganizationSchema,
  PersonSchema,
  ProfessionalServiceSchema,
  WebsiteSchema,
} from "./components/seo/json-ld";
import { getBaseMetadata } from "@/utils/seo/metadata";
import "./css/card.scss";
import "./css/globals.scss";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
});

export const metadata = getBaseMetadata();

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0d1224",
  colorScheme: "dark",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className={inter.className} suppressHydrationWarning>
        <SkipLink />
        <PersonSchema />
        <OrganizationSchema />
        <WebsiteSchema />
        <ProfessionalServiceSchema />
        <ToastContainer />
        <header className="fixed top-0 left-0 right-0 z-[100]">
          <div className="mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem]">
            <Navbar />
          </div>
        </header>
        <main
          id="main-content"
          className="min-h-screen relative mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] text-white pt-20"
          tabIndex={-1}
        >
          {children}
          <ScrollToTop />
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM} />
    </html>
  );
}

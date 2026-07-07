import { GoogleTagManager } from "@next/third-parties/google";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/footer";
import ScrollToTop from "./components/helper/scroll-to-top";
import WhatsAppButton from "./components/helper/whatsapp-button";
import Navbar from "./components/navbar";
import "./css/card.scss";
import "./css/globals.scss";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Portfolio of Saidur - AI Engineer | Full Stack Developer | Software Architect",
  description:
    "Full Stack Developer & Architect with 15+ years of experience in AI, LLMs, RAG, cloud-native systems, scalable applications, Node.js, microservices, mobile apps, and enterprise solution architecture.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ToastContainer />
        <header className="fixed top-0 left-0 right-0 z-[100]">
          <div className="mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem]">
            <Navbar />
          </div>
        </header>
        <main className="min-h-screen relative mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] text-white pt-20">
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

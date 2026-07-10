// @flow strict

import Link from "next/link";
import { getPageMetadata } from "@/utils/seo/metadata";

export const metadata = getPageMetadata({
  title: "404 - Page Not Found",
  description:
    "The page you are looking for does not exist. Return to Saidur Rahman's portfolio homepage.",
  path: "/404",
  type: "website",
});

function page() {
  return (
    <section
      aria-labelledby="error-heading"
      className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6"
    >
      <h1 id="error-heading" className="text-6xl font-bold text-white">404</h1>
      <p className="mt-4 text-lg text-gray-300">Page Not Found</p>
      <p className="mt-2 text-gray-400 max-w-md">
        Sorry, the page you are looking for does not exist. It might have been moved or deleted.
      </p>
      <Link
        className="mt-8 flex items-center gap-1 hover:gap-3 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 px-3 md:px-8 py-3 text-center text-xs md:text-sm font-medium uppercase tracking-wider text-white no-underline transition-all duration-200 ease-out hover:text-white hover:no-underline md:font-semibold"
        href="/"
        aria-label="Go back to homepage"
      >
        Go to Home
      </Link>
    </section>
  );
};

export default page;
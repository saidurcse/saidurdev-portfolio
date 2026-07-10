import Link from "next/link";

function SkipLink() {
  return (
    <Link
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[200] focus:bg-[#16f2b3] focus:text-[#0d1224] focus:px-4 focus:py-2 focus:rounded-md focus:font-semibold"
    >
      Skip to main content
    </Link>
  );
}

export default SkipLink;

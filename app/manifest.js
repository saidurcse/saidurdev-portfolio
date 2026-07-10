import { siteConfig } from "@/utils/seo/metadata";

export default function manifest() {
  return {
    name: siteConfig.siteName,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: siteConfig.bgColor,
    theme_color: siteConfig.themeColor,
    orientation: "portrait-primary",
    scope: "/",
    lang: siteConfig.language,
    categories: ["Technology", "Developer", "Portfolio", "Software Engineering"],
    icons: [
      {
        src: "/icon-192x192.svg",
        sizes: "192x192",
        type: "image/svg+xml",
        purpose: "any maskable",
      },
      {
        src: "/icon-512x512.svg",
        sizes: "512x512",
        type: "image/svg+xml",
        purpose: "any maskable",
      },
      {
        src: "/apple-touch-icon.svg",
        sizes: "180x180",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
    shortcuts: [
      {
        name: "Projects",
        short_name: "Projects",
        description: "View Saidur Rahman's projects",
        url: "/projects",
        icons: [{ src: "/icon-192x192.svg", sizes: "192x192", type: "image/svg+xml" }],
      },
      {
        name: "Blog",
        short_name: "Blog",
        description: "Read technical articles by Saidur Rahman",
        url: "/blog",
        icons: [{ src: "/icon-192x192.svg", sizes: "192x192", type: "image/svg+xml" }],
      },
      {
        name: "Contact",
        short_name: "Contact",
        description: "Get in touch with Saidur Rahman",
        url: "/#contact",
        icons: [{ src: "/icon-192x192.svg", sizes: "192x192", type: "image/svg+xml" }],
      },
    ],
    related_applications: [],
    prefer_related_applications: false,
  };
}

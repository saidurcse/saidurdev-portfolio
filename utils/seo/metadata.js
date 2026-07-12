export const siteConfig = {
  name: "Saidur Rahman",
  fullName: "Muhammad Saidur Rahman",
  title: "Saidur Rahman - AI Engineer | Full Stack Developer | Software Architect",
  shortTitle: "Saidur Rahman",
  description:
    "Portfolio of Muhammad Saidur Rahman, a results-driven AI Engineer, Full Stack Developer & Software Architect with 15+ years of experience in AI/LLM/RAG, cloud-native systems, Node.js microservices, Android/iOS apps, and enterprise solution architecture.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.saidur.dev",
  siteName: "Saidur Rahman Portfolio",
  locale: "en_US",
  language: "en",
  country: "US",
  email: "contact@saidur.dev",
  phoneBD: "+88(0175)-444-8346",
  phoneUSA: "+1(972)-665-8418",
  address: "Dallas, Texas, USA",
  company: "SRAurora Tech",
  companyUrl: "https://www.sraurora.tech/",
  github: "https://github.com/saidurcse/",
  linkedIn: "https://www.linkedin.com/in/saidur-cse/",
  resume:
    "https://drive.google.com/file/d/1KNRzyupYNg33xrB264gHreI7TpV_y5mH/view?usp=sharing",
  devUsername: "saidurtech",
  googleVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
  bingVerification:
    process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION ||
    "B4444B0BE055D28D12338BCE402FA3AB",
  yandexVerification: process.env.NEXT_PUBLIC_YANDEX_SITE_VERIFICATION || "",
  fbAppId: process.env.NEXT_PUBLIC_FB_APP_ID || "1026016576792575",
  twitterHandle: "@saidurcse",
  authors: [{ name: "Muhammad Saidur Rahman", url: "https://www.saidur.dev" }],
  creator: "Muhammad Saidur Rahman",
  publisher: "Saidur Rahman",
  category: "Technology",
  keywords: [
    "Muhammad Saidur Rahman",
    "Saidur Rahman",
    "AI Engineer",
    "Generative AI Engineer",
    "LLM Engineer",
    "RAG Engineer",
    "AI Architect",
    "Node.js Developer",
    "Full Stack Developer",
    "Android Developer",
    "Kotlin Developer",
    "Jetpack Compose Expert",
    "Cloud Engineer",
    "Software Architect",
    "AI Consultant",
    "Prompt Engineering",
    "Enterprise AI",
    "LLM Integration",
    "RAG Development",
    "Semantic Search",
    "LangChain",
    "OpenAI",
    "Gemini",
    "Claude",
    "Vector Database",
    "ChromaDB",
    "Pinecone",
    "PostgreSQL",
    "MongoDB",
    "Redis",
    "Kafka",
    "Docker",
    "Kubernetes",
    "Next.js",
    "React",
    "TypeScript",
    "JavaScript",
    "Kotlin",
    "Software Engineer",
  ],
  themeColor: "#0d1224",
  bgColor: "#0d1224",
};

export function getBaseMetadata(overrides = {}) {
  const siteUrl = siteConfig.url;
  const ogImageUrl = `${siteUrl}/opengraph-image`;

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: siteConfig.title,
      template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    keywords: siteConfig.keywords,
    authors: siteConfig.authors,
    creator: siteConfig.creator,
    publisher: siteConfig.publisher,
    category: siteConfig.category,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: "/",
      languages: {
        "en-US": "/",
        en: "/",
      },
    },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url: siteUrl,
      siteName: siteConfig.siteName,
      title: siteConfig.title,
      description: siteConfig.description,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} portfolio preview`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: siteConfig.title,
      description: siteConfig.description,
      creator: siteConfig.twitterHandle,
      images: [ogImageUrl],
    },
    verification: {
      google: siteConfig.googleVerification || undefined,
      yandex: siteConfig.yandexVerification || undefined,
      other: siteConfig.bingVerification
        ? {
            "msvalidate.01": siteConfig.bingVerification,
          }
        : undefined,
    },
    referrer: "origin-when-cross-origin",
    metadataBase: new URL(siteUrl),
    other: siteConfig.fbAppId
      ? {
          "fb:app_id": siteConfig.fbAppId,
        }
      : undefined,
    ...overrides,
  };
}

export function getPageMetadata({
  title,
  description,
  path = "/",
  image,
  type = "website",
  publishedTime,
  modifiedTime,
  tags = [],
} = {}) {
  const siteUrl = siteConfig.url;
  const canonicalUrl = `${siteUrl}${path}`;
  const ogImageUrl = image || `${siteUrl}/opengraph-image`;

  return {
    title,
    description,
    keywords: [...siteConfig.keywords, ...tags],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type,
      locale: siteConfig.locale,
      url: canonicalUrl,
      siteName: siteConfig.siteName,
      title,
      description,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${title} - ${siteConfig.name}`,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: siteConfig.twitterHandle,
      images: [ogImageUrl],
    },
  };
}

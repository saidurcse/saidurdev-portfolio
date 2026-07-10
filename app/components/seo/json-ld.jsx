"use client";

function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default JsonLd;

export function PersonSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Muhammad Saidur Rahman",
    alternateName: "Saidur Rahman",
    url: "https://www.saidur.dev",
    image: "https://www.saidur.dev/profile.jpg",
    jobTitle: "AI Engineer | Full Stack Developer | Software Architect",
    description:
      "Results-driven Full Stack Developer & Architect with 15+ years of experience in AI/LLM/RAG, cloud-native systems, Node.js microservices, and enterprise architecture.",
    worksFor: {
      "@type": "Organization",
      name: "SRAurora Tech",
      url: "https://www.sraurora.tech/",
    },
    sameAs: [
      "https://www.linkedin.com/in/saidur-cse/",
      "https://github.com/saidurcse/",
      "https://dev.to/saidurtech",
      "https://www.sraurora.tech/",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dallas",
      addressRegion: "Texas",
      addressCountry: "US",
    },
    knowsAbout: [
      "Artificial Intelligence",
      "Generative AI",
      "Large Language Models",
      "RAG Architecture",
      "Node.js",
      "TypeScript",
      "Kotlin",
      "Android Development",
      "iOS Development",
      "Microservices",
      "Cloud Architecture",
      "Docker",
      "Kubernetes",
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "Kafka",
    ],
    alumniOf: [
      {
        "@type": "Organization",
        name: "Samsung R&D Institute Bangladesh Ltd",
      },
      {
        "@type": "Organization",
        name: "Bista Solutions Inc",
      },
      {
        "@type": "Organization",
        name: "Techleap Systems Inc",
      },
    ],
  };
  return <JsonLd data={data} />;
}

export function OrganizationSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SRAurora Tech",
    url: "https://www.sraurora.tech/",
    logo: "https://www.saidur.dev/icon-512x512.svg",
    sameAs: [
      "https://www.linkedin.com/company/sraurora-tech",
      "https://www.sraurora.tech/",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: "info@sraurora.tech",
      contactType: "Customer Support",
      availableLanguage: ["English"],
    },
  };
  return <JsonLd data={data} />;
}

export function WebsiteSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Saidur Rahman Portfolio",
    url: "https://www.saidur.dev",
    description:
      "Portfolio of Muhammad Saidur Rahman, AI Engineer, Full Stack Developer & Software Architect.",
    author: {
      "@type": "Person",
      name: "Muhammad Saidur Rahman",
      url: "https://www.saidur.dev",
    },
    publisher: {
      "@type": "Person",
      name: "Muhammad Saidur Rahman",
      url: "https://www.saidur.dev",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://www.saidur.dev/blog?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };
  return <JsonLd data={data} />;
}

export function WebPageSchema({ title, description, url, image }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    url,
    description,
    image,
    author: {
      "@type": "Person",
      name: "Muhammad Saidur Rahman",
      url: "https://www.saidur.dev",
    },
    publisher: {
      "@type": "Person",
      name: "Muhammad Saidur Rahman",
      url: "https://www.saidur.dev",
    },
    inLanguage: "en-US",
    isPartOf: {
      "@type": "WebSite",
      url: "https://www.saidur.dev",
    },
  };
  return <JsonLd data={data} />;
}

export function BreadcrumbSchema({ items }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
  return <JsonLd data={data} />;
}

export function ProjectSchema({ project }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: project.name,
    description: project.description,
    programmingLanguage: project.tools?.slice(0, 6).join(", ") || "Various",
    author: {
      "@type": "Person",
      name: "Muhammad Saidur Rahman",
      url: "https://www.saidur.dev",
    },
    ...(project.code ? { codeRepository: project.code } : {}),
    ...(project.demo ? { url: project.demo } : {}),
  };
  return <JsonLd data={data} />;
}

export function BlogPostingSchema({ blog }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.description,
    image: blog.cover_image,
    url: blog.url,
    datePublished: blog.published_at,
    dateModified: blog.edited_at || blog.published_at,
    author: {
      "@type": "Person",
      name: blog.user?.name || "Muhammad Saidur Rahman",
      url: blog.user?.website_url || "https://www.saidur.dev",
    },
    publisher: {
      "@type": "Person",
      name: "Muhammad Saidur Rahman",
      url: "https://www.saidur.dev",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": blog.url,
    },
    keywords: blog.tag_list?.join(", ") || "",
  };
  return <JsonLd data={data} />;
}

export function ProfessionalServiceSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Saidur Rahman - AI & Full Stack Consulting",
    url: "https://www.saidur.dev",
    logo: "https://www.saidur.dev/icon-512x512.svg",
    image: "https://www.saidur.dev/profile.jpg",
    description:
      "Enterprise AI/LLM/RAG consulting, full-stack architecture, Node.js microservices, Android/iOS development, and cloud-native solutions.",
    provider: {
      "@type": "Person",
      name: "Muhammad Saidur Rahman",
      url: "https://www.saidur.dev",
    },
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dallas",
      addressRegion: "Texas",
      addressCountry: "US",
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: "contact@saidur.dev",
      telephone: "+1-972-665-8418",
      contactType: "Consulting Inquiry",
      availableLanguage: ["English"],
    },
    serviceType: [
      "AI Engineering",
      "LLM Integration",
      "RAG Architecture",
      "Full Stack Development",
      "Mobile App Development",
      "Cloud Architecture",
    ],
  };
  return <JsonLd data={data} />;
}

export function ContactPageSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Saidur Rahman",
    url: "https://www.saidur.dev/#contact",
    description:
      "Get in touch with Muhammad Saidur Rahman for AI engineering, full-stack development, and software architecture consulting.",
    mainEntity: {
      "@type": "Person",
      name: "Muhammad Saidur Rahman",
      email: "contact@saidur.dev",
      telephone: "+1-972-665-8418",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Dallas",
        addressRegion: "Texas",
        addressCountry: "US",
      },
    },
  };
  return <JsonLd data={data} />;
}

export function FAQSchema({ faqs }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
  return <JsonLd data={data} />;
}

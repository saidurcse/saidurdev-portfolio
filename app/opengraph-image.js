import { ImageResponse } from "next/og";
import { siteConfig } from "@/utils/seo/metadata";

export const alt = `${siteConfig.name} - AI Engineer | Full Stack Developer | Software Architect`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0d1224 0%, #1a1443 60%, #0a0d37 100%)",
          padding: "80px",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "20px",
              background: "linear-gradient(135deg, #16f2b3, #0d9488)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#0d1224",
              fontSize: "36px",
              fontWeight: 700,
            }}
          >
            SR
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontSize: "48px",
                fontWeight: 800,
                backgroundImage: "linear-gradient(90deg, #ffffff, #16f2b3)",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              {siteConfig.name}
            </span>
            <span style={{ fontSize: "24px", color: "#a5b4fc", marginTop: "8px" }}>
              {siteConfig.company}
            </span>
          </div>
        </div>
        <div
          style={{
            fontSize: "36px",
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1.3,
            maxWidth: "900px",
          }}
        >
          AI Engineer | Full Stack Developer | Software Architect
        </div>
        <div
          style={{
            fontSize: "24px",
            color: "#94a3b8",
            marginTop: "24px",
            maxWidth: "900px",
            lineHeight: 1.4,
          }}
        >
          15+ years building enterprise AI/LLM/RAG systems, cloud-native microservices, and scalable mobile & web applications.
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            right: "60px",
            display: "flex",
            gap: "16px",
          }}
        >
          {["AI", "LLM", "RAG", "Node.js", "Kotlin", "Next.js"].map((tag) => (
            <span
              key={tag}
              style={{
                background: "rgba(22, 242, 179, 0.12)",
                color: "#16f2b3",
                padding: "10px 18px",
                borderRadius: "999px",
                fontSize: "18px",
                fontWeight: 600,
                border: "1px solid rgba(22, 242, 179, 0.3)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0d1224 0%, #1a1443 100%)",
          borderRadius: "6px",
          border: "1px solid #16f2b3",
        }}
      >
        <span
          style={{
            color: "#16f2b3",
            fontSize: "18px",
            fontWeight: 700,
            fontFamily: "sans-serif",
          }}
        >
          SR
        </span>
      </div>
    ),
    {
      ...size,
    }
  );
}

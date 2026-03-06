import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const runtime = "edge";
export const alt = `${siteConfig.name} portfolio`;
export const size = {
  width: 1200,
  height: 630
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          background: "#0A0B0F",
          color: "#E8EAED",
          padding: "56px",
          alignItems: "stretch"
        }}
      >
        <div
          style={{
            border: "1px solid #2D313A",
            borderRadius: "24px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "64px",
            width: "100%",
            background: "linear-gradient(120deg, #101722 0%, #11111F 100%)"
          }}
        >
          <div style={{ color: "#5EEAD4", fontSize: 28, fontFamily: "monospace" }}>~/portfolio</div>
          <div style={{ marginTop: 24, fontSize: 72, fontWeight: 700 }}>{siteConfig.name}</div>
          <div style={{ marginTop: 16, fontSize: 32, color: "#9099A8" }}>
            Software Engineer
          </div>
        </div>
      </div>
    ),
    {
      ...size
    }
  );
}

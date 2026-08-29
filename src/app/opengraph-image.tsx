import { ImageResponse } from "next/og";

export const alt = "Vaibhav Katariya | Developer Portfolio";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#ffffff",
          color: "#111111",
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
          }}
        >
          Vaibhav Katariya
        </div>

        <div
          style={{
            marginTop: 24,
            fontSize: 36,
            color: "#555555",
          }}
        >
          Developer Portfolio
        </div>

        <div
          style={{
            marginTop: 40,
            fontSize: 28,
            color: "#777777",
          }}
        >
          vaibhavkatariya.in
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
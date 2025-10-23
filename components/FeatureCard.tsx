"use client";

export default function FeatureCard({
  step,
  title,
  description
}: {
  step: string;
  title: string;
  description: string;
}) {
  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        padding: "32px",
        borderRadius: "16px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
        border: "1px solid #f1f5f9",
        transition: "all 0.2s ease",
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.12)";
        e.currentTarget.style.transform = "translateY(-4px)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.06)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <div
        style={{
          width: "48px",
          height: "48px",
          borderRadius: "12px",
          backgroundColor: "#eff6ff",
          color: "#2563eb",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "24px",
          fontWeight: "700",
          marginBottom: "20px",
        }}
      >
        {step}
      </div>
      <h3
        style={{
          fontSize: "20px",
          fontWeight: "600",
          color: "#1e293b",
          marginBottom: "12px",
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontSize: "16px",
          color: "#64748b",
          lineHeight: "1.6",
        }}
      >
        {description}
      </p>
    </div>
  );
}

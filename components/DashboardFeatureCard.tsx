"use client";

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  status: string;
}

export default function DashboardFeatureCard({
  icon,
  title,
  description,
  status
}: FeatureCardProps) {
  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        padding: "32px",
        borderRadius: "16px",
        border: "1px solid #e2e8f0",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.04)",
        transition: "all 0.2s ease",
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.08)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.04)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <div style={{ fontSize: "40px", marginBottom: "16px" }}>
        {icon}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "12px",
        }}
      >
        <h3
          style={{
            fontSize: "20px",
            fontWeight: "700",
            color: "#1e293b",
            margin: 0,
          }}
        >
          {title}
        </h3>
        <span
          style={{
            fontSize: "12px",
            fontWeight: "600",
            color: status === "Ready" ? "#10b981" : "#94a3b8",
            backgroundColor: status === "Ready" ? "#ecfdf5" : "#f1f5f9",
            padding: "4px 10px",
            borderRadius: "12px",
          }}
        >
          {status}
        </span>
      </div>
      <p
        style={{
          fontSize: "15px",
          color: "#64748b",
          lineHeight: "1.6",
          margin: 0,
        }}
      >
        {description}
      </p>
    </div>
  );
}

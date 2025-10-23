"use client";

import Link from "next/link";

export default function DashboardLinkButton() {
  return (
    <Link href="/dashboard">
      <button
        style={{
          width: "100%",
          padding: "16px",
          fontSize: "16px",
          fontWeight: "600",
          backgroundColor: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "12px",
          cursor: "pointer",
          transition: "all 0.2s ease",
          boxShadow: "0 4px 12px rgba(37, 99, 235, 0.3)",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = "#1d4ed8";
          e.currentTarget.style.boxShadow = "0 6px 16px rgba(37, 99, 235, 0.4)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = "#2563eb";
          e.currentTarget.style.boxShadow = "0 4px 12px rgba(37, 99, 235, 0.3)";
        }}
      >
        Go to Dashboard
      </button>
    </Link>
  );
}

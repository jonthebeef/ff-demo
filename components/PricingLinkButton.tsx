"use client";

import Link from "next/link";

export default function PricingLinkButton() {
  return (
    <Link href="/upgrade">
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
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = "#1d4ed8";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = "#2563eb";
        }}
      >
        Subscribe and Start Building
      </button>
    </Link>
  );
}

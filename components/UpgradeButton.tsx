"use client";

import { useState } from "react";

export default function UpgradeButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpgrade = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/checkout", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleUpgrade}
        disabled={loading}
        style={{
          width: "100%",
          padding: "16px",
          fontSize: "16px",
          fontWeight: "600",
          backgroundColor: loading ? "#94a3b8" : "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "12px",
          cursor: loading ? "not-allowed" : "pointer",
          transition: "all 0.2s ease",
          boxShadow: loading ? "none" : "0 4px 12px rgba(37, 99, 235, 0.3)",
        }}
        onMouseOver={(e) => {
          if (!loading) {
            e.currentTarget.style.backgroundColor = "#1d4ed8";
            e.currentTarget.style.boxShadow = "0 6px 16px rgba(37, 99, 235, 0.4)";
          }
        }}
        onMouseOut={(e) => {
          if (!loading) {
            e.currentTarget.style.backgroundColor = "#2563eb";
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(37, 99, 235, 0.3)";
          }
        }}
      >
        {loading ? "Processing..." : "Subscribe and Start Building"}
      </button>
      {error && (
        <p
          style={{
            color: "#ef4444",
            marginTop: "12px",
            fontSize: "14px",
            textAlign: "center",
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
}

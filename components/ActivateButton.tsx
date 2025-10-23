"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ActivateButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleActivate = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/mock/activate", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to activate access");
      }

      // Refresh the page to update the auth state
      router.refresh();
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleActivate}
        disabled={loading}
        style={{
          padding: "12px 24px",
          fontSize: "14px",
          backgroundColor: loading ? "#94a3b8" : "#64748b",
          color: "white",
          border: "1px solid #cbd5e1",
          borderRadius: "8px",
          cursor: loading ? "not-allowed" : "pointer",
          fontWeight: "600",
          transition: "all 0.2s ease",
        }}
        onMouseOver={(e) => {
          if (!loading) {
            e.currentTarget.style.backgroundColor = "#475569";
          }
        }}
        onMouseOut={(e) => {
          if (!loading) {
            e.currentTarget.style.backgroundColor = "#64748b";
          }
        }}
      >
        {loading ? "Activating..." : "Manual Activation"}
      </button>
      {error && (
        <p
          style={{
            color: "#ef4444",
            marginTop: "12px",
            fontSize: "13px",
            textAlign: "center",
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
}

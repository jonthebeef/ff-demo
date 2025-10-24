"use client";

import { SignInButton } from "@clerk/nextjs";

export default function NavSignIn() {
  return (
    <SignInButton mode="modal">
      <button
        style={{
          padding: "8px 16px",
          fontSize: "14px",
          fontWeight: "600",
          backgroundColor: "transparent",
          color: "#2563eb",
          border: "1px solid #2563eb",
          borderRadius: "8px",
          cursor: "pointer",
          transition: "all 0.2s ease",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = "#2563eb";
          e.currentTarget.style.color = "#ffffff";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = "transparent";
          e.currentTarget.style.color = "#2563eb";
        }}
      >
        Sign in
      </button>
    </SignInButton>
  );
}

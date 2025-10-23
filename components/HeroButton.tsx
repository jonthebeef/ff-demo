"use client";

export default function HeroButton({ children, href }: { children: React.ReactNode; href?: string }) {
  const buttonStyle = {
    padding: "18px 48px",
    fontSize: "18px",
    fontWeight: "600",
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(37, 99, 235, 0.3)",
    transition: "all 0.2s ease",
  };

  return (
    <button
      style={buttonStyle}
      onMouseOver={(e) => {
        e.currentTarget.style.backgroundColor = "#1d4ed8";
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 6px 16px rgba(37, 99, 235, 0.4)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.backgroundColor = "#2563eb";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(37, 99, 235, 0.3)";
      }}
    >
      {children}
    </button>
  );
}

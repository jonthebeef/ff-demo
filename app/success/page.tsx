import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import ActivateButton from "@/components/ActivateButton";
import DashboardLinkButton from "@/components/DashboardLinkButton";
import { UserButton } from "@clerk/nextjs";

export default async function SuccessPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#ffffff",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      {/* Navigation */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 40px",
          borderBottom: "1px solid #f1f5f9",
        }}
      >
        <div style={{ fontSize: "20px", fontWeight: "700", color: "#1e293b" }}>
          Founder Focus
        </div>
        <UserButton />
      </nav>

      {/* Main Content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 20px",
        }}
      >
        <div
          style={{
            maxWidth: "600px",
            width: "100%",
            backgroundColor: "white",
            padding: "60px",
            borderRadius: "20px",
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
            border: "1px solid #f1f5f9",
            textAlign: "center",
          }}
        >
          {/* Success Icon */}
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              backgroundColor: "#ecfdf5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 32px",
            }}
          >
            <span style={{ fontSize: "48px", color: "#10b981" }}>✓</span>
          </div>

          <h1
            style={{
              fontSize: "36px",
              fontWeight: "800",
              color: "#1e293b",
              marginBottom: "16px",
              letterSpacing: "-0.02em",
            }}
          >
            You're in!
          </h1>

          <p
            style={{
              fontSize: "20px",
              color: "#64748b",
              marginBottom: "40px",
              lineHeight: "1.6",
            }}
          >
            Let's bring your startup into focus.
          </p>

          <div
            style={{
              backgroundColor: "#f8fafc",
              padding: "24px",
              borderRadius: "12px",
              marginBottom: "32px",
              border: "1px solid #e2e8f0",
            }}
          >
            <p
              style={{
                fontSize: "15px",
                color: "#475569",
                lineHeight: "1.6",
                margin: 0,
              }}
            >
              Your payment has been processed and your account is now active.
              Start prioritizing your tasks and focus on what really moves the needle.
            </p>
          </div>

          <DashboardLinkButton />

          {/* Fallback Activation */}
          <div
            style={{
              marginTop: "40px",
              paddingTop: "32px",
              borderTop: "1px solid #e2e8f0",
            }}
          >
            <p
              style={{
                fontSize: "13px",
                color: "#94a3b8",
                marginBottom: "12px",
              }}
            >
              If you can't access the dashboard immediately, click below:
            </p>
            <ActivateButton />
          </div>
        </div>
      </div>
    </div>
  );
}

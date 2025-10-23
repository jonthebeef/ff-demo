import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { isUserPaid } from "@/lib/clerk";
import UpgradeButton from "@/components/UpgradeButton";
import { UserButton } from "@clerk/nextjs";

export default async function UpgradePage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  const isPaid = await isUserPaid(userId);

  if (isPaid) {
    redirect("/dashboard");
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
        <div style={{ maxWidth: "600px", width: "100%", textAlign: "center" }}>
          <h1
            style={{
              fontSize: "42px",
              fontWeight: "800",
              color: "#1e293b",
              marginBottom: "16px",
              letterSpacing: "-0.02em",
            }}
          >
            Welcome to your new command centre
          </h1>
          <p
            style={{
              fontSize: "18px",
              color: "#64748b",
              marginBottom: "60px",
              lineHeight: "1.6",
            }}
          >
            Let's make your first startup to-do list
          </p>

          {/* Pricing Card */}
          <div
            style={{
              backgroundColor: "#ffffff",
              padding: "48px",
              borderRadius: "20px",
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
              border: "2px solid #2563eb",
              textAlign: "center",
            }}
          >
            <h2
              style={{
                fontSize: "28px",
                fontWeight: "700",
                color: "#1e293b",
                marginBottom: "24px",
              }}
            >
              One simple plan — everything you need
            </h2>
            <div
              style={{
                fontSize: "56px",
                fontWeight: "800",
                color: "#1e293b",
                marginBottom: "8px",
              }}
            >
              £10
              <span
                style={{
                  fontSize: "20px",
                  fontWeight: "500",
                  color: "#64748b",
                }}
              >
                /month
              </span>
            </div>
            <p
              style={{
                fontSize: "14px",
                color: "#94a3b8",
                marginBottom: "32px",
              }}
            >
              No hidden fees. Cancel anytime.
            </p>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: "0 0 32px 0",
                textAlign: "left",
              }}
            >
              {[
                "Unlimited tasks",
                "AI-powered prioritisation",
                "Personal data privacy",
                "Priority access to new features",
              ].map((feature) => (
                <li
                  key={feature}
                  style={{
                    fontSize: "16px",
                    color: "#475569",
                    marginBottom: "12px",
                    paddingLeft: "28px",
                    position: "relative",
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      left: "0",
                      color: "#2563eb",
                      fontWeight: "700",
                    }}
                  >
                    ✓
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
            <UpgradeButton />

            {/* Stripe Badge */}
            <div
              style={{
                marginTop: "24px",
                paddingTop: "24px",
                borderTop: "1px solid #f1f5f9",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                fontSize: "13px",
                color: "#94a3b8",
              }}
            >
              <span style={{ fontSize: "16px" }}>🔒</span>
              <span>Secured by Stripe</span>
            </div>

            <p style={{ fontSize: "12px", color: "#cbd5e1", marginTop: "16px" }}>
              Test card: 4242 4242 4242 4242
            </p>
          </div>

          {/* Trust Message */}
          <p
            style={{
              marginTop: "40px",
              fontSize: "16px",
              color: "#64748b",
              lineHeight: "1.6",
            }}
          >
            Stop guessing what to work on next. Let AI prioritise your startup to-do list so you can launch faster.
          </p>
        </div>
      </div>
    </div>
  );
}

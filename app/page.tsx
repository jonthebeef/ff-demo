import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import SignInButtonWrapper from "@/components/SignInButtonWrapper";
import NavSignIn from "@/components/NavSignIn";
import LinkButton from "@/components/LinkButton";
import FeatureCard from "@/components/FeatureCard";
import PricingSignInButton from "@/components/PricingSignInButton";
import PricingLinkButton from "@/components/PricingLinkButton";
import FloatingBalls from "@/components/FloatingBalls";

export default function LandingPage() {
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
        <div>
          <SignedOut>
            <NavSignIn />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        style={{
          position: "relative",
          width: "100%",
          padding: "80px 0",
          textAlign: "center",
          overflow: "hidden",
        }}
      >
        <FloatingBalls />

        <div style={{ position: "relative", zIndex: 1, maxWidth: "1200px", margin: "0 auto", padding: "0 40px" }}>
          <h1
            style={{
              fontSize: "64px",
              fontWeight: "800",
              color: "#1e293b",
              lineHeight: "1.1",
              marginBottom: "24px",
              letterSpacing: "-0.02em",
            }}
          >
            Turn your startup chaos
            <br />
            into clear, confident action
          </h1>
          <p
            style={{
              fontSize: "22px",
              color: "#64748b",
              marginBottom: "40px",
              maxWidth: "700px",
              margin: "0 auto 40px",
              lineHeight: "1.6",
            }}
          >
            Stop guessing what to work on next. Let AI prioritise your startup to-do list so you can launch faster.
          </p>

          <SignedOut>
            <SignInButtonWrapper />
            <p
              style={{
                marginTop: "16px",
                fontSize: "14px",
                color: "#94a3b8",
              }}
            >
              £10/month — cancel any time
            </p>
          </SignedOut>

          <SignedIn>
            <LinkButton href="/dashboard">Open my tasks</LinkButton>
            <p
              style={{
                marginTop: "16px",
                fontSize: "14px",
                color: "#94a3b8",
              }}
            >
              Access your task list
            </p>
          </SignedIn>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        style={{
          maxWidth: "1200px",
          margin: "80px auto",
          padding: "0 40px",
        }}
      >
        <h2
          style={{
            fontSize: "36px",
            fontWeight: "700",
            color: "#1e293b",
            textAlign: "center",
            marginBottom: "60px",
          }}
        >
          How it works
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "40px",
          }}
        >
          <FeatureCard
            step="1"
            title="Add your startup tasks"
            description="List everything on your plate — big ideas, tiny fixes, or vague maybes."
          />
          <FeatureCard
            step="2"
            title="Click 'Reorder with AI'"
            description="Our AI instantly sorts your chaos by impact, urgency, and dependency."
          />
          <FeatureCard
            step="3"
            title="Focus on what moves the needle"
            description="Work down your list knowing you're building what matters most, right now."
          />
        </div>
      </section>

      {/* Social Proof */}
      <section
        style={{
          maxWidth: "900px",
          margin: "80px auto",
          padding: "0 40px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: "18px",
            color: "#64748b",
            fontWeight: "600",
            marginBottom: "40px",
          }}
        >
          Built by founders for founders
        </p>
        <div
          style={{
            backgroundColor: "#f8fafc",
            padding: "40px",
            borderRadius: "16px",
            border: "1px solid #e2e8f0",
          }}
        >
          <p
            style={{
              fontSize: "18px",
              color: "#475569",
              lineHeight: "1.8",
              fontStyle: "italic",
            }}
          >
            "Too many ideas? We'll help you decide what matters."
          </p>
        </div>
      </section>

      {/* Pricing */}
      <section
        style={{
          maxWidth: "500px",
          margin: "80px auto 120px",
          padding: "0 40px",
        }}
      >
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
          <h3
            style={{
              fontSize: "28px",
              fontWeight: "700",
              color: "#1e293b",
              marginBottom: "24px",
            }}
          >
            One simple plan
          </h3>
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
          <SignedOut>
            <PricingSignInButton />
          </SignedOut>
          <SignedIn>
            <PricingLinkButton />
          </SignedIn>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          borderTop: "1px solid #e2e8f0",
          padding: "40px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: "14px",
            color: "#94a3b8",
          }}
        >
          Terms · Privacy · Contact: hello@founderfocus.com
        </p>
      </footer>
    </div>
  );
}

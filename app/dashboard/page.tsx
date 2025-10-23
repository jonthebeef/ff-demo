import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { isUserPaid } from "@/lib/clerk";
import { UserButton } from "@clerk/nextjs";
import TaskManager from "@/components/TaskManager";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  const isPaid = await isUserPaid(userId);

  if (!isPaid) {
    redirect("/upgrade");
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      {/* Navigation */}
      <nav
        style={{
          backgroundColor: "#ffffff",
          borderBottom: "1px solid #e2e8f0",
          padding: "20px 40px",
        }}
      >
        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ fontSize: "20px", fontWeight: "700", color: "#1e293b" }}>
            Founder Focus
          </div>
          <UserButton />
        </div>
      </nav>

      {/* Main Content */}
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "40px 20px",
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: "32px", textAlign: "center" }}>
          <h1
            style={{
              fontSize: "32px",
              fontWeight: "800",
              color: "#1e293b",
              marginBottom: "8px",
              letterSpacing: "-0.02em",
            }}
          >
            Turn chaos into clear action
          </h1>
          <p style={{ fontSize: "16px", color: "#64748b" }}>
            Your startup task list — prioritized, focused, unstoppable
          </p>
        </div>

        {/* Task Manager */}
        <TaskManager />
      </div>
    </div>
  );
}

import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { markUserAsPaid } from "@/lib/clerk";

export async function POST() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await markUserAsPaid(userId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Mock activate error:", error);
    return NextResponse.json(
      { error: "Failed to activate user" },
      { status: 500 }
    );
  }
}

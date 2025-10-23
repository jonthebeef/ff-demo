import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Founder Focus - Turn startup chaos into clear action",
  description: "Stop guessing what to work on next. Let AI prioritise your startup to-do list so you can launch faster.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
            rel="stylesheet"
          />
        </head>
        <body
          style={{
            margin: 0,
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            backgroundColor: "#ffffff",
            color: "#1e293b",
          }}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}

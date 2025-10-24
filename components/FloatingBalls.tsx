"use client";

import { useEffect, useState } from "react";

interface Ball {
  id: number;
  size: number;
  color: string;
  startX: number;
  startY: number;
  duration: number;
  delay: number;
}

export default function FloatingBalls() {
  const [balls, setBalls] = useState<Ball[]>([]);

  useEffect(() => {
    const colors = [
      "rgba(37, 99, 235, 0.2)",   // Blue
      "rgba(168, 85, 247, 0.2)",  // Purple
      "rgba(236, 72, 153, 0.2)",  // Pink
      "rgba(59, 130, 246, 0.2)",  // Light Blue
      "rgba(139, 92, 246, 0.2)",  // Violet
      "rgba(244, 63, 94, 0.2)",   // Rose
    ];

    const generatedBalls: Ball[] = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      size: Math.random() * 250 + 150, // 150-400px
      color: colors[i % colors.length],
      startX: (i / 5) * 100 + Math.random() * 5 - 2.5, // 0% to 100%, evenly distributed
      startY: Math.random() * 100, // 0% to 100%
      duration: Math.random() * 15 + 20, // 20-35s
      delay: Math.random() * 8,
    }));

    setBalls(generatedBalls);
  }, []);

  return (
    <>
      <style>
        {balls.map((ball) => `
          @keyframes float-horizontal-${ball.id} {
            0% {
              transform: translateX(0) translateY(0) scale(1);
              opacity: 0.8;
            }
            33% {
              transform: translateX(-30px) translateY(-40px) scale(1.05);
              opacity: 0.9;
            }
            66% {
              transform: translateX(30px) translateY(-20px) scale(1.1);
              opacity: 1;
            }
            100% {
              transform: translateX(0) translateY(0) scale(1);
              opacity: 0.8;
            }
          }
        `).join('\n')}
      </style>

      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "100vw",
          height: "100%",
          overflow: "hidden",
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        {balls.map((ball) => (
          <div
            key={ball.id}
            style={{
              position: "absolute",
              width: `${ball.size}px`,
              height: `${ball.size}px`,
              borderRadius: "50%",
              background: `radial-gradient(circle at 30% 30%, ${ball.color.replace("0.2", "0.35")}, ${ball.color})`,
              backdropFilter: "blur(60px)",
              boxShadow: `
                inset 0 0 80px rgba(255, 255, 255, 0.15),
                0 15px 50px ${ball.color.replace("0.2", "0.3")},
                0 30px 80px ${ball.color.replace("0.2", "0.15")}
              `,
              left: `${ball.startX}%`,
              top: `${ball.startY}%`,
              animation: `float-horizontal-${ball.id} ${ball.duration}s ease-in-out infinite`,
              animationDelay: `${ball.delay}s`,
              filter: "blur(1px)",
            }}
          />
        ))}
      </div>
    </>
  );
}

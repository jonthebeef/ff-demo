"use client";

import { useEffect, useState } from "react";

// Configuration constants
const BALL_CONFIG = {
  COUNT: 6,
  MIN_SIZE: 150,
  MAX_SIZE: 400,
  MIN_DURATION: 20,
  MAX_DURATION: 35,
  MAX_DELAY: 8,
  BLUR_BACKDROP: "60px",
  BLUR_FILTER: "1px",
} as const;

// Color definitions with separate RGB values for easy manipulation
const BALL_COLORS = [
  { r: 37, g: 99, b: 235, name: "Blue" },
  { r: 168, g: 85, b: 247, name: "Purple" },
  { r: 236, g: 72, b: 153, name: "Pink" },
  { r: 59, g: 130, b: 246, name: "Light Blue" },
  { r: 139, g: 92, b: 246, name: "Violet" },
  { r: 244, g: 63, b: 94, name: "Rose" },
] as const;

interface Ball {
  id: number;
  size: number;
  color: { r: number; g: number; b: number };
  startX: number;
  startY: number;
  duration: number;
  delay: number;
}

export default function FloatingBalls() {
  const [balls, setBalls] = useState<Ball[]>([]);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    // Generate balls
    const generatedBalls: Ball[] = Array.from({ length: BALL_CONFIG.COUNT }, (_, i) => ({
      id: i,
      size: Math.random() * (BALL_CONFIG.MAX_SIZE - BALL_CONFIG.MIN_SIZE) + BALL_CONFIG.MIN_SIZE,
      color: BALL_COLORS[i % BALL_COLORS.length],
      startX: (i / (BALL_CONFIG.COUNT - 1)) * 100 + Math.random() * 5 - 2.5,
      startY: Math.random() * 100,
      duration: Math.random() * (BALL_CONFIG.MAX_DURATION - BALL_CONFIG.MIN_DURATION) + BALL_CONFIG.MIN_DURATION,
      delay: Math.random() * BALL_CONFIG.MAX_DELAY,
    }));

    setBalls(generatedBalls);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  // Helper function to create rgba color string
  const rgba = (color: { r: number; g: number; b: number }, alpha: number) =>
    `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`;

  return (
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
            background: `radial-gradient(circle at 30% 30%, ${rgba(ball.color, 0.35)}, ${rgba(ball.color, 0.2)})`,
            backdropFilter: `blur(${BALL_CONFIG.BLUR_BACKDROP})`,
            boxShadow: `
              inset 0 0 80px rgba(255, 255, 255, 0.15),
              0 15px 50px ${rgba(ball.color, 0.3)},
              0 30px 80px ${rgba(ball.color, 0.15)}
            `,
            left: `${ball.startX}%`,
            top: `${ball.startY}%`,
            filter: `blur(${BALL_CONFIG.BLUR_FILTER})`,
            willChange: "transform, opacity",
            // Use CSS custom properties for animation values
            // @ts-ignore - CSS custom properties
            "--translate-x-1": "-30px",
            "--translate-y-1": "-40px",
            "--scale-1": "1.05",
            "--opacity-1": "0.9",
            "--translate-x-2": "30px",
            "--translate-y-2": "-20px",
            "--scale-2": "1.1",
            "--opacity-2": "1",
            animation: prefersReducedMotion
              ? "none"
              : `floatBall ${ball.duration}s ease-in-out infinite`,
            animationDelay: prefersReducedMotion ? "0s" : `${ball.delay}s`,
          }}
        />
      ))}

      {/* Static keyframe animation - no dynamic generation */}
      <style jsx>{`
        @keyframes floatBall {
          0% {
            transform: translateX(0) translateY(0) scale(1);
            opacity: 0.8;
          }
          33% {
            transform: translateX(var(--translate-x-1, -30px))
              translateY(var(--translate-y-1, -40px))
              scale(var(--scale-1, 1.05));
            opacity: var(--opacity-1, 0.9);
          }
          66% {
            transform: translateX(var(--translate-x-2, 30px))
              translateY(var(--translate-y-2, -20px))
              scale(var(--scale-2, 1.1));
            opacity: var(--opacity-2, 1);
          }
          100% {
            transform: translateX(0) translateY(0) scale(1);
            opacity: 0.8;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          @keyframes floatBall {
            0%,
            100% {
              transform: translateX(0) translateY(0) scale(1);
              opacity: 0.8;
            }
          }
        }
      `}</style>
    </div>
  );
}

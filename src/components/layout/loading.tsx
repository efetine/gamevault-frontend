"use client";

import { Heart } from "lucide-react";
import { useEffect, useState } from "react";

export function Loading({
  initialHealth = 0,
  maxHealth = 10,
}: {
  initialHealth?: number;
  maxHealth?: number;
}) {
  const [health, setHealth] = useState(initialHealth);
  const [isLow, setIsLow] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setHealth((prevHealth) => {
        if (health === 10) return 0;

        return prevHealth + 1;
      });
    }, 500);

    return () => clearInterval(interval);
  }, [maxHealth]);

  useEffect(() => {
    setIsLow(health <= maxHealth * 0.2);
  }, [health, maxHealth]);

  const hearts = Math.ceil(maxHealth / 2);

  return (
    <div className="flex w-full flex-1 items-center justify-center">
      <div className="inline-block rounded-lg bg-gray-800 p-4 shadow-lg">
        <div className="flex space-x-1">
          {[...Array(hearts)].map((_, i) => {
            const isFull = health >= (i + 1) * 2;
            const isHalf = health === i * 2 + 1;
            return (
              <Heart
                key={i}
                className={`h-8 w-8 ${
                  isFull
                    ? "text-red-600"
                    : isHalf
                      ? "text-red-600"
                      : "text-gray-800"
                } ${isLow ? "animate-pulse" : ""}`}
                fill={isFull ? "currentColor" : isHalf ? "url(#half)" : "none"}
                strokeWidth={2}
              />
            );
          })}
        </div>
        <svg width="0" height="0">
          <defs>
            <linearGradient id="half" x1="0" x2="100%" y1="0" y2="0">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="transparent" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

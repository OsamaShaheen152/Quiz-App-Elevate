"use client";
import React, { useState, useEffect } from "react";

interface QuizTimerProps {
  initialMinutes: number;
  onTimeUp: () => void;
}

export function QuizTimer({ initialMinutes, onTimeUp }: QuizTimerProps) {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60); // Convert to seconds
  const totalTime = initialMinutes * 60;

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formatTime = (time: number) => time.toString().padStart(2, "0");

  // Calculate progress percentage (reverse for countdown)
  const progress = ((totalTime - timeLeft) / totalTime) * 100;
  const circumference = 2 * Math.PI * 45; // radius = 45
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  // Get color based on remaining time percentage
  const getTimerColor = () => {
    const percentage = (timeLeft / totalTime) * 100;
    if (percentage <= 10) return "#ef4444"; // red-500
    if (percentage <= 25) return "#f97316"; // orange-500
    return "#3b82f6"; // blue-500
  };

  return (
    <div className="relative flex items-center justify-center">
      {/* SVG Circle Progress */}
      <svg
        className="-rotate-90 transform"
        width="120"
        height="120"
        viewBox="0 0 100 100"
      >
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="#e5e7eb"
          strokeWidth="8"
          fill="transparent"
          className="opacity-20"
        />

        {/* Progress circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke={getTimerColor()}
          strokeWidth="8"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-linear"
        />
      </svg>

      {/* Timer Text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="font-mono text-2xl font-bold text-gray-800">
            {formatTime(minutes)}:{formatTime(seconds)}
          </div>
        </div>
      </div>
    </div>
  );
}

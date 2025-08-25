"use client";

import React, { useState, useEffect } from "react";

interface QuizTimerProps {
  initialMinutes: number;
  onTimeUp: () => void;
}

export function QuizTimer({ initialMinutes, onTimeUp }: QuizTimerProps) {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60); // Convert to seconds

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

  // Get color based on remaining time
  const getTimerColor = () => {
    const percentage = (timeLeft / (initialMinutes * 60)) * 100;
    if (percentage <= 10) return "bg-red-500 text-white";
    return "bg-green-500 text-white";
  };

  return (
    <div
      className={`w-16 h-16 rounded-full ${getTimerColor()} flex flex-col items-center justify-center font-bold text-xs shadow-lg`}
    >
      <div className="leading-tight">
        {formatTime(minutes)}:{formatTime(seconds)}
      </div>
    </div>
  );
}

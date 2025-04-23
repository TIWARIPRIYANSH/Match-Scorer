"use client";

import { useEffect, useRef, useState } from "react";

const formatTime = (totalSeconds: number) => {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
};

const MatchTimer = () => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const timerRef = useRef<HTMLDivElement>(null);

  // Drag state
  const isDragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let interval: any;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const startTimer = () => setIsRunning(true);
  const stopTimer = () => setIsRunning(false);
  const resetTimer = () => {
    setSeconds(0);
    setIsRunning(false);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    const element = timerRef.current;
    if (element) {
      offset.current = {
        x: e.clientX - element.getBoundingClientRect().left,
        y: e.clientY - element.getBoundingClientRect().top,
      };
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging.current && timerRef.current) {
      timerRef.current.style.left = `${e.clientX - offset.current.x}px`;
      timerRef.current.style.top = `${e.clientY - offset.current.y}px`;
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <div
      ref={timerRef}
      onMouseDown={handleMouseDown}
      className="fixed top-10 left-10 z-50 cursor-move"
    >
      <div className="flex flex-col items-center gap-3 bg-white px-6 py-4 rounded-2xl shadow-lg border border-gray-300">
        <div className="flex items-center gap-2 text-lg font-semibold text-gray-800">
          <span className="text-2xl">⏱️</span>
          <span className="text-3xl font-bold tracking-wider text-blue-600">
            {formatTime(seconds)}
          </span>
        </div>
        <div className="flex gap-2 mt-2">
          <button
            onClick={startTimer}
            className="bg-green-500 hover:bg-green-600 text-white text-sm px-3 py-1 rounded-lg shadow"
          >
            Start
          </button>
          <button
            onClick={stopTimer}
            className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm px-3 py-1 rounded-lg shadow"
          >
            Stop
          </button>
          <button
            onClick={resetTimer}
            className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded-lg shadow"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default MatchTimer;

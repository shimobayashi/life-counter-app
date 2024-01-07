"use client";

import React, { useState, useEffect } from "react";
import "./life-counter.css";

interface LifeCounterProps {
  isInverted?: boolean; // 反転されているかどうかのプロパティ
}

export default function LifeCounter({ isInverted = false }: LifeCounterProps) {
  const [life, setLife] = useState<number>(20);
  const [totalChanges, setTotalChanges] = useState<number>(0);
  const [showTotalChanges, setShowTotalChanges] = useState<boolean>(false);
  const [animationKey, setAnimationKey] = useState<number>(0);

  const handleIncrement = () => updateLife(1);
  const handleDecrement = () => updateLife(-1);
  const updateLife = (change: number) => {
    setLife((prevLife) => prevLife + change);
    setTotalChanges((prevChanges) => prevChanges + change);
    setShowTotalChanges(true);
    triggerAnimation();
  };

  const triggerAnimation = () => {
    setAnimationKey((prevKey) => prevKey + 1);
  };

  useEffect(() => {
    if (showTotalChanges) {
      const timeoutDuration = 1000;
      const changeTimeout = setTimeout(() => {
        setShowTotalChanges(false);
        setTotalChanges(0);
      }, timeoutDuration);

      return () => clearTimeout(changeTimeout);
    }
  }, [showTotalChanges, totalChanges]);

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const y = event.clientY - rect.top;
    const isTopHalf = y < rect.height / 2;

    if (isInverted) {
      isTopHalf ? handleDecrement() : handleIncrement();
    } else {
      isTopHalf ? handleIncrement() : handleDecrement();
    }
  };

  const displayTotalChanges =
    totalChanges >= 0 ? `+${totalChanges}` : totalChanges.toString();
  const totalChangeColor = totalChanges >= 0 ? 'text-green-500' : 'text-red-500';


  return (
    <div
      className="flex flex-col items-center justify-center min-h-[50vh]"
      style={{ transform: isInverted ? "rotate(180deg)" : "none" }}
    >
      <div style={{ cursor: "pointer" }} onClick={handleClick}>
        <h1 className="font-bold my-5 text-[20vh] text-white">{life}</h1>
      </div>

      <div
        key={animationKey}
        className={`mt-4 text-5xl animate-change ${totalChangeColor}`}
        style={{ visibility: showTotalChanges ? "visible" : "hidden" }}
      >
        <p>{displayTotalChanges}</p>
      </div>
    </div>
  );
}

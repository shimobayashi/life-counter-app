"use client";

import React, { useState, useEffect } from "react";
import "./life-counter.css";

interface LifeCounterProps {
  isInverted?: boolean; // 表示上上下反転されているかどうかのプロパティ
}

export default function LifeCounter({ isInverted = false }: LifeCounterProps) {
  const [life, setLife] = useState<number>(20);
  const [totalChanges, setTotalChanges] = useState<number>(0);
  const [showTotalChanges, setShowTotalChanges] = useState<boolean>(false);
  const [animationKey, setAnimationKey] = useState<number>(0);

  const handleIncrement = () => updateLife(1);
  const handleDecrement = () => updateLife(-1);
  // ライフ値を更新し、変更量をカウントしてアニメーションをトリガーする関数
  const updateLife = (change: number) => {
    setLife((prevLife) => prevLife + change);
    setTotalChanges((prevChanges) => prevChanges + change);
    setShowTotalChanges(true);
    triggerAnimation();
  };

  const triggerAnimation = () => {
    setAnimationKey((prevKey) => prevKey + 1);
  };

  // 1秒後に変化量を非表示にする
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

  // クリック位置によって増減を切り替える
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
      <button
        className="text-5xl w-full text-slate-100"
        onClick={handleIncrement}
      >+</button>

      <div style={{ cursor: "pointer", width: '100%' }} onClick={handleClick}>
        <h1 className="font-bold my-0 text-[18vh] text-white">{life}</h1>
      </div>

      <button
        className="text-5xl w-full text-slate-100"
        onClick={handleDecrement}
      >−</button>

      <div
        key={animationKey} // keyを更新することでアニメーションを再生し直す
        className={`mt-4 text-5xl animate-change ${totalChangeColor}`}
        style={{ visibility: showTotalChanges ? "visible" : "hidden" }}
      >
        <p>{displayTotalChanges}</p>
      </div>
    </div>
  );
}

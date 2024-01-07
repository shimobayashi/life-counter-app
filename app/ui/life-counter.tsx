'use client';

import React, { useState, useEffect } from 'react';
import './life-counter.css'

interface LifeCounterProps {
  isInverted?: boolean; // 反転されているかどうかのプロパティ
}

export default function LifeCounter({ isInverted = false }: LifeCounterProps) {
  const [life, setLife] = useState<number>(20);
  const [totalChanges, setTotalChanges] = useState<number>(0);
  const [animationKey, setAnimationKey] = useState<number>(0); // アニメーションのキー

  const triggerAnimation = () => {
    setAnimationKey(prevKey => prevKey + 1); // キーを更新してアニメーションをリセット
  };

  const handleIncrement = () => {
    setLife((prevLife) => prevLife + 1);
    setTotalChanges((prevChanges) => prevChanges + 1);
    triggerAnimation();
  };

  const handleDecrement = () => {
    setLife((prevLife) => prevLife - 1);
    setTotalChanges((prevChanges) => prevChanges - 1);
    triggerAnimation();
  };

  useEffect(() => {
    const timeoutDuration = 1000;
    const changeTimeout = setTimeout(() => {
      setTotalChanges(0);
    }, timeoutDuration);

    return () => clearTimeout(changeTimeout);
  }, [totalChanges]);

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

  // totalChangesがプラスの場合にプラス記号を付ける
  const displayTotalChanges = totalChanges > 0 ? `+${totalChanges}` : totalChanges.toString();

  return (
    <div
      className="flex flex-col items-center justify-center min-h-[50vh]"
      style={{ transform: isInverted ? "rotate(180deg)" : "none" }}
    >
      <div style={{ cursor: "pointer" }} onClick={handleClick}>
        <h1 className="font-bold my-5 text-[20vh]">{life}</h1>
      </div>

      <div
        key={animationKey} // キーを設定
        data-key={animationKey} // キーを設定
        className="mt-4 text-5xl animate-change"
        style={{ visibility: totalChanges !== 0 ? "visible" : "hidden" }}
      >
        <p>{displayTotalChanges}</p>
      </div>
    </div>
  );
};

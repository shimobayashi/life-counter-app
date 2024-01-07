'use client';

import React, { useState, useEffect } from 'react';

interface LifeCounterProps {
  isInverted?: boolean; // 反転されているかどうかのプロパティ
}

export default function LifeCounter({ isInverted = false }: LifeCounterProps) {
  const [life, setLife] = useState<number>(20);
  const [totalChanges, setTotalChanges] = useState<number>(0);

  const handleIncrement = () => {
    setLife((prevLife) => prevLife + 1);
    setTotalChanges((prevChanges) => prevChanges + 1);
  };

  const handleDecrement = () => {
    setLife((prevLife) => prevLife - 1);
    setTotalChanges((prevChanges) => prevChanges - 1);
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

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh]" 
         style={{ transform: isInverted ? 'rotate(180deg)' : 'none' }}>
      <div style={{ cursor: "pointer" }} onClick={handleClick}>
        <h1 className="font-bold my-5 text-[20vh]">{life}</h1>
      </div>

      <div
        className="mt-8"
        style={{ visibility: totalChanges !== 0 ? "visible" : "hidden" }}
      >
        <p className="text-5xl">{totalChanges}</p>
      </div>
    </div>
  );
};

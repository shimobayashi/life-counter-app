'use client';

import React, { useState, useEffect } from 'react';

export default function LifeCounter() {
  const [life, setLife] = useState<number>(20);
  const [totalChanges, setTotalChanges] = useState<number>(0);

  const handleIncrement = () => {
    setLife(prevLife => prevLife + 1);
    setTotalChanges(prevChanges => prevChanges + 1);
  };

  const handleDecrement = () => {
    setLife(prevLife => prevLife - 1);
    setTotalChanges(prevChanges => prevChanges - 1);
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
    const y = event.clientY - rect.top; // クリック位置を取得
    if (y < rect.height / 2) {
      handleIncrement(); // 上半分をクリックした場合、インクリメント
    } else {
      handleDecrement(); // 下半分をクリックした場合、デクリメント
    }
  };

  return (
    <div className="text-center mt-10">
      <div
        style={{ cursor: 'pointer' }}
        onClick={handleClick}
      >
        <h1 className="text-5xl font-bold my-5">{life}</h1>
      </div>
      
      <div className="mt-8">
        <h3 className="text-xl font-semibold">合計変更</h3>
        <p className="text-2xl">{totalChanges}</p>
      </div>
    </div>
  );
};

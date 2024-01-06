'use client';

import React, { useState, useEffect } from 'react';
import { PlusSquare, DashSquare } from 'react-bootstrap-icons';

const LifeCounter: React.FC = () => {
  const [life, setLife] = useState<number>(20);
  const [totalChanges, setTotalChanges] = useState<number>(0);

  const handleIncrement = () => {
    setLife(life + 1);
    setTotalChanges(totalChanges + 1);
  };

  const handleDecrement = () => {
    setLife(life - 1);
    setTotalChanges(totalChanges - 1);
  };

  useEffect(() => {
    const timeoutDuration: number = 1000;
    const changeTimeout: NodeJS.Timeout = setTimeout(() => {
      setTotalChanges(0);
    }, timeoutDuration);

    return () => clearTimeout(changeTimeout);
  }, [totalChanges]);

  return (
    <div className="text-center mt-10">
      <h1 className="text-3xl font-semibold">Life Counter</h1>
      <h2 className="text-5xl font-bold my-5">{life}</h2>
      <div className="flex justify-center space-x-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={handleIncrement}
        >
          <PlusSquare className="text-xl" /> +1
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          onClick={handleDecrement}
        >
          <DashSquare className="text-xl" /> -1
        </button>
      </div>
      <div className="mt-8">
        <h3 className="text-xl font-semibold">合計変更</h3>
        <p className="text-2xl">{totalChanges}</p>
      </div>
    </div>
  );
};

export default LifeCounter;

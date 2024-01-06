import Head from 'next/head';
import LifeCounter from '@/app/ui/life-counter';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <div className="transform rotate-180">
          <LifeCounter />
        </div>
        <LifeCounter />
      </div>
    </div>
  );
}

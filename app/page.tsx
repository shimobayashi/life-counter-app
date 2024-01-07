import Head from 'next/head';
import LifeCounter from '@/app/ui/life-counter';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen unselectable">
      <LifeCounter isInverted={true} />
      <LifeCounter />
    </div>
  );
}

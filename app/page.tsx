"use client";

import Head from 'next/head';
import { usePathname, useSearchParams } from 'next/navigation';
import { useWakeLock } from 'react-screen-wake-lock';

import LifeCounter from '@/app/ui/life-counter';

export default function Home() {
  const searchParams = useSearchParams();
  const debugMode = Boolean(searchParams.get('debug') || false);

  const { isSupported, released, request, release } = useWakeLock({
    onRequest: () => console.debug('Screen Wake Lock: requested!'),
    onError: () => console.error('An error happened 💥'),
    onRelease: () => console.debug('Screen Wake Lock: released!'),
  });
  request();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen unselectable bg-gray-800">
      <LifeCounter isInverted={true} />
      <LifeCounter />
      <div style={{
        display: debugMode ? 'block' : 'none',
      }}>
        <p>
          Screen Wake Lock API supported: <b>{`${isSupported}`}</b>
          <br />
          Released: <b>{`${released}`}</b>
        </p>
        <button
          type="button"
          onClick={() => (released === false ? release() : request())}
        >
          {released === false ? 'Release' : 'Request'}
        </button>
      </div>
    </div>
  );
}

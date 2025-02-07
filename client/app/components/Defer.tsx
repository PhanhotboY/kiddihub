import { Await } from '@remix-run/react';
import { Suspense, ReactNode } from 'react';
import LoadingOverlay from './LoadingOverlay';

export default function Defer<T>({
  children,
  resolve,
}: {
  children: (data: T) => React.ReactNode;
  resolve: Promise<T>;
}) {
  return (
    <Suspense fallback={<LoadingOverlay />}>
      <Await resolve={resolve}>{(data) => children(data)}</Await>
    </Suspense>
  );
}

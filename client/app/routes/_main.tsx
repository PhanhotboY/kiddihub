import { Outlet } from '@remix-run/react';

import Footer from '~/components/Footer';
import HandsomeError from '~/components/HandsomeError';
import Header from '~/components/Header';

export default function MainLayout() {
  return (
    <>
      <Header shadow />

      <main className='mt-[72px] grid gap-y-16'>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export const ErrorBoundary = () => <HandsomeError />;

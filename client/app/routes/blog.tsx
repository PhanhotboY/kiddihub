import { Skeleton } from '@mui/material';
import { LinksFunction, LoaderFunctionArgs } from '@remix-run/node';
import { Outlet } from '@remix-run/react';
import { Suspense, useEffect } from 'react';
import BlogHeader from '~/components/BlogHeader';
import Footer from '~/components/Footer';
import HandsomeError from '~/components/HandsomeError';

export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: 'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css',
    },
    {
      rel: 'stylesheet',
      href: 'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css',
    },
  ];
};

export default function BlogTemplate() {
  useEffect(() => {
    if (!document.getElementById('facebook-jssdk')) {
      const script = document.createElement('script');
      script.id = 'facebook-jssdk';
      script.src = 'https://connect.facebook.net/en_US/sdk.js';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }

    if (window !== undefined) {
      // @ts-ignore
      window.fbAsyncInit = function () {
        // @ts-ignore
        FB.init({
          appId: '950974113535167',
          xfbml: true,
          version: 'v2.3',
        });
      };
    }
  }, []);

  return (
    <>
      <Suspense
        fallback={<Skeleton variant='rectangular' width={210} height={60} />}
      >
        <BlogHeader />
      </Suspense>
      <main className='mt-20 md:mt-0'>
        <Outlet />
      </main>
      <Suspense
        fallback={<Skeleton variant='rectangular' width={210} height={60} />}
      >
        <Footer />
      </Suspense>
    </>
  );
}

export function ErrorBoundary() {
  return <HandsomeError />;
}

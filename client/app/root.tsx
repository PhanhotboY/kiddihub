import {
  json,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from '@remix-run/react';
import type { LinksFunction } from '@remix-run/node';

import toastifyCss from 'react-toastify/ReactToastify.css?url';
import style from './styles/index.scss?url';
import HandsomeError from './components/HandsomeError';
import { Bounce, ToastContainer } from 'react-toastify';
import { getAppSettings } from './services/app.service';
import { v2 as cloudinary } from 'cloudinary';
import { getPublicId } from './utils';
import Hydrated from './components/Hydrated';

export const links: LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
  { rel: 'stylesheet', href: style },
  { rel: 'stylesheet', href: toastifyCss },
];

export const meta = [
  {
    description: 'A Handsome Remix App',
  },
  {
    title: 'A Handsome Remix App',
  },
];

export const loader = async () => {
  const appSettings = await getAppSettings();

  return json({
    appSettings: {
      ...appSettings,
      app_logo: cloudinary.url(getPublicId(appSettings.app_logo), {
        transformation: { height: 28 },
      }),
    },
  });
};

export default function App() {
  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <Meta />
        <Links />
      </head>
      <body className='app'>
        <Outlet />

        <ToastContainer
          position='top-right'
          autoClose={3000}
          closeButton={true}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='light'
          transition={Bounce}
        />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />

        <Meta />
        <Links />
      </head>
      <body>
        <HandsomeError />
      </body>
    </html>
  );
}

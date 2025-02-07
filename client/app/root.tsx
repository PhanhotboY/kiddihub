import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';
import type { LinksFunction, MetaFunction } from '@remix-run/node';

import toastifyCss from 'react-toastify/ReactToastify.css?url';
import style from './styles/index.scss?url';
import HandsomeError from './components/HandsomeError';
import { Bounce, ToastContainer } from 'react-toastify';
import { getAppSettings } from './services/app.server';
import Hydrated from './components/Hydrated';
import BackToTop from './widgets/BackToTop';
import { getImageUrl } from './utils';

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

export const meta: MetaFunction = () => {
  const { appSettings } = useLoaderData<typeof loader>();

  return [
    {
      description: appSettings.app_description,
    },
    {
      title: appSettings.app_title,
    },
  ];
};

export const loader = async () => {
  const appSettings = await getAppSettings();

  return {
    appSettings,
  };
};

export default function App() {
  const { appSettings } = useLoaderData<typeof loader>();

  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <Meta />
        <Links />
        <link rel='icon' href={getImageUrl(appSettings.app_favicon)} />

        {appSettings.app_bodyScripts && (
          <div
            dangerouslySetInnerHTML={{ __html: appSettings.app_bodyScripts }}
          ></div>
        )}
      </head>
      <body className='app'>
        {appSettings.app_bodyScripts && (
          <div
            dangerouslySetInnerHTML={{ __html: appSettings.app_bodyScripts }}
          ></div>
        )}

        <Outlet />

        <Hydrated>{() => <BackToTop />}</Hydrated>

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

        <meta name='description' content='An error occurred' />
        <title>An error occurred</title>
        <Links />
      </head>
      <body>
        <HandsomeError />
      </body>
    </html>
  );
}

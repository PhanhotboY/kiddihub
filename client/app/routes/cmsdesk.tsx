import { ActionFunctionArgs, json, LoaderFunctionArgs } from '@remix-run/node';
import { Link, NavLink, Outlet, useLocation } from '@remix-run/react';

import 'react-toastify/ReactToastify.css';
import HandsomeError from '~/components/HandsomeError';
import { updateAppSettings } from '~/services/app.service';
import { authenticator } from '~/services/auth.server';

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    const user = await authenticator.isAuthenticated(request);
    const body = (await request.formData()) as any;

    const res = await updateAppSettings(
      {
        contact: {
          email: body.get('email'),
          phone: body.get('phone'),
          address: body.get('address'),
        },
        meta: {
          title: body.get('title'),
          description: body.get('description'),
          keywords: body.get('keywords'),
        },
        social: {
          facebook: body.get('facebook'),
          instagram: body.get('instagram'),
        },
        favicon: body.get('favicon'),
        logo: body.get('logo'),
        google: {
          analytics: body.get('analytics'),
          reCaptcha: body.get('reCaptcha'),
        },
        taxCode: body.get('taxCode'),
      },
      user
    );

    return json({
      ...res,
      toast: { message: 'Cập nhật thông tin thành công!', type: 'success' },
    });
  } catch (error: any) {
    console.error('Error updating app settings:', error);
    return json(
      {
        error: 'Failed to update app settings',
        toast: { message: error.message, type: 'error' },
      },
      { status: 500 }
    );
  }
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  if (url.pathname !== '/cmsdesk/login') {
    const user = await authenticator.isAuthenticated(request, {
      failureRedirect: '/cmsdesk/login',
    });

    return json({ user });
  }
  return json({});
};

export function ErrorBoundary() {
  return <HandsomeError />;
}

export default function CmsDesk() {
  const location = useLocation();

  return (
    <main className='app_content'>
      {location.pathname === '/cmsdesk/login' || <Header />}

      <div className='py-8 main'>
        <Outlet />
      </div>
    </main>
  );
}

const Header = () => {
  const location = useLocation();

  return (
    <header className='bg-black text-white shadow-lg hidden md:block'>
      <div className='container mx-auto flex items-center h-16'>
        <Link to='/cmsdesk' className='flex items-center justify-center'>
          <img
            className='h-10'
            src='https://i.ibb.co/6Yxs70d/2021-10-26-23h27-03.png'
            alt=''
          />
        </Link>

        <div className='contents font-semibold text-base lg:text-lg'>
          <ul className='mx-auto flex items-center'>
            <li>
              <NavLink
                to='/cmsdesk'
                className={({ isActive, isPending }) =>
                  `${
                    isPending
                      ? 'pending'
                      : location.pathname === '/cmsdesk'
                      ? 'text-yellow'
                      : ''
                  } p-5 xl:p-4`
                }
              >
                <span>Website</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to='/cmsdesk/users'
                className={({ isActive, isPending }) =>
                  `${
                    isPending ? 'pending' : isActive ? 'text-yellow' : ''
                  } p-5 xl:p-4`
                }
              >
                <span>Người dùng</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to='/cmsdesk/schools'
                className={({ isActive, isPending }) =>
                  `${
                    isPending ? 'pending' : isActive ? 'text-yellow' : ''
                  } p-5 xl:p-4`
                }
              >
                <span>Trường</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to='/cmsdesk/posts'
                className={({ isActive, isPending }) =>
                  `${
                    isPending ? 'pending' : isActive ? 'text-yellow' : ''
                  } p-5 xl:p-4`
                }
              >
                <span>Bài đăng</span>
              </NavLink>
            </li>
          </ul>
        </div>

        <Link to='/cmsdesk/account'>
          <img
            alt='avatar'
            src='https://res.cloudinary.com/dkc0dedwd/image/upload/v1731729104/blog/adcuhafsoctsawtsbndp.png'
            className='relative inline-block h-10 aspect-square cursor-pointer rounded-full object-cover object-center'
            data-popover-target='profile-menu'
          />
        </Link>
      </div>
    </header>
  );
};

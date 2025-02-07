import { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import {
  Link,
  NavLink,
  Outlet,
  useLoaderData,
  useLocation,
  useNavigate,
  useNavigation,
} from '@remix-run/react';
import {
  RiBookShelfLine,
  RiCalendar2Line,
  RiDashboard3Line,
  RiFolderImageLine,
  RiGitBranchLine,
  RiLogoutBoxRLine,
  RiNewspaperLine,
  RiSchoolLine,
} from '@remixicon/react';

import 'react-toastify/ReactToastify.css';
import HandsomeError from '~/components/HandsomeError';
import { updateAppSettings } from '~/services/app.server';
import { authenticator } from '~/services/auth.server';
import { getCurrentUser } from '~/services/user.server';
import { IUser } from '~/interfaces/user.interface';
import LoadingOverlay from '~/components/LoadingOverlay';
import { getImageUrl } from '~/utils';

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    const user = await authenticator.isAuthenticated(request);

    let formData = await request.formData();
    console.log(formData);
    const res = await updateAppSettings(
      {
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        logo: formData.get('logo') as string,
        favicon: formData.get('favicon') as string,
        social: {
          facebook: formData.get('facebook') as string,
          youtube: formData.get('youtube') as string,
          tiktok: formData.get('tiktok') as string,
          zalo: formData.get('zalo') as string,
        },
        taxCode: formData.get('taxCode') as string,
        headScripts: formData.get('headScripts') as string,
        bodyScripts: formData.get('bodyScripts') as string,
      },
      user
    );

    return {
      ...res,
      toast: { message: 'Cập nhật thông tin thành công!', type: 'success' },
    };
  } catch (error: any) {
    console.error('Error updating app settings:', error);
    return {
      error: 'Failed to update app settings',
      toast: { message: error.message || error.statusText, type: 'error' },
    };
  }
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  try {
    if (url.pathname !== '/cmsdesk/login') {
      const auth = await authenticator.isAuthenticated(request, {
        failureRedirect: '/cmsdesk/login',
      });

      const user = await getCurrentUser(auth);
      return { user };
    }
  } catch (error) {
    await authenticator.logout(request, { redirectTo: '/cmsdesk/login' });
  }

  return { user: null };
};

export function ErrorBoundary() {
  return <HandsomeError basePath='/cmsdesk' />;
}

export default function CmsDesk() {
  const { user } = useLoaderData<typeof loader>();
  const location = useLocation();
  const isLoginPage = location.pathname === '/cmsdesk/login';
  const navigation = useNavigation();

  return (
    <main className='app_content text-[--sub7-text] select-auto'>
      {isLoginPage ? (
        <Outlet />
      ) : (
        <div className='flex flex-wrap bg-gray-100 w-full h-screen overflow-hidden'>
          <SideBar user={user!} />

          <div className='w-10/12 h-full p-8 overflow-y-auto'>
            <Outlet />
          </div>
        </div>
      )}

      {navigation.state === 'loading' && <LoadingOverlay />}
    </main>
  );
}

const SideBar = ({ user }: { user: IUser }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { to: '/cmsdesk', label: 'Dashboard', icon: <RiDashboard3Line /> },
    { to: '/cmsdesk/categories', label: 'Danh mục', icon: <RiBookShelfLine /> },
    {
      to: '/cmsdesk/branches',
      label: 'Chi nhánh',
      icon: <RiGitBranchLine />,
    },
    { to: '/cmsdesk/pages', label: 'Trang', icon: <RiNewspaperLine /> },
    {
      to: '/cmsdesk/schools',
      label: 'Trường học',
      icon: <RiSchoolLine />,
    },
    { to: '/cmsdesk/images', label: 'Hình ảnh', icon: <RiFolderImageLine /> },
  ];

  return (
    <div className='w-2/12 bg-white rounded p-3 shadow-lg'>
      <UserBrief user={user} />

      <ul className='space-y-2 text-sm'>
        {navLinks.map((nav, i) => (
          <li key={i}>
            <NavLink
              to={nav.to}
              className={({ isPending }) => `${
                (
                  nav.to.replace('/cmsdesk', '')
                    ? location.pathname.includes(nav.to)
                    : location.pathname === nav.to
                )
                  ? 'text-orange'
                  : ''
              } flex items-center space-x-3 text-gray-700 p-2 rounded-md hover:text-blue-500 
        font-medium hover:bg-zinc-100 focus:shadow-outline hover:underline relative`}
            >
              <span className='text-gray-600'>{nav.icon}</span>
              <span>{nav.label}</span>
            </NavLink>
          </li>
        ))}

        <li>
          <NavLink
            to='/cmsdesk/logout'
            className='flex items-center space-x-3 text-gray-700 p-2 rounded-md hover:text-red-500
        font-medium hover:bg-gray-200 bg-gray-200 focus:shadow-outline hover:underline'
            onClick={async (e) => {
              e.preventDefault();

              if (window.confirm('Bạn có chắc chắn muốn đăng xuất?')) {
                fetch('/cmsdesk/logout', { method: 'POST' });
                navigate('/cmsdesk/login');
              }
            }}
          >
            <span className='text-gray-600'>
              <RiLogoutBoxRLine />
            </span>
            <span>Đăng xuất</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

const UserBrief = ({ user }: { user: IUser }) => {
  const fullName = `${user.usr_firstName} ${user.usr_lastName}`;

  return (
    <Link to='/cmsdesk/account' className='flex items-center gap-x-4 p-2 mb-5'>
      <div className='h-12 min-w-12 rounded-full overflow-hidden aspect-square'>
        <img
          className='object-cover object-center h-full w-full'
          src={getImageUrl(user.usr_avatar)}
          alt={fullName}
        />
      </div>

      <div className='overflow-hidden'>
        <div>
          <h4 className='font-semibold text-lg text-gray-700 capitalize font-poppins tracking-wide truncate'>
            {fullName}
          </h4>
          <span className='text-sm tracking-wide flex items-center space-x-1 text-green'>
            <svg
              className='h-4 text-green-500'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
              />
            </svg>
            <span className='text-gray-600'>Verified</span>
          </span>
        </div>
      </div>
    </Link>
  );
};

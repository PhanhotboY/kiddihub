import { Link, NavLink, useLoaderData } from '@remix-run/react';
import { RiCloseLine, RiMenuLine } from '@remixicon/react';
import { useState } from 'react';
import { useRootLoaderData } from '~/lib/useRootLoaderData';
import { getImageUrl } from '~/utils';

export default function Header({ shadow }: { shadow?: boolean }) {
  const { appSettings } = useRootLoaderData();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header
      className={`${
        shadow ? 'shadow-lg' : ''
      } fixed top-0 w-full bg-white flex z-40`}
    >
      <div className='container flex items-center justify-between'>
        <div className='logo'>
          <Link className='px-2 py-4' to='/'>
            <img
              className='h-10 object-contain'
              src={getImageUrl(appSettings.app_logo)}
              alt={appSettings.app_title}
            />
          </Link>

          <nav
            className={`${
              isMenuOpen ? 'left-0' : 'left-full'
            } lg:ml-4 max-lg:fixed lg:block transition-all duration-300 inset-0 w-full h-full bg-black/50 lg:bg-inherit flex justify-end`}
            onClick={() => setIsMenuOpen(false)}
          >
            <button
              className='lg:hidden absolute top-4 left-4 text-white'
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <RiCloseLine />
            </button>

            <ul
              className='flex items-center text-[--sub1-text-color] rounded-lg bg-white h-full min-w-60 gap-4 lg:w-full flex-col lg:flex-row m-2 lg:m-0 p-4 lg:p-0'
              onClick={(e) => e.stopPropagation()}
            >
              {[
                { title: 'Phụ huynh', slug: '#phu-huynh' },
                { title: 'Chủ trường', slug: '#chu-truong' },
                { title: 'Giáo viên', slug: '#giao-vien' },
                // { title: 'Kiddihub Store', slug: 'store' },
                { title: 'Kiddihub Blog', slug: 'blog' },
                { title: 'Đối tác', slug: '#doi-tac' },
              ].map((item, index) => (
                <li
                  key={index}
                  className='mx-2 hover:text-[--main-color] font-semibold'
                >
                  <NavLink className='p-2' to={`/${item.slug}`}>
                    {item.title}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className='btn text-[--main-color] font-semibold'>
          <Link
            to='/login'
            className='inline-flex items-center gap-2 rounded border border-[--main-color] px-4 py-2 text-sm transition-all hover:shadow-lg disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
          >
            Đăng trường
          </Link>

          {/* <Link
            to='/login'
            className='inline-flex items-center gap-2 rounded border border-[--main-color] px-4 py-2 text-sm transition-all hover:shadow-lg disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none hidden sm:inline-block'
          >
            Đăng nhập
          </Link> */}

          <button
            className='lg:hidden'
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <RiMenuLine />
          </button>
        </div>
      </div>
    </header>
  );
}

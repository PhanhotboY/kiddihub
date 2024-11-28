import { Link, useLoaderData } from '@remix-run/react';

import style from './index.module.css';
import {
  RiFacebookBoxFill,
  RiInstagramFill,
  RiYoutubeFill,
} from '@remixicon/react';
import { loader } from '~/root';
import { useRootLoaderData } from '~/lib/useRootLoaderData';

export default function Footer() {
  const {
    appSettings: {
      app_social: social,
      app_meta: meta,
      app_contact: contact,
      ...app
    },
  } = useRootLoaderData();

  return (
    <footer
      id={style.footer}
      className='border-t border-zinc-200 py-8 bg-white'
    >
      <div className='container flex flex-col gap-8'>
        <section className='!flex md:items-center justify-between flex-col md:flex-row'>
          <div className='flex flex-col col-span-3 md:items-center'>
            <img
              className='object-scale-down scale-150 w-fit h-fit z-0'
              src={app.app_logo}
              alt={meta.title}
            />
            <p className='md:text-center text-[--sub1-text-color] mt-2'>
              {meta.title}
            </p>
          </div>

          <div className='col-span-3 col-start-10'>
            <Link
              to='/login'
              className='inline-flex items-center gap-2 rounded border border-[--sub1-color] px-4 py-2 text-sm font-semibold text-[--sub1-color] transition-all hover:shadow-lg disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none mr-4'
            >
              Đăng nhập
            </Link>

            <Link
              to='/login'
              className='inline-flex items-center gap-2 rounded border border-[--sub1-color] bg-[--sub1-color] px-4 py-2 text-sm font-semibold text-[--sub3-text-color] transition-all hover:shadow-lg disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
            >
              Đăng ký tài khoản
            </Link>
          </div>
        </section>

        <section className='border-b border-black pb-4'>
          <div className='col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3'>
            <h4>Phụ huynh</h4>

            <ul className={style.list}>
              <li className={style.item}>
                <Link to='/'> Xem 4 bước chọn trường mầm non</Link>
              </li>
              <li>
                <Link to='/'>Trường mầm non tại TP HCM</Link>
              </li>
              <li>
                <Link to='/'>Trường mầm non tại Hà Nội</Link>
              </li>
              <li>
                <Link to='/'>Tìm trường mầm non</Link>
              </li>
              <li>
                <Link to='/'>Cộng đồng review mầm non Hà Nội</Link>
              </li>
              <li>
                <Link to='/'>
                  Review trường mầm non tại HCM, Bình Dương, Biên Hòa
                </Link>
              </li>
              <li>
                <Link to='/'>Đồ chơi giáo dục cho bé từ 0-6 tuổi</Link>
              </li>
              <li>
                <Link to='/'>Thuốc 5 sao</Link>
              </li>
            </ul>
          </div>

          <div className='col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3'>
            <h4>Phụ huynh</h4>

            <ul className={style.list}>
              <li className={style.item}>
                <Link to='/'> Xem 4 bước chọn trường mầm non</Link>
              </li>
              <li>
                <Link to='/'>Trường mầm non tại TP HCM</Link>
              </li>
              <li>
                <Link to='/'>Trường mầm non tại Hà Nội</Link>
              </li>
              <li>
                <Link to='/'>Tìm trường mầm non</Link>
              </li>
            </ul>
          </div>

          <div className='col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3'>
            <h4>Phụ huynh</h4>

            <ul className={style.list}>
              <li className={style.item}>
                <Link to='/'> Xem 4 bước chọn trường mầm non</Link>
              </li>
              <li>
                <Link to='/'>Trường mầm non tại TP HCM</Link>
              </li>
              <li>
                <Link to='/'>Trường mầm non tại Hà Nội</Link>
              </li>
            </ul>
          </div>
        </section>

        <section>
          <div className='col-span-12 md:col-span-9'>
            <p>Copyright © 2020 {meta.title}</p>
            <p>
              Công ty cổ phần công nghệ giáo dục KiddiHub - Mã số thuế:{' '}
              <strong>{app.app_taxCode}</strong> cấp ngày: 10/06/2020 tại Sở Kế
              hoạch và Đầu tư thành phố Hà Nội - Đại diện: Ông VŨ VĂN TÙNG
            </p>
            <p>Địa chỉ: {contact.address}</p>
            <p>
              Email:{' '}
              <a
                className='hover:text-[--main-color]'
                href={`mailto:${contact.email}`}
                target='_blank'
                rel='noreferrer'
              >
                {contact.email}
              </a>
            </p>
            <p>
              Hotline:{' '}
              <a
                className='hover:text-[--main-color]'
                href={`tel:${contact.phone}`}
              >
                {contact.phone}
              </a>
            </p>
          </div>

          <div className='col-span-6 md:col-span-3'>
            <img
              data-v-101a839d=''
              data-v-728576c6=''
              alt='https://s3.kiddihub.site/prod/dadangkybocongthuong.png'
              className='aspect-[5/2] bg-white mx-auto object-scale-down lazyLoad isLoaded'
              src='https://s3.kiddihub.site/prod/dadangkybocongthuong.png'
            />
          </div>
        </section>

        <section>
          <div className='col-span-12'>
            <h4 className='text-center'>KẾT NỐI VỚI CHÚNG TÔI</h4>

            <ul className='text-[--sub2-text-color] flex flex-wrap gap-4 items-center justify-center'>
              <li className='hover:text-[--main-color]'>
                <Link to={social.facebook}>
                  <RiFacebookBoxFill />
                </Link>
              </li>
              {
                <li className='hover:text-[--main-color]'>
                  <Link to={social.instagram}>
                    <RiInstagramFill />
                  </Link>
                </li>
              }
              {/* @ts-ignore */}
              {social.youtube && (
                <li className='hover:text-[--main-color]'>
                  {/* @ts-ignore */}
                  <Link to={social.youtube}>
                    <RiYoutubeFill />
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </section>
      </div>
    </footer>
  );
}

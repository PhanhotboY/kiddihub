import BreadScrum from '~/components/BreadScrum';

import style from './index.module.css';
import { Link } from '@remix-run/react';
import { useRootLoaderData } from '~/lib/useRootLoaderData';
import Header from '~/components/Header';
import { ISchoolDetail } from '~/interfaces/school.interface';
import { toAddressString } from '~/utils';

export default function SchoolOverview({
  images,
  school: { sch_name, sch_address, sch_avatar },
  breadscrum,
}: {
  images: string[];
  school: ISchoolDetail;
  breadscrum: { label: string; path: string }[];
}) {
  const { appSettings } = useRootLoaderData();

  return (
    <>
      <Header />

      <section className={style.school_overview}>
        <div className='container'>
          <div className='flex flex-col gap-3'>
            <BreadScrum links={breadscrum} />

            <div className={`mb-10 ${style.img}`}>
              <div className='relative'>
                <div className='grid grid-cols-12 grid-rows-3 h-40 md:h-80 gap-2'>
                  <div className='col-span-12 lg:col-span-7 row-span-3 overflow-hidden'>
                    <img src={images[0]} alt='' />
                  </div>

                  <div className='hidden lg:block col-span-5 row-span-2 overflow-hidden'>
                    <img src={images[1]} alt='' />
                  </div>

                  <div className='hidden col-span-5 row-span-1 lg:flex gap-2 overflow-hidden'>
                    <div>
                      <img src={images[2]} alt='' />
                    </div>

                    <div>
                      <img src={images[3]} alt='' />
                    </div>
                  </div>
                </div>

                <div className='w-20 md:w-28 aspect-square rounded-full overflow-hidden border border-zinc-200 absolute bottom-0 left-4 translate-y-1/3 bg-white'>
                  <img src={sch_avatar} alt={sch_name} />
                </div>
              </div>
            </div>

            <p className='text-[--sub2-text-color]'>
              <i>Cập nhật gần nhất: khoảng 2 ngày trước</i>
            </p>

            <h1 className='text-2xl font-bold'>{sch_name}</h1>

            <p className='text-[--sub2-text-color] text-sm'>
              {toAddressString(sch_address)}
            </p>
          </div>
        </div>
      </section>

      <nav className='sticky top-[72px] shadow-lg border-t mt-4 bg-white z-30'>
        <div className='container overflow-hidden'>
          <div className='w-fit flex flex-nowrap'>
            {sections.map((sec, i) => (
              <Link
                className='w-max p-4 font-semibold text-[--sub2-text-color]'
                key={i}
                to={sec.hash}
              >
                {sec.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}

const sections = [
  { label: 'Đề xuất quan tâm', hash: '#de-xuat-quan-tam' },
  { label: 'Tổng quan', hash: '#tong-quan' },
  { label: 'Giới thiệu chung', hash: '#gioi-thieu-chung' },
  { label: 'Liên hệ', hash: '#lien-he' },
];

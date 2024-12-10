import { Link } from '@remix-run/react';
import { SCHOOL } from '~/constants/school.constant';
import { ISchool } from '~/interfaces/school.interface';
import { toAddressString, toAgeString, toTuitionString } from '~/utils';

export default function SchoolCard({
  school,
  index,
  openPopup,
  admin,
}: {
  school: ISchool;
  index: number;
  admin?: boolean;
  openPopup?: (school: ISchool) => void;
}) {
  return (
    <article className='relative lg:static grid grid-cols-9 gap-x-4 rounded-lg bg-white border border-zinc-200 shadow overflow-hidden'>
      <div className='col-span-12 lg:col-span-2'>
        <Link
          className='block max-lg:aspect-video h-full overflow-hidden w-full'
          to={
            admin
              ? `/cmsdesk/schools/${school.id}/edit`
              : `/truong/${school.sch_slug}`
          }
        >
          <img
            className='object-cover object-center h-full w-full'
            src={school.sch_avatar}
            alt={school.sch_name}
          />
        </Link>
      </div>

      <div className='detail col-span-12 lg:col-span-7 flex flex-col px-4 lg:px-0 pt-4 gap-2'>
        <Link
          className='block'
          to={
            admin
              ? `/cmsdesk/schools/${school.id}/edit`
              : `/truong/${school.sch_slug}`
          }
        >
          <div className='flex'>
            <div>
              <div className='absolute top-4 left-4 lg:static w-14 aspect-square border border-zinc-200 rounded-full overflow-hidden bg-white'>
                <img
                  className='object-contain'
                  src={school.sch_avatar}
                  alt={school.sch_name}
                />
              </div>
            </div>

            <div className='font-semibold text-lg lg:text-xl flex lg:px-4'>
              <p className='text-[--main-color]'>
                <span className='text-[--sub1-color] w-max'>
                  #{index}{' '}
                  {
                    Object.values(SCHOOL.TYPE).find(
                      (type) => type.slug === school.sch_type
                    )?.name
                  }
                </span>
                <span className='text-[--sub1-color] mx-2'>|</span>
                {school.sch_name}
              </p>
            </div>
          </div>
        </Link>

        <div className='text-sm'>
          <p className='text-[--sub2-text-color]'>
            {toAddressString(school.sch_address)}
          </p>
        </div>
      </div>

      <div className='col-span-12 lg:col-span-9 flex flex-col lg:flex-row gap-4 justify-between p-4'>
        <div className='flex gap-6'>
          <div>
            <p className='text-xs'>Nhận học sinh/học viên:</p>
            <p className='font-bold'>{toAgeString(school.sch_age)}</p>
          </div>

          <div>
            <p className='text-xs'>Học phí:</p>
            <p className='font-bold'>
              {toTuitionString(school.sch_tuition)}/tháng
            </p>
          </div>
        </div>

        {admin || (
          <button
            className='w-fit uppercase bg-[--main-color] text-white text-base rounded-lg px-6 py-4 h-full col-span-1 text-xs'
            onClick={() => openPopup && openPopup(school)}
          >
            Nhận tư vấn qua Zalo
          </button>
        )}
      </div>
    </article>
  );
}

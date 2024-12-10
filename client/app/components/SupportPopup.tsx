import { Form } from '@remix-run/react';
import { RiCloseLine, RiExternalLinkLine, RiUserFill } from '@remixicon/react';
import { ISchool } from '~/interfaces/school.interface';

export default function SupportPopup({
  school,
  closePopup,
}: {
  school: ISchool;
  closePopup: () => void;
}) {
  return (
    <div
      id='support'
      className='h-screen fixed inset-0 bg-black/70 overflow-hidden z-50'
      onClick={() => closePopup()}
    >
      <div
        className='relative w-full md:w-2/3 m-auto h-full bg-white lg:grid grid-cols-2'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='col-span-1 hidden lg:block'>
          <img className='h-full w-full' src='/support-banner.png' alt='' />
        </div>

        <Form className='col-span-1 w-full h-full'>
          <div className='flex flex-col px-8 py-16 gap-6'>
            <div>
              <h2 className='text-2xl font-bold text-gray-800'>
                Hỗ trợ tư vấn
              </h2>

              <a
                className='text-[--sub2-text-color] text-sm mt-4 hover:underline'
                href={`/truong/${school.sch_slug}`}
                target='_blank'
                rel='noreferrer'
              >
                {school.sch_name}
                <RiExternalLinkLine
                  className='ml-2 inline text-[--main-color]'
                  size={16}
                />
              </a>
            </div>

            <div className='flex flex-col gap-4'>
              <label className='relative w-full'>
                <RiUserFill
                  className='absolute top-1/2 left-5 -translate-y-1/2 text-[--sub2-text-color]'
                  size={20}
                />
                <input
                  className='w-full bg-zinc-100 p-4 pl-12 rounded-full border border-zinc-200 focus:outline-none'
                  name='name'
                  type='text'
                  placeholder='Tên *'
                />
              </label>

              <label className='relative w-full'>
                <img
                  className='absolute w-5 top-1/2 left-5 -translate-y-1/2 text-[--sub2-text-color]'
                  src='/zalo.png'
                />
                <input
                  className='w-full bg-zinc-100 p-4 pl-12 rounded-full border border-zinc-200 focus:outline-none'
                  type='tel'
                  name='phone'
                  placeholder='Số Zalo *'
                />
              </label>
            </div>

            <div className='flex flex-col gap-4 text-sm'>
              <button
                className='rounded-full bg-[--main-color] text-white p-4 font-semibold transition-all 
                hover:shadow-lg disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none 
                hover:opacity-80 active:opacity-100'
                type='submit'
              >
                Tư vấn tôi qua zalo
              </button>

              <button
                className='rounded-full bg-[--main-color-opacity] text-[--main-color] p-4 font-semibold transition-all 
                hover:shadow-lg disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none 
                hover:opacity-80 active:opacity-100'
                type='submit'
              >
                Gọi điện tư vấn tôi
              </button>
            </div>

            <p className='text-sm text-[--sub2-text-color]'>
              <span className='text-[--main-color]'>1,217,459</span> phụ huynh
              đã yêu cầu hỗ trợ và tìm được trường ưng ý
            </p>
          </div>
        </Form>

        <button
          className='absolute top-4 right-4 rounded-full aspect-square hover:bg-black/10 p-2'
          onClick={() => closePopup()}
          type='button'
        >
          <RiCloseLine />
        </button>
      </div>
    </div>
  );
}

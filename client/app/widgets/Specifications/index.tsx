import { RiGroupLine } from '@remixicon/react';

export default function Specifications() {
  return (
    <section className='container flex flex-col md:flex-row gap-8 md:gap-0 scale-125 md:scale-100 flex-wrap items-center justify-evenly text-[--sub1-text-color]'>
      <div className='flex items-center w-fit'>
        <RiGroupLine />

        <div className='pl-4 ml-4 border-l-4 border-[color:--main-color]'>
          <b className='text-xl uppercase'>
            40 triệu <span className='text-[--main-color]'>+</span>
          </b>

          <p className='text-sm'>Lượt truy cập</p>
        </div>
      </div>

      <div className='flex items-center w-fit'>
        <RiGroupLine />

        <div className='pl-4 ml-4 border-l-4 border-[color:--main-color]'>
          <b className='text-xl uppercase'>
            40 triệu <span className='text-[--main-color]'>+</span>
          </b>

          <p className='text-sm'>Lượt truy cập</p>
        </div>
      </div>

      <div className='flex items-center w-fit'>
        <RiGroupLine />

        <div className='pl-4 ml-4 border-l-4 border-[color:--main-color]'>
          <b className='text-xl uppercase'>
            40 triệu <span className='text-[--main-color]'>+</span>
          </b>

          <p className='text-sm'>Lượt truy cập</p>
        </div>
      </div>
    </section>
  );
}

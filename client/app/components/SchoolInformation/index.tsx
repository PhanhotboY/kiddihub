import { ISchoolDetail } from '~/interfaces/school.interface';
import style from './index.module.css';
import { toAgeString, toCurrencyString, toTuitionString } from '~/utils';
import {
  RiFacebookCircleFill,
  RiGlobalLine,
  RiMailLine,
  RiMapPinLine,
  RiPhoneFill,
  RiUserVoiceLine,
} from '@remixicon/react';
import { Link } from '@remix-run/react';
import { SCHOOL } from '~/constants/school.constant';
import { toAddressString } from '~/utils/address.util';

export default function SchoolContent({
  school,
  openSupport,
}: {
  school: ISchoolDetail;
  openSupport: (s: ISchoolDetail) => void;
}) {
  return (
    <div className={`${style.wrapper} flex flex-col gap-6`}>
      <section
        id={'de-xuat-quan-tam'}
        className='rounded-xl shadow-lg col-span-12 border border-zinc-200 p-4'
      >
        <div className='flex gap-6'>
          <div className='bee w-20 '>
            <img
              className='object-contain'
              src='/bee-pencil.png'
              alt='bee with pencil'
            />
          </div>

          <div className='flex flex-col justify-between'>
            <p className='py-2'>
              Anh chị quan tâm nhất tới điều gì về trung tâm ạ?
            </p>

            <div className='flex flex-wrap gap-x-4 gap-y-2'>
              <button className='py-2 px-4 w-max text-[--sub1-color] bg-[--sub1-color-opacity] rounded-full text-sm'>
                Biểu phí chi tiết
              </button>

              <button className='py-2 px-4 w-max text-[--sub1-color] bg-[--sub1-color-opacity] rounded-full text-sm'>
                Sĩ số lớp, thời khóa biểu
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* <section
        id={'tong-quan-danh-gia'}
        className='rounded-xl shadow-lg col-span-12 border border-zinc-200 p-4'
      >

        <div>
          <p><i>Tổng hợp từ đánh giá từ phụ huynh</i></p>


        </div>

        <div></div>

        <div></div>
      </section> */}

      <section id='tong-quan'>
        <div className={style.overview}>
          <h2 className='my-4'>Tổng quan</h2>

          <p className={style.key}>Học phí</p>
          <p className={`${style.value} text-[--sub1-color]`}>
            Từ {toCurrencyString(school.sch_tuition.from)} / tháng
          </p>

          <p className={style.key}>Loại hình đào tạo</p>
          <p className={style.value}>
            {
              Object.values(SCHOOL.PROGRAM).find(
                (p) => p.slug === school.sch_program
              )?.name
            }
          </p>

          <p className={style.key}>Độ tuổi học sinh, học viên</p>
          <p className={style.value}>{toAgeString(school.sch_age)}</p>

          <div className='flex w-full md:w-1/2 justify-between items-end'>
            <div>
              <p className={style.key}>Số điện thoại</p>
              <p className={style.value}>{school.sch_contact.msisdn}</p>
            </div>

            <button
              className='uppercase text-[--main-color] font-bold px-4 py-2 rounded-lg flex items-center gap-2 bg-[--main-color-opacity]'
              onClick={() => openSupport(school)}
            >
              <RiPhoneFill /> Liên hệ
            </button>
          </div>

          <p className={style.key}>Địa chỉ</p>
          <p className={style.value}>{toAddressString(school.sch_address)}</p>

          <Link
            className='flex text-sm mt-4 items-center text-[--main-color]'
            to={school.sch_contact.map}
            target='_blank'
            rel='noreferrer'
          >
            <RiMapPinLine size={16} className='mr-1' />
            Xem trên map
          </Link>
        </div>
      </section>

      <section id={'gioi-thieu-chung'}>
        <div className={style.content}>
          <h2>Giới thiệu chung</h2>

          <p className='text-lg'>
            Trung Tâm Nghệ Thuật FMusic (Sunshine Melody) - Nơi khơi dậy tiềm
            năng âm nhạc và niềm đam mê nghệ thuật 1. Trung tâm trang bị hệ
            thống đàn Yamaha chuẩn cao cấp, đảm bảo cho học viên có môi trường
            học tập, rèn luyện nghệ thuật tốt nhất. Phòng học được trang bị đầy
            đủ thiết bị và tiện nghi, tạo điều kiện thuận lợi cho việc học tập
            cùng sáng tạo. 2. Tất cả giáo viên tại trung tâm đều tốt nghiệp Học
            viện Âm nhạc Quốc gia và có nhiều năm kinh nghiệm trong lĩnh vực
            giảng dạy và biểu diễn âm nhạc. Sự am hiểu sâu sắc về nghệ thuật và
            kinh nghiệm thực tế của họ đảm bảo chất lượng giảng dạy cho học
            viên. 3. Trung tâm là đơn vị tiên phong và thường xuyên đăng cai tổ
            chức các cuộc thi âm nhạc lớn, tạo điều kiện cho học viên có cơ hội
            thể hiện tài năng, gặt hái kinh nghiệm và học hỏi từ các nghệ sĩ
            hàng đầu. 4. FMusic (Sunshine Melody) cung cấp các khóa học với mức
            học phí hợp lý và tiết kiệm nhất, giúp cho mọi học viên dễ dàng tiếp
            cận và tham gia vào hoạt động nghệ thuật một cách linh hoạt và thuận
            tiện.
          </p>
        </div>
      </section>

      <section id={'lien-he'}>
        <div className={`${style.content}`}>
          <h2>Giới thiệu chung</h2>

          <div
            className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 text-[--sub2-text-color]`}
          >
            <div>
              <Link
                to={`tel:${school.sch_contact.msisdn}`}
                className='flex flex-col gap-2 items-center justify-center w-full'
              >
                <RiPhoneFill className='text-[--main-color]' />
                <p>{school.sch_contact.msisdn}</p>
              </Link>
            </div>

            <div>
              <Link
                to={`mailto:${school.sch_contact.email}`}
                className='flex flex-col gap-2 items-cente justify-center items-center'
              >
                <RiMailLine className='text-[--main-color]' />
                <p className='w-full text-ellipsis w-full overflow-hidden'>
                  {school.sch_contact.email}
                </p>
              </Link>
            </div>

            <div>
              <Link
                to={school.sch_contact.facebook || '#'}
                target='_blank'
                rel='noreferrer'
                className='flex flex-col gap-2 items-center justify-center w-full'
              >
                <RiFacebookCircleFill className='text-[--main-color]' />
                <p>Facebook</p>
              </Link>
            </div>

            <div>
              <Link
                to={school.sch_contact.website || '#'}
                target='_blank'
                rel='noreferrer'
                className='flex flex-col gap-2 items-center justify-center w-full'
              >
                <RiGlobalLine className='text-[--main-color]' />
                <p>Website</p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

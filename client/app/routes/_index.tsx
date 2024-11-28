import { json, type MetaFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';
import {
  RiBookOpenLine,
  RiFileListLine,
  RiGroupLine,
  RiIdCardLine,
  RiUserFollowLine,
  RiUserStarLine,
} from '@remixicon/react';
import { useState } from 'react';
import Footer from '~/components/Footer';

import Header from '~/components/Header';
import ItemList from '~/components/ItemList';
import Post from '~/widgets/Post';
import Card from '~/widgets/Card';
import Specifications from '~/widgets/Specifications';

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export default function Index() {
  const [items, setItems] = useState(schools);

  return (
    <main className='mt-16 grid gap-y-16'>
      <Header />

      <Link to='/'>
        <img src='/banner.png' alt='' />
      </Link>

      <Specifications />

      <section className='container'>
        <h2 className='title'>Tin mới</h2>

        <Post
          post={{
            thumbnail: '/news.png',
            title:
              'KiddiHub giới thiệu tài liệu "Ranking Top 100 Trường Hot Nhất Tháng 10" – thông tin đáng giá về xu hướng và chất lượng giáo dục mầm non',
            excerpt:
              'Trong bối cảnh các tiêu chí lựa chọn trường mầm non của phụ huynh đang không ngừng thay đổi, KiddiHub hân hạnh giới thiệu tài liệu "Ranking Top 100 Trường Hot Nhất Tháng 10" nhằm cung cấp những thông tin cập nhật và chuyên sâu về xu hướng chọn trường, giúp các chủ trường và nhà đầu tư giáo dục định hình rõ hơn về thị trường ...',
            slug: 'ranking-top-100-truong-hot-nhat-thang-10',
          }}
        />
      </section>

      <section className='container'>
        <h2 className='title'>DÀNH CHO PHỤ HUYNH</h2>

        <section>
          <div className='my-6'>
            <button
              className={
                'inline-flex items-center rounded border border-[--main-color] px-4 py-2 text-sm font-semibold text-[--main-color] transition-all hover:shadow-lg disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none' +
                (items === schools ? ' bg-[--main-color] text-white' : '')
              }
              onClick={() => {
                setItems(schools);
              }}
            >
              Trường
            </button>

            <button
              className={
                'inline-flex items-center rounded border border-[--main-color] px-4 py-2 text-sm font-semibold text-[--main-color] transition-all hover:shadow-lg disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-4' +
                (items === centers ? ' bg-[--main-color] text-white' : '')
              }
              onClick={() => {
                setItems(centers);
              }}
            >
              Trung tâm
            </button>
          </div>

          <ItemList items={items} />

          <div className='mt-6'>
            <Link
              to='/blog/tutorial'
              className='text-[--main-color] underline text-sm'
            >
              <i>Hướng dẫn cách tìm trường phù hợp và nhanh nhất</i>
            </Link>
          </div>
        </section>

        <section className='mt-6'>
          <h3 className='text-lg'>
            <b>Tìm kiếm gia sư, bảo mẫu cho bé</b>
          </h3>

          <div className='grid gap-6 grid-cols-12 mt-4'>
            {[
              {
                tag: 'KiddiHub store',
                image: 'https://s3.kiddihub.site/prod/hethongdochoi.png',
                title: 'Hệ thống đồ chơi thông minh, giáo dục sớm.',
                link: '/',
                description:
                  'Mua sắm đồ chơi thông minh, sáng tạo giáo dục sớm dành cho trẻ em.',
              },
              {
                tag: 'KiddiHub store',
                image: 'https://s3.kiddihub.site/prod/hethongdochoi.png',
                title: 'Hệ thống đồ chơi thông minh, giáo dục sớm.',
                link: '/',
                description:
                  'Mua sắm đồ chơi thông minh, sáng tạo giáo dục sớm dành cho trẻ em.',
              },
            ].map((data, i) => (
              <Card data={data} key={i} />
            ))}
          </div>
        </section>

        <section className='gap-6 mt-6'>
          <h3 className='text-lg'>
            <b>Tiện ích khác</b>
          </h3>

          <div className='grid gap-6 grid-cols-12 mt-4'>
            {[
              {
                tag: 'KiddiHub store',
                image: 'https://s3.kiddihub.site/prod/hethongdochoi.png',
                title: 'Hệ thống đồ chơi thông minh, giáo dục sớm.',
                link: '/',
                description:
                  'Mua sắm đồ chơi thông minh, sáng tạo giáo dục sớm dành cho trẻ em.',
              },
              {
                tag: 'KiddiHub store',
                image: 'https://s3.kiddihub.site/prod/hethongdochoi.png',
                title: 'Hệ thống đồ chơi thông minh, giáo dục sớm.',
                link: '/',
                description:
                  'Mua sắm đồ chơi thông minh, sáng tạo giáo dục sớm dành cho trẻ em.',
              },
            ].map((data, i) => (
              <Card data={data} key={i} />
            ))}
          </div>
        </section>
      </section>

      <section>
        <div className='container'>
          <h2 className='title'>DÀNH CHO CHỦ TRƯỜNG</h2>

          <div className='flex flex-col lg:grid grid-cols-12 mt-4'>
            <div className='col-span-6'>
              <ul>
                {services.map((service, i) => (
                  <li
                    key={i}
                    className='rounded-lg shadow-lg border px-4 py-2 mt-4 flex items-center justify-between gap-4'
                  >
                    <p className='uppercase text-[--sub2-text-color] text-sm'>
                      {service.title}
                    </p>

                    <div>
                      <Link
                        to={service.link}
                        className='block w-max bg-[--main-color] text-[--sub3-text-color] px-2 py-1 rounded font-medium'
                      >
                        Xem thêm
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className='col-span-6'>
              <img src='/illustration.png' alt='Các dịch vụ của chủ trường' />
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className='container'>
          <h2 className='title'>ĐỐI TÁC</h2>

          <div className='flex flex-col lg:flex-row justify-between items-center mt-8 gap-8 lg:gap-0 items-center justify-center'>
            {partners.map((partner, i) => (
              <Link to={partner.link} key={i} className='block h-full'>
                <img
                  src={partner.logo}
                  alt={partner.name + ' logo'}
                  title={partner.name}
                  className='object-cover h-16 md:h-24'
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className='container'>
          <h2 className='title'>VÌ SAO NÊN CHỌN KIDDIHUB</h2>

          <div className='grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-6 mt-8'>
            <div className='col-span-4 flex items-center border border-zinc-200 shadow-lg rounded-lg p-4 gap-4'>
              <div>
                <RiGroupLine size={40} color='var(--main-color)' />
              </div>

              <p className='font-semibold'>
                <span className='text-[--main-color]'>40 triệu</span> lượt phụ
                huynh truy cập
              </p>
            </div>

            <div className='col-span-4 flex items-center border border-zinc-200 shadow-lg rounded-lg p-4 gap-4'>
              <div>
                <RiUserFollowLine size={40} color='var(--main-color)' />
              </div>

              <p className='font-semibold'>
                <span className='text-[--main-color]'>182 nghìn</span> lượt phụ
                huynh tin tưởng và đăng ký học
              </p>
            </div>

            <div className='col-span-4 flex items-center border border-zinc-200 shadow-lg rounded-lg p-4 gap-4'>
              <div>
                <RiUserStarLine size={40} color='var(--main-color)' />
              </div>

              <p className='font-semibold'>
                <span className='text-[--main-color]'>38 nghìn</span> lượt đánh
                giá từ phụ huynh
              </p>
            </div>

            <div className='col-span-4 flex items-center border border-zinc-200 shadow-lg rounded-lg p-4 gap-4'>
              <div>
                <RiFileListLine size={40} color='var(--main-color)' />
              </div>

              <p className='font-semibold'>
                Thông tin chính xác, đầy đủ và cập nhật thường xuyên
              </p>
            </div>

            <div className='col-span-4 flex items-center border border-zinc-200 shadow-lg rounded-lg p-4 gap-4'>
              <div>
                <RiIdCardLine size={40} color='var(--main-color)' />
              </div>

              <p className='font-semibold'>
                Tốc độ phản hồi từ phía nhà trường, trung tâm trong 1 phút
              </p>
            </div>

            <div className='col-span-4 flex items-center border border-zinc-200 shadow-lg rounded-lg p-4 gap-4'>
              <div>
                <RiBookOpenLine size={40} color='var(--main-color)' />
              </div>

              <p className='font-semibold'>
                Gợi ý chính xác theo nhu cầu về chương trình học, học phí
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className='container'>
          <h2 className='title'>DÀNH CHO GIÁO VIÊN</h2>

          <div className='grid grid-cols-12 gap-6 mt-8'>
            {[
              {
                tag: 'KiddiHub store',
                image: 'https://s3.kiddihub.site/prod/hethongdochoi.png',
                title: 'Hệ thống đồ chơi thông minh, giáo dục sớm.',
                link: '/',
                description:
                  'Mua sắm đồ chơi thông minh, sáng tạo giáo dục sớm dành cho trẻ em.',
              },
              {
                tag: 'KiddiHub store',
                image: 'https://s3.kiddihub.site/prod/hethongdochoi.png',
                title: 'Hệ thống đồ chơi thông minh, giáo dục sớm.',
                link: '/',
                description:
                  'Mua sắm đồ chơi thông minh, sáng tạo giáo dục sớm dành cho trẻ em.',
              },
            ].map((data, i) => (
              <Card data={data} key={i} />
            ))}
          </div>
        </div>
      </section>

      <section className='bg-white py-8'>
        <div className='container'>
          <h2 className='title'>TRUYỀN THÔNG NÓI GÌ VỀ KIDDIHUB</h2>

          <div className='flex flex-col lg:grid grid-cols-12 gap-6 mt-8'>
            <section className='col-span-6 px-32'>
              <img src='/illus-social.png' alt='illustration image' />
            </section>

            <section className='col-span-6 grid grid-cols-6 gap-12'>
              {newspapers.map((newspaper, i) => (
                <Link to={newspaper.link} key={i} className='col-span-2'>
                  <img
                    src={newspaper.image}
                    alt='newspaper logo'
                    className='object-contain h-full'
                  />
                </Link>
              ))}
            </section>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

const schools = [
  {
    title: 'Trường mầm non',
    slug: 'truong-mam-non',
    thumbnail:
      'https://s3.ap-southeast-1.amazonaws.com/kiddihub-prod/1/YdXJB0S5ITJEODXv-GMIQfkOJyBmQkXmH.jpg',
    count: 9978,
  },
  {
    title: 'trường tiểu học',
    slug: 'truong-tieu-hoc',
    thumbnail:
      'https://s3.ap-southeast-1.amazonaws.com/kiddihub-prod/1/YdXJB0S5ITJEODXv-GMIQfkOJyBmQkXmH.jpg',
    count: 789,
  },
  {
    title: 'Trường THCS',
    slug: 'truong-thcs',
    thumbnail:
      'https://s3.ap-southeast-1.amazonaws.com/kiddihub-prod/1/YdXJB0S5ITJEODXv-GMIQfkOJyBmQkXmH.jpg',
    count: 123,
  },
  {
    title: 'Trường THPT',
    slug: 'truong-thpt',
    thumbnail:
      'https://s3.ap-southeast-1.amazonaws.com/kiddihub-prod/1/YdXJB0S5ITJEODXv-GMIQfkOJyBmQkXmH.jpg',
    count: 456,
  },
  {
    title: 'Trường quốc tế',
    slug: 'truong-quoc-te',
    thumbnail:
      'https://s3.ap-southeast-1.amazonaws.com/kiddihub-prod/1/YdXJB0S5ITJEODXv-GMIQfkOJyBmQkXmH.jpg',
    count: 789,
  },
  {
    title: 'Trường trung cấp nghề',
    slug: 'truong-trung-cap-nghe',
    thumbnail:
      'https://s3.ap-southeast-1.amazonaws.com/kiddihub-prod/1/YdXJB0S5ITJEODXv-GMIQfkOJyBmQkXmH.jpg',
    count: 123,
  },
  {
    title: 'Trường cao đẳng',
    slug: 'truong-cao-dang',
    thumbnail:
      'https://s3.ap-southeast-1.amazonaws.com/kiddihub-prod/1/YdXJB0S5ITJEODXv-GMIQfkOJyBmQkXmH.jpg',
    count: 456,
  },
  {
    title: 'Trường đại học',
    slug: 'truong-dai-hoc',
    thumbnail:
      'https://s3.ap-southeast-1.amazonaws.com/kiddihub-prod/1/YdXJB0S5ITJEODXv-GMIQfkOJyBmQkXmH.jpg',
    count: 789,
  },
];

const centers = [
  {
    thumbnail:
      'https://s3.ap-southeast-1.amazonaws.com/kiddihub-prod/1/YdXJB0S5ITJEODXv-GMIQfkOJyBmQkXmH.jpg',
    title: 'Trung tâm tiếng Anh',
    slug: 'trung-tam-tieng-anh',
    count: 1922,
  },
  {
    thumbnail:
      'https://s3.ap-southeast-1.amazonaws.com/kiddihub-prod/1/eghdEP7dod63W53T-ytwo3eeLKOe0RK6a.jpg',
    title: 'Trung tâm dạy nhạc',
    slug: 'trung-tam-day-nhac',
    count: 200,
  },
  {
    thumbnail:
      'https://s3.ap-southeast-1.amazonaws.com/kiddihub-prod/1/B9EFfouVyd5Ymdyx-bMI05NZVZh24bd5Y.jpg',
    title: 'Trung tâm dạy toán',
    slug: 'trung-tam-day-toan',
    count: 522,
  },
  {
    thumbnail:
      'https://s3.ap-southeast-1.amazonaws.com/kiddihub-prod/1/3Wel9TM63CQP2xn3-LkPahaDiH4eDJpBz.jpg',
    title: 'Trung tâm kỹ năng sống',
    slug: 'trung-tam-ky-nang-song',
    count: 244,
  },
  {
    thumbnail:
      'https://s3.ap-southeast-1.amazonaws.com/kiddihub-prod/1/9qLjEH6Jp43FS2Nl-ZL2ZruiODPDdh0ar.jpg',
    title: 'Trung tâm tiếng Nhật',
    slug: 'trung-tam-tieng-nhat',
    count: 83,
  },
  {
    thumbnail:
      'https://s3.ap-southeast-1.amazonaws.com/kiddihub-prod/1/KZFxTsacAiDhZw1t-RgG9rF9uxcFR4CtZ.jpg',
    title: 'Trung tâm dạy bơi',
    slug: 'trung-tam-day-boi',
    count: 23,
  },
  {
    thumbnail:
      'https://s3.ap-southeast-1.amazonaws.com/kiddihub-prod/1/0kdA7DshiqPrDSYr-1K9R2kMxSTkobOkd.jpg',
    title: 'Luyện viết chữ đẹp',
    slug: 'luyen-viet-chu-dep',
    count: 80,
  },
  {
    thumbnail:
      'https://s3.ap-southeast-1.amazonaws.com/kiddihub-prod/1/AKXtRF8dMz7U3gsc-uFerJXeUzqxlZOP7.jpg',
    title: 'Trung Tâm Mỹ Thuật',
    slug: 'trung-tam-my-thuat',
    count: 303,
  },
  {
    thumbnail:
      'https://s3.ap-southeast-1.amazonaws.com/kiddihub-prod/1/0or5SvBwwia1lzaU-NMYjfksBOBRAhC40.jpg',
    title: 'Trung tâm dạy cờ vua',
    slug: 'trung-tam-day-co-vua',
    count: 91,
  },
  {
    thumbnail:
      'https://s3.ap-southeast-1.amazonaws.com/kiddihub-prod/1/F0QLskk0RZAHcWPs-3QhJBQW8ve2lrKqV.jpg',
    title: 'Trung tâm dạy múa',
    slug: 'trung-tam-day-mua',
    count: 58,
  },
  {
    thumbnail:
      'https://s3.ap-southeast-1.amazonaws.com/kiddihub-prod/1/LZc2sJfViDLNbUYs-W1cayId4VzWXdwX4.jpg',
    title: 'Trung tâm đào tạo MC',
    slug: 'trung-tam-dao-tao-mc',
    count: 53,
  },
  {
    thumbnail:
      'https://s3.ap-southeast-1.amazonaws.com/kiddihub-prod/1/AgJYakZ8MYLppa7w-cwBtbXTYLy3rutUy.jpg',
    title: 'Trung tâm dạy nhảy',
    slug: 'trung-tam-day-nhay',
    count: 55,
  },
  {
    thumbnail:
      'https://s3.ap-southeast-1.amazonaws.com/kiddihub-prod/1/mMKZP4zlQ7DIsyZP-368WSvOILjl2472t.jpg',
    title: 'Trung tâm dành cho trẻ đặc biệt',
    slug: 'trung-tam-danh-cho-tre-dac-biet',
    count: 324,
  },
  {
    thumbnail:
      'https://s3.ap-southeast-1.amazonaws.com/kiddihub-prod/1/eNOQ6O4NqyB5ow2X-6MZ2JaRcU6VXsran.jpg',
    title: 'Trung tâm tiếng Trung',
    slug: 'trung-tam-tieng-trung',
    count: 204,
  },
  {
    thumbnail:
      'https://s3.ap-southeast-1.amazonaws.com/kiddihub-prod/1/FyxybLnRmecXq5vQ-2SANowh7CioO8R42.jpg',
    title: 'Trung tâm mẫu nhí',
    slug: 'trung-tam-mau-nhi',
    count: 9,
  },
  {
    thumbnail:
      'https://s3.ap-southeast-1.amazonaws.com/kiddihub-prod/1/tdA8SlOKcM6wMkyx-jghKPK1JZSkHW6Lj.png',
    title: 'Trung tâm dạy kèm, trung tâm gia sư',
    slug: 'trung-tam-day-kem-trung-tam-gia-su',
    count: 142,
  },
  {
    thumbnail:
      'https://s3.ap-southeast-1.amazonaws.com/kiddihub-prod/1/gmCwYadVWzRhMbLR-leWGkvhUlNViLcbe.png',
    title: 'Trông trẻ',
    slug: 'trong-tre',
    count: 0,
  },
  {
    thumbnail:
      'https://s3.ap-southeast-1.amazonaws.com/kiddihub-prod/1/bmk6OmM6RfTw3OJA-QsPJFBZOU5tQ0oae.jpg',
    title: 'Trung tâm đào tạo lập trình viên nhí',
    slug: 'trung-tam-dao-tao-lap-trinh-vien-nhi',
    count: 14,
  },
  {
    thumbnail:
      'https://s3.ap-southeast-1.amazonaws.com/kiddihub-prod/1/u1ifzpU8AWcxj1aj-RBJPDUlKbW64R6RG.jpg',
    title: 'Trung tâm tiếng Hàn',
    slug: 'trung-tam-tieng-han',
    count: 91,
  },
  {
    thumbnail:
      'https://s3.ap-southeast-1.amazonaws.com/kiddihub-prod/1/z7YDL37wFjE7sd4Y-nhKLjcQjhfSl9z8z.png',
    title: 'Tiền Tiểu Học',
    slug: 'tien-tieu-hoc',
    count: 10,
  },
  {
    thumbnail:
      'https://s3.ap-southeast-1.amazonaws.com/kiddihub-prod/1/pIUJmqhBvbhJh1T3-3GN2iLoKSxccikcc.png',
    title: 'Trung tâm tiếng Anh Online',
    slug: 'trung-tam-tieng-anh-online',
    count: 15,
  },
  {
    thumbnail:
      'https://s3.ap-southeast-1.amazonaws.com/kiddihub-prod/1/4lNi8UEJNZbMWJ2b-WSEG1pSCGmMuk6JI.png',
    title: 'Trung tâm tư vấn du học',
    slug: 'trung-tam-tu-van-du-hoc',
    count: 3,
  },
  {
    thumbnail:
      'https://s3.ap-southeast-1.amazonaws.com/kiddihub-prod/1/Wus7s4qfJqvxlpnv-mtvzmLvuXVxNkwEi.jpg',
    title: 'Trung tâm luyện thi đại học',
    slug: 'trung-tam-luyen-thi-dai-hoc',
    count: 0,
  },
  {
    thumbnail:
      'https://s3.ap-southeast-1.amazonaws.com/kiddihub-prod/1/RfWXQANfNdn0hXdd-3vg3YYhRfcaHxjSd.jpg',
    title: 'Trung tâm luyện thi cấp 3',
    slug: 'trung-tam-luyen-thi-cap-3',
    count: 0,
  },
  {
    thumbnail:
      'https://s3.ap-southeast-1.amazonaws.com/kiddihub-prod/1/RxXppD0Y1GncDFT7-vkTxiEHlcdIFqf2N.jpg',
    title: 'Trung tâm luyện thi cấp 2',
    slug: 'trung-tam-luyen-thi-cap-2',
    count: 0,
  },
  {
    thumbnail:
      'https://s3.ap-southeast-1.amazonaws.com/kiddihub-prod/1/Utnhcp9SYYxuqop6-v99NwR7jg9Xfv9ST.png',
    title: 'Trung tâm tiếng Pháp',
    slug: 'trung-tam-tieng-phap',
    count: 1,
  },
  {
    thumbnail:
      'https://s3.ap-southeast-1.amazonaws.com/kiddihub-prod/1/5jk2ilzQPtSy9Lb4-uTRTw1AYiESRFbpi.png',
    title: 'Trung Tâm Bồi Dưỡng Cán bộ, Quản Lý Giáo Dục',
    slug: 'trung-tam-boi-duong-can-bo-quan-ly-giao-duc',
    count: 0,
  },
];

const partners = [
  {
    name: 'gakken',
    logo: 'https://gakkensteamprogram.vn/wp-content/uploads/2023/10/Gakken-logo.png',
    link: 'https://gakken.vn',
  },
  {
    name: 'kidsup',
    logo: 'https://www.kidsup.net/wp-content/uploads/2021/11/logo_kidsup.svg',
    link: 'https://kidsup.vn',
  },
  {
    name: 'littlelives',
    logo: 'https://cdn-1.littlelives.com/img/8600690.svg',
    link: 'https://littlelives.vn',
  },
  {
    name: 'UEd',
    logo: 'https://logotruonghoc.vinadesign.vn/logo-img/logo-dai-hoc-giao-duc.jpg',
    link: 'https://edu.vnu.edu.vn',
  },
];

const newspapers = [
  {
    link: 'https://vtv.vn/goc-doanh-nghiep/kiddihub-va-gakken-holdings-trao-doi-van-kien-hop-tac-duoi-su-chung-kien-cua-thu-tuong-pham-minh-chinh-20211129164742809.htm',
    image: 'https://s3.kiddihub.site/prod/vtv.png',
  },
  {
    link: 'https://giaoducthoidai.vn/kiddihub-va-tap-doan-gakken-holdings-nhat-ban-trao-doi-bien-ban-ghi-nho-hop-tac-post464262.html',
    image: 'https://s3.kiddihub.site/prod/giaoducthoidai.png',
  },
  {
    link: 'https://www.24h.com.vn/tin-tuc-giao-duc/dau-dau-voi-bai-toan-tuyen-sinh-mam-non-tu-thuc-c678a1192843.html',
    image: 'https://s3.kiddihub.site/prod/24h.png',
  },
  {
    link: 'https://phunutoday.vn/chon-truong-mam-non-dung-qua-voi-vang-hay-ki-cang-voi-kiddihub-d267366.html',
    image: 'https://s3.kiddihub.site/prod/phunutoday.png',
  },
  {
    link: 'https://tamsugiadinh.vn/luu-y-khi-cha-me-chon-truong-mam-non-qua-internet/',
    image: 'https://s3.kiddihub.site/prod/tamsugiadinh.png',
  },
  {
    link: 'https://tinmoi.vn/chon-truong-mam-non-thoi-dai-cong-nghe-so-nhanh-chong-ma-van-du-thong-tin-011560997.html',
    image: 'https://s3.kiddihub.site/prod/tinmoi.png',
  },
];

const services = [
  {
    title: 'CÁC DỊCH VỤ TUYỂN SINH MẦM NON ĐA KÊNH CỦA KIDDIHUB',
    link: '/',
  },
  {
    title:
      'ÁP DỤNG STEAM CỦA TẬP ĐOÀN HÀNG ĐẦU NHẬT BẢN (GSP) ĐỂ NÂNG CAO LỢI THẾ TUYỂN SINH',
    link: '/',
  },
  {
    title: 'CÁC DỊCH VỤ TUYỂN SINH MẦM NON ĐA KÊNH CỦA KIDDIHUB',
    link: '/',
  },
  {
    title:
      'ÁP DỤNG STEAM CỦA TẬP ĐOÀN HÀNG ĐẦU NHẬT BẢN (GSP) ĐỂ NÂNG CAO LỢI THẾ TUYỂN SINH',
    link: '/',
  },
  {
    title: 'CÁC DỊCH VỤ TUYỂN SINH MẦM NON ĐA KÊNH CỦA KIDDIHUB',
    link: '/',
  },
];

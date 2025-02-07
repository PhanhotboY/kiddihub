import { IPageDetail } from '~/interfaces/page.interface';
import { getPublicPeriod } from '~/lib';
import { useRootLoaderData } from '~/lib/useRootLoaderData';
import { RiEyeFill } from '@remixicon/react';

import './index.css';

export default function PostDetail({ post }: { post: IPageDetail }) {
  const { appSettings } = useRootLoaderData();

  return (
    <section id='post-detail' className='col-span-6 text-[--sub1-text-color]'>
      <article className={`block print:m-0`}>
        <img
          className='w-32 m-auto hidden print:block'
          src={appSettings.app_logo}
          alt={appSettings.app_meta.title}
        />
        <h1 className='!text-3xl font-semibold my-4'>{post.pst_title}</h1>

        <div className='flex md:block items-center border-y py-1'>
          <time className='text-sm' dateTime={getPublicPeriod(post.createdAt)}>
            {getPublicPeriod(post.createdAt)}
          </time>
          <span className='mx-2'>|</span>
          <RiEyeFill size={16} className='inline text-[--main-color] mr-1' />
          {post.pst_views}
        </div>

        <section
          id='post-body'
          dangerouslySetInnerHTML={{ __html: post.pst_content }}
        ></section>
      </article>
    </section>
  );
}

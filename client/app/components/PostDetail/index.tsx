import { IPostDetail } from '~/interfaces/post.interface';
import './index.css';
import { getPublicPeriod } from '~/lib';
import { useRootLoaderData } from '~/lib/useRootLoaderData';

export default function PostDetail({ post }: { post: IPostDetail }) {
  const { appSettings } = useRootLoaderData();

  return (
    <section id='post_detail' className='col-span-6'>
      <article className={`block print:m-0`}>
        <img
          className='w-32 m-auto hidden print:block'
          src={appSettings.app_logo}
          alt={appSettings.app_meta.title}
        />
        <h1 className='!text-3xl font-semibold my-4'>{post.pst_title}</h1>

        <div className='flex md:block items-center border-y py-4'>
          <time className='text-sm' dateTime={getPublicPeriod(post.createdAt)}>
            {getPublicPeriod(post.createdAt)}
          </time>
        </div>

        <p dangerouslySetInnerHTML={{ __html: post.pst_content }}></p>
      </article>
    </section>
  );
}

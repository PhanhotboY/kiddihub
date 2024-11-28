import { Link } from '@remix-run/react';
import { format } from 'date-fns';

export default function PostCard({
  post,
  cols,
}: {
  post: {
    id: string;
    pst_title: string;
    pst_thumbnail: string;
    pst_views: number;
    updatedAt: string;
  };
  cols?: { sm?: number; md?: number; lg?: number; xl?: number };
}) {
  const colClasses = `col-span-3 sm:col-span-${cols?.sm || 6} md:col-span-${
    cols?.md || 4
  } lg:col-span-${cols?.lg || 3} xl:col-span-${cols?.xl || 3}`;

  return (
    <div
      className={`${colClasses} group flex flex-col items-center text-dark shadow-lg p-4 border rounded-xl transition-all ease duration-300 hover:shadow-2xl`}
    >
      <Link
        to={`/cmsdesk/posts/${post.id}/edit`}
        className='w-full h-full rounded-xl overflow-hidden'
      >
        <img
          src={post.pst_thumbnail}
          alt={post.pst_title}
          className='aspect-video w-full object-cover object-center  group-hover:scale-105 transition-all ease duration-300 '
        />
      </Link>

      <div className='flex flex-col w-full mt-4'>
        <Link
          to={`/cmsdesk/posts/${post.id}/edit`}
          className='inline-block my-1'
        >
          <h2 className='font-semibold capitalize  text-base sm:text-lg'>
            <span
              className='bg-gradient-to-r from-accent/50 to-accent/50  dark:from-accentDark/50
              dark:to-accentDark/50
              bg-[length:0px_6px]
              group-hover:bg-[length:100%_6px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 '
            >
              {post.pst_title}
            </span>
          </h2>
        </Link>

        <span className='capitalize text-zinc-500 dark:text-light/50 text-sm'>
          {format(new Date(post.updatedAt), 'MMMM dd, yyyy')}
        </span>
      </div>
    </div>
  );
}

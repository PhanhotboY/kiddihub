import { Link } from '@remix-run/react';
import { RiStarFill } from '@remixicon/react';
import { IPost } from '~/interfaces/post.interface';

export default function SideBar({ posts }: { posts: Array<IPost> }) {
  return (
    <aside className='col-span-3 max-md:hidden'>
      <div className=' mb-4'>
        <div className='flex justify-center items-center text-[--sub3-text-color] h-fit p-2 bg-[--main-color] uppercase font-medium'>
          <RiStarFill />
          <h2 className='ml-2 text-inherit'>Mới cập nhật</h2>
        </div>

        <div className='shadow-xl flex flex-col divide-y px-4 border '>
          {posts.slice(0, 4).map((a, i) => (
            <article key={i} className='w-full h-fit py-2'>
              <p
                className='hover:text-[--main-color]'
                style={{
                  display: '-webkit-box',
                  textOverflow: 'ellipsis',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflowWrap: 'break-word',
                  overflow: 'hidden',
                }}
              >
                <Link
                  to={`/blog/doc/${a.pst_slug}`}
                  dangerouslySetInnerHTML={{
                    __html: a.pst_excerpt,
                  }}
                ></Link>
              </p>
            </article>
          ))}
        </div>
      </div>
    </aside>
  );
}

import { Link } from '@remix-run/react';
import { getPublicPeriod } from '~/lib';
import { IPost } from '~/interfaces/post.interface';

export default function VerticalArtical({
  post,
  detailed = false,
  important = false,
  className = '',
}: {
  post: IPost;
  detailed?: boolean;
  important?: boolean;
  className?: string;
}) {
  return (
    <article className={`${className} col-span-3 flex-col`}>
      <figure className='hover:text-[--main-color]'>
        <Link to={`/blog/doc/${post.pst_slug}`} className='thumb-wrapper'>
          <img
            src={post.pst_thumbnail}
            alt={post.pst_title}
            title={post.pst_title}
          />
        </Link>

        <div className='content flex flex-col col-span-4'>
          <h2
            className={`${
              important ? 'text-2xl' : 'text-base'
            } text-inherit mt-2 max-md:px-2`}
            title={post.pst_title}
            style={{
              display: '-webkit-box',
              textOverflow: 'ellipsis',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflowWrap: 'break-word',
              overflow: 'hidden',
            }}
          >
            <Link to={`/blog/doc/${post.pst_slug}`}>{post.pst_title}</Link>
          </h2>
        </div>
      </figure>

      {detailed && (
        <div className='max-md:px-2'>
          <div className='m-1 md:m-4'>
            <time className='text-xs' dateTime={post.createdAt}>
              {getPublicPeriod(post.createdAt)}
            </time>
          </div>

          <p
            dangerouslySetInnerHTML={{ __html: post.pst_excerpt }}
            style={{
              display: '-webkit-box',
              textOverflow: 'ellipsis',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflowWrap: 'break-word',
              overflow: 'hidden',
            }}
          ></p>
        </div>
      )}
    </article>
  );
}

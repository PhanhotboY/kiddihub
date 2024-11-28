import { Link } from '@remix-run/react';
import clsx from 'classnames';
import { IPost } from '~/interfaces/post.interface';
import { getPublicPeriod } from '~/lib';
import Hydrated from '../Hydrated';

export default function HorizontalPost({
  post,
  detailed = false,
  important = false,
  ratio = '6/4',
  colSpan = 10,
  className,
}: {
  post: IPost;
  detailed?: boolean;
  important?: boolean;
  ratio?: string;
  colSpan?: number;
  className?: string;
}) {
  const wrapperClass = clsx(
    'rank-1',
    'block',
    'md:grid',
    `grid-cols-${colSpan}`,
    `col-span-${colSpan}`,
    important ? 'gap-1 md:gap-4' : 'gap-3 pb-2.5',
    className
  );
  const imgClass = clsx('thumb-wrapper', `col-span-${ratio.split('/')[0]}`);
  const contentClass = clsx(
    'content',
    'flex',
    'flex-col',
    `col-span-${ratio.split('/')[1]}`
  );

  return (
    <article className={wrapperClass}>
      <figure className={`${imgClass} max-md:mb-2`}>
        <Link to={`/blog/doc/${post.pst_slug}`}>
          <img
            src={post.pst_thumbnail}
            alt={post.pst_title}
            title={post.pst_title}
          />
        </Link>
      </figure>

      <div className={`${contentClass} px-2`}>
        <h2
          className={`${
            important ? 'text-base md:text-xl' : 'text-sm'
          } hover:text-[--main-color]`}
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

        <div
          className={`${
            important ? 'text-sm italic m-1 md:m-4' : 'text-xs m-1'
          }`}
        >
          <time dateTime={post.updatedAt}>
            {getPublicPeriod(post.updatedAt)}
          </time>
        </div>

        {detailed && (
          <Hydrated>
            {() => (
              <p
                className='max-h-12 text-base'
                style={{
                  display: '-webkit-box',
                  textOverflow: 'ellipsis',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflowWrap: 'break-word',
                  overflow: 'hidden',
                }}
                dangerouslySetInnerHTML={{
                  __html: post.pst_excerpt,
                }}
              ></p>
            )}
          </Hydrated>
        )}
      </div>
    </article>
  );
}

import { Link } from '@remix-run/react';
import { getPublicPeriod } from '~/lib';
import { IPage } from '~/interfaces/page.interface';
import { RiEyeFill } from '@remixicon/react';

export default function VerticalArtical({
  page,
  detailed = false,
  important = false,
  className = '',
}: {
  page: IPage;
  detailed?: boolean;
  important?: boolean;
  className?: string;
}) {
  return (
    <article
      className={`${className} col-span-3 flex-col text-[--sub1-text-color]`}
    >
      <figure className='hover:text-[--main-color]'>
        <Link to={`/blog/doc/${page.pst_slug}`} className='thumb-wrapper'>
          <img
            src={page.pst_thumbnail}
            alt={page.pst_title}
            title={page.pst_title}
          />
        </Link>

        <div className='content flex flex-col col-span-4'>
          <h2
            className={`${
              important ? 'text-2xl' : 'text-base'
            } text-inherit mt-2 max-md:px-2`}
            title={page.pst_title}
            style={{
              display: '-webkit-box',
              textOverflow: 'ellipsis',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflowWrap: 'break-word',
              overflow: 'hidden',
            }}
          >
            <Link to={`/blog/doc/${page.pst_slug}`}>{page.pst_title}</Link>
          </h2>
        </div>
      </figure>

      {detailed && (
        <div className='max-md:px-2'>
          <div className='m-1 md:m-4 flex items-center'>
            <time className='text-xs' dateTime={page.createdAt}>
              {getPublicPeriod(page.createdAt)}
            </time>
            <p className='mx-2'>|</p>{' '}
            <RiEyeFill size={16} className='mr-1 text-[--main-color]' />
            {page.pst_views}
          </div>

          <p
            dangerouslySetInnerHTML={{ __html: page.pst_excerpt }}
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

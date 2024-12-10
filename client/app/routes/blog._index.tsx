import {
  defer,
  json,
  LinksFunction,
  LoaderFunctionArgs,
} from '@remix-run/node';

import PostBox from '~/components/PostBox';
import { IPost } from '~/interfaces/post.interface';
import SeemoreButton from '~/components/SeemoreButton';
import SmallPostBox from '~/components/SmallPostBox';
import VerticalArtical from '~/components/Post/Vertical';
import HorizontalPost from '~/components/Post/Horizontal';
import { getPosts } from '~/services/post.server';
import { Link, useLoaderData } from '@remix-run/react';
import Defer from '~/components/Defer';

export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: 'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css',
    },
    {
      rel: 'stylesheet',
      href: 'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css',
    },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  try {
    const posts = getPosts();

    return defer({ posts });
  } catch (error) {
    throw new Error('Failed to load data', (error as any).message);
  }
};

export default function Index() {
  const { posts } = useLoaderData<typeof loader>();

  return (
    <div className='container gap-y-20 py-4 mb-6'>
      <div className='grid grid-cols-12 gap-y-8 md:gap-y-20'>
        <Defer resolve={posts}>{(p) => <Overview posts={p} />}</Defer>

        <SmallPostBox postsGetter={() => posts} height={500} showSidebar />

        <PostBox postsGetter={() => posts} />

        <SmallPostBox postsGetter={() => posts} height={500} showSidebar />

        <PostBox postsGetter={() => posts} />

        <div className='col-span-12'>
          <SeemoreButton href='/blog/tin-moi' />
        </div>
      </div>
    </div>
  );
}

const Overview = ({ posts }: { posts: IPost[] }) => {
  return (
    <div className='col-span-full grid grid-cols-12 gap-y-4 md:gap-6 mt-5'>
      <HorizontalPost
        post={posts[0]}
        detailed
        important
        colSpan={10}
        ratio='6/4'
        className='max-lg:col-span-full'
      />

      <div className='col-span-2 hidden lg:flex flex-col justify-between'>
        {posts.slice(1, 3).map((a, i) => (
          <VerticalArtical post={a} key={i} className='mb-4' />
        ))}
      </div>

      <div className='col-span-full border-b md:hidden'></div>

      {posts.slice(3, 7).map((a, i) => (
        <VerticalArtical
          post={a}
          key={i}
          className='max-md:col-span-6 max-md:px-2'
        />
      ))}
    </div>
  );
};

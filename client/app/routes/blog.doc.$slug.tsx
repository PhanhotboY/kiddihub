import { lazy, Suspense, useEffect, useState } from 'react';
import { defer, LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { Await, Link, useFetcher, useLoaderData } from '@remix-run/react';

import HandsomeError from '~/components/HandsomeError';
import { getPosts, getPostDetail } from '~/services/post.service';
import PostDetail from '~/components/PostDetail';
import Hydrated from '~/components/Hydrated';
import SameCategoryArticles from '~/widgets/SameCategoryArticles';
import ShareBox from '~/widgets/ShareBox';
import RelatedArticle from '~/widgets/RelatedArticle';
import SmallPostBox from '~/components/SmallPostBox';
import FeaturedNews from '~/components/FeaturedNews';
import ArticleList from '~/components/PostList';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const postSlug = url.pathname.split('/').pop() || '';

  const post = await getPostDetail(postSlug);

  if (!post) {
    throw new Response(null, {
      status: 404,
      statusText: 'Not Found',
    });
  }

  const relatedPosts = getPosts();

  return defer({
    post,
    relatedPosts,
  });
};

export function ErrorBoundary() {
  return <HandsomeError />;
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const { post } = data || {};
  return [{ title: post?.pst_title, description: post?.pst_excerpt }];
};

export default function Article() {
  const { post, relatedPosts } = useLoaderData<typeof loader>();

  const fetcher = useFetcher();
  const [timerReached, setTimerReached] = useState(false);
  const articleId = post.id;

  useEffect(() => {
    const storageKey = `viewed_${articleId}`;
    const now = Date.now();
    const fiveMinutes = 5 * 60 * 1000;
    const thirtySeconds = 30 * 1000;

    // Check if 5 minutes have passed since the last view increment
    const lastViewed = parseInt(localStorage.getItem(storageKey) || '0', 10);

    // Only proceed if 5 minutes have passed
    if (!lastViewed || now - lastViewed > fiveMinutes) {
      // Set a 30-second timer to check if the user stays on the article
      const timer = setTimeout(() => {
        setTimerReached(true); // Set flag to allow view increment after 30 seconds
      }, thirtySeconds);

      return () => clearTimeout(timer); // Clear timer if the component unmounts
    }
  }, [articleId]);

  useEffect(() => {
    const storageKey = `viewed_${articleId}`;
    const now = Date.now();

    // Only increment views if the 30-second timer has reached
    if (timerReached) {
      // Trigger the view increment API
      fetcher.load(`/api/increment-view?articleId=${articleId}`);

      // Store the current timestamp in localStorage to prevent further increments for 5 minutes
      localStorage.setItem(storageKey, now.toString());
    }
  }, [timerReached, articleId]);

  return (
    <div className='container items-center justify-center overflow-hidden py-4'>
      <div className='flex flex-col lg:pr-80 gap-y-6 col-span-6 max-md:px-2'>
        <Hydrated fallback={<div>Loading...</div>}>
          {() => <PostDetail post={post} />}
        </Hydrated>

        <Suspense fallback={<div>Loading...</div>}>
          <Await resolve={relatedPosts}>
            {(posts) => <RelatedArticle posts={posts} />}
          </Await>
        </Suspense>

        {/* <Hashtags hashtags={article.hashtags} /> */}

        <ShareBox />

        <Suspense fallback={<div>Loading...</div>}>
          <Await resolve={relatedPosts}>
            {(a) => <SameCategoryArticles articles={a} />}
          </Await>
        </Suspense>

        <SmallPostBox
          postsGetter={() => relatedPosts}
          detailed
          cols={12}
          ratio='7/5'
          height={500}
        />

        <Suspense fallback={<div>Loading...</div>}>
          <Await resolve={relatedPosts}>
            {(a) => !!a.length && <FeaturedNews posts={a} />}
          </Await>
        </Suspense>

        <Suspense fallback={<div>Loading...</div>}>
          <Await resolve={relatedPosts}>
            {(a) => (
              <ArticleList
                posts={a}
                postsGetter={async (page) => {
                  const res = await fetch(`/blog/posts?page=${page}`);
                  const posts = await res.json();
                  return posts;
                }}
              />
            )}
          </Await>
        </Suspense>
      </div>
    </div>
  );
}

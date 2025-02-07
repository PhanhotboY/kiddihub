import { Suspense, useEffect, useState } from 'react';
import { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { Await, useFetcher, useLoaderData } from '@remix-run/react';

import HandsomeError from '~/components/HandsomeError';
import { getPages, getPostDetail, getPosts } from '~/services/page.server';
import PostDetail from '~/components/PostDetail';
import Hydrated from '~/components/Hydrated';
import ShareBox from '~/widgets/ShareBox';
import ArticleList from '~/components/PostList';
import { authenticator } from '~/services/auth.server';

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { pageSlug } = params;

  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/cmsdesk/login',
  });

  try {
    const page = await getPostDetail(pageSlug!, user);
    const relatedPages = await getPosts();

    return {
      page,
      relatedPages,
    };
  } catch (error) {
    // console.error(error);
    throw new Response('Not found', { status: 404 });
  }
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const { page } = data || {};
  return [{ title: page?.pst_title, description: page?.pst_excerpt }];
};

export default function Article() {
  const { page, relatedPages } = useLoaderData<typeof loader>();

  const fetcher = useFetcher();
  const [timerReached, setTimerReached] = useState(false);
  const articleId = page.id;

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
      <div className='flex flex-col gap-y-6 col-span-12 max-md:px-2'>
        <Hydrated fallback={<div>Loading...</div>}>
          {() => <PostDetail page={page} />}
        </Hydrated>

        <div className='col-span-full border-b'></div>

        <ShareBox />

        <Suspense fallback={<div>Loading...</div>}>
          <Await resolve={relatedPages}>
            {(a) => {
              return (
                <ArticleList
                  posts={a}
                  postsGetter={async (post) => {
                    const res = await fetch(`/blog/pages?page=${post}`);
                    const posts = await res.json();
                    return posts;
                  }}
                />
              );
            }}
          </Await>
        </Suspense>
      </div>
    </div>
  );
}

export const ErrorHandler = () => <HandsomeError />;

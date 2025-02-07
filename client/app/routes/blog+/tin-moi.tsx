import { defer, LoaderFunctionArgs } from '@remix-run/node';
import { Await, useLoaderData } from '@remix-run/react';
import { Suspense } from 'react';
import PostList from '~/components/PostList';
import { clientFetch } from '~/lib';
import { getPages } from '~/services/page.server';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const pages = getPages();

  return { pages };
};

export default function LatestNews() {
  const { pages } = useLoaderData<typeof loader>();

  const pagesFetcher = () => {
    return clientFetch('/api/data?getter=getPages');
  };

  return (
    <section className='max-md:px-2 container my-8 grid grid-cols-12'>
      <div className='col-span-full'>
        <h3 className='text-2xl text-[--sub4-text] font-bold max-md:py-1 border-l-8 md:border-l-8 border-[color:--main-color] px-3 w-fit'>
          Tin mới nhất
        </h3>
      </div>

      <div className='mt-6 col-span-full md:col-span-9'>
        <Suspense fallback={<div>Loading...</div>}>
          <Await resolve={pages}>
            {(p) => <PostList pages={p} pagesGetter={pagesFetcher} />}
          </Await>
        </Suspense>
      </div>
    </section>
  );
}

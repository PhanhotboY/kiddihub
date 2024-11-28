import { ActionFunctionArgs, json } from '@remix-run/node';
import { useFetcher, useLoaderData, useNavigate } from '@remix-run/react';

import { createPost, getPosts } from '~/services/post.service';
import PostCard from '~/components/BlogPost/PostCard';
import { RiAddLine } from '@remixicon/react';
import { useState } from 'react';
import { authenticator } from '~/services/auth.server';

export const action = async ({ request }: ActionFunctionArgs) => {
  const user = await authenticator.isAuthenticated(request);
  switch (request.method) {
    case 'POST':
      try {
        const post = await createPost({}, user!);

        return json(post, { status: 201 });
      } catch (error) {
        console.error('Error creating post:', error);
        return json({ error: 'Failed to create post' }, { status: 500 });
      }

    default:
      return json({ error: 'Method not allowed' }, { status: 405 });
  }
};

export const loader = async () => {
  const posts = await getPosts();

  return json({ posts });
};

export default function PostManager() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { posts } = useLoaderData<typeof loader>();

  return (
    <div className='container grid grid-cols-12 gap-4'>
      {loading && <Overlay />}

      {posts.map((post: any, i: number) => (
        <PostCard post={post} key={i} />
      ))}

      <button
        className='fixed bottom-8 right-8 center rounded-lg bg-blue-500 p-3 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg active:bg-blue-500/80'
        onClick={async () => {
          try {
            const res = await fetch(
              '/cmsdesk/posts?_data=routes/cmsdesk.posts',
              {
                method: 'POST',
              }
            );
            const post = await res.json();

            navigate(`/cmsdesk/posts/${post.id}/edit`);
          } catch (error) {
            console.error('Error:', error);
            alert('Failed to create post. Please try again.');
          } finally {
            setLoading(false);
          }
        }}
      >
        <RiAddLine />
      </button>
    </div>
  );
}

const Overlay = () => {
  return (
    <div className='fixed inset-0 bg-white/50 z-40'>
      <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
        <div role='status'>
          <svg
            aria-hidden='true'
            className='w-20 h-20 text-gray-200 animate-spin fill-blue-500'
            viewBox='0 0 100 101'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
              fill='currentColor'
            />
            <path
              d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
              fill='currentFill'
            />
          </svg>
          <span className='sr-only'>Loading...</span>
        </div>
      </div>
    </div>
  );
};

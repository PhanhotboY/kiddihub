import { ActionFunctionArgs, json } from '@remix-run/node';
import { useFetcher, useLoaderData, useNavigate } from '@remix-run/react';

import { createPost, getPosts } from '~/services/post.server';
import PostCard from '~/components/BlogPost/PostCard';
import { RiAddLine } from '@remixicon/react';
import { useState } from 'react';
import { authenticator } from '~/services/auth.server';
import { toast } from 'react-toastify';
import LoadingOverlay from '~/components/LoadingOverlay';

export const action = async ({ request }: ActionFunctionArgs) => {
  const user = await authenticator.isAuthenticated(request);
  switch (request.method) {
    case 'POST':
      try {
        const post = await createPost({}, user!);

        return json(post, { status: 201 });
      } catch (error) {
        console.error('Error creating post:', error);

        return json(
          { toast: { message: 'Failed to create post', type: 'error' } },
          { status: 500 }
        );
      }

    default:
      throw new Response(null, { status: 405 });
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
      {loading && <LoadingOverlay />}

      {posts.map((post: any, i: number) => (
        <PostCard post={post} key={i} />
      ))}

      <button
        className='fixed bottom-24 right-10 center rounded-lg bg-blue-500 p-3 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg active:bg-blue-500/80'
        onClick={async () => {
          try {
            setLoading(true);
            const res = await fetch(
              '/cmsdesk/posts?_data=routes/cmsdesk.posts',
              {
                method: 'POST',
              }
            );
            const post = await res.json();

            navigate(`/cmsdesk/posts/${post.id}/edit`);
          } catch (error: any) {
            toast[(error.type as 'error') || 'error'](error.message);
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

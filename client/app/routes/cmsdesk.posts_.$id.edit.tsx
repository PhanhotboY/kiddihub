import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
  unstable_composeUploadHandlers,
  unstable_createMemoryUploadHandler,
  unstable_parseMultipartFormData,
} from '@remix-run/node';
import {
  useFetcher,
  useLoaderData,
  useNavigate,
  useParams,
} from '@remix-run/react';
import { RiCloseLine, RiUploadCloud2Line } from '@remixicon/react';
import { useEffect, useRef, useState } from 'react';
import { toast as notify } from 'react-toastify';

import Hydrated from '~/components/Hydrated';
import QuillEditor from '~/components/QuillEditor/index.client';
import { uploadImage } from '~/lib/uploadHandler.server';
import { authenticator } from '~/services/auth.server';
import { deletePost, getPostDetail, updatePost } from '~/services/post.server';

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const id = params.id;
  if (!id) {
    throw new Response(null, {
      status: 404,
      statusText: 'Post not found',
    });
  }

  const user = await authenticator.isAuthenticated(request);
  switch (request.method) {
    case 'PUT':
      try {
        const r = request.clone();
        let formData = await r.formData();
        const folder = formData.get('folder') as string;
        const file = formData.get('thumbnail') as File;
        let thumbnail;

        if (file.size > 0) {
          formData = await uploadImage(request, folder);
          thumbnail = formData.get('thumbnail') as string;
        }
        const title = formData.get('title') as string;
        const content = formData.get('content') as string;

        // Save the post to the database
        const post = await updatePost(id, { title, content, thumbnail }, user!);

        // return redirect('/cmsdesk/posts');
        return json({
          post,
          toast: { message: 'Cập nhật bài viết thành công!', type: 'success' },
        });
      } catch (error: any) {
        console.error(error);
        return json({
          toast: { message: error.message, type: 'error' },
        });
      }

    case 'DELETE':
      try {
        // Delete the post from the database
        const res = await deletePost(id, user!);
        return json({
          res,
          toast: { message: 'Xóa bài viết thành công!', type: 'success' },
        });
      } catch (error: any) {
        console.error(error);
        return json({
          toast: { message: error.message, type: 'error' },
        });
      }

    default:
      return json(
        { error: 'Method not allowed', toast: { message: 'Có lỗi xảy ra!' } },
        { status: 405 }
      );
  }
};

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const id = params.id;
  if (!id) {
    throw new Error('Post not found');
  }
  // Fetch the post from the database
  const post = await getPostDetail(id);

  return json({ post });
};

export default function EditPost() {
  const navigate = useNavigate();
  const { post } = useLoaderData<typeof loader>();
  console.log(post);
  const [isChanged, setIsChanged] = useState(false);
  const [content, setContent] = useState(post.pst_content || '');
  const [title, setTitle] = useState(post.pst_title || '');
  const [thumbnail, setThumbnail] = useState(post.pst_thumbnail || '');
  const [loading, setLoading] = useState(false);
  const params = useParams();

  const toastIdRef = useRef<any>(null);

  const fetcher = useFetcher<typeof action>();

  useEffect(() => {
    switch (fetcher.state) {
      case 'submitting':
        toastIdRef.current = notify.loading('Loadding...', {
          autoClose: false,
        });
        setLoading(true);
        break;

      case 'idle':
        if (fetcher.data?.toast && toastIdRef.current) {
          const { toast: toastData } = fetcher.data as any;
          notify.update(toastIdRef.current, {
            render: toastData.message,
            type: toastData.type || 'success', // Default to 'success' if type is not provided
            autoClose: 3000,
            isLoading: false,
          });
          toastIdRef.current = null;
          setLoading(false);
          break;
        }

        notify.update(toastIdRef.current, {
          render: fetcher.data?.toast.message,
          autoClose: 3000,
          isLoading: false,
          type: 'error',
        });

        break;
    }
  }, [fetcher.state]);

  useEffect(() => {
    setIsChanged(
      post.pst_content !== content ||
        post.pst_title !== title ||
        post.pst_thumbnail !== thumbnail
    );
  }, [post, content, title, thumbnail]);

  return (
    <fetcher.Form
      className='container flex flex-col gap-y-4'
      method='PUT'
      encType='multipart/form-data'
    >
      <div>
        <label
          htmlFor='title'
          className='block text-sm font-semibold leading-6 text-black'
        >
          Title
        </label>
        <div className='mt-2.5'>
          <input
            type='text'
            name='title'
            id='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoComplete='title'
            className='block w-full rounded px-3.5 py-2 border border-zinc-300 placeholder:text-gray-400 focus:outline-none'
          />
        </div>
      </div>

      <div className=''>
        <p className='block text-sm font-semibold leading-6 text-black mb-4'>
          Thumbnail
        </p>

        <div className='flex flex-col items-center justify-center'>
          {thumbnail && (
            <div className='relative wrapper rounded-xl border border-blue-100 w-full flex justify-center p-2 shadow-sm shadow-blue-500 '>
              <img
                src={thumbnail}
                alt=''
                className='w-1/2 aspect-video m-auto'
              />

              <button
                className='absolute top-2 right-4'
                type='button'
                onClick={() => setThumbnail('')}
              >
                <RiCloseLine />
              </button>
            </div>
          )}

          <label
            htmlFor='thumbnail'
            className='cursor-pointer flex flex-col w-full items-center rounded-xl border-2 border-dashed border-blue-400 bg-white p-6 text-center'
            style={{ display: !thumbnail ? 'block' : 'none' }}
          >
            <RiUploadCloud2Line className='w-6 h-6 text-blue-400 m-auto' />

            <h2 className='text-xl mt-2 font-medium text-gray-700 tracking-wide'>
              Thumbnail
            </h2>

            <p className='mt-2 text-gray-500 tracking-wide'>
              Upload or darg & drop your file SVG, PNG, JPG or GIF.
            </p>

            <input
              id='thumbnail'
              type='file'
              name='thumbnail'
              accept='image/*'
              className='hidden'
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const url = URL.createObjectURL(file);
                setThumbnail(url);
              }}
            />
          </label>

          <input
            className='hidden'
            type='text'
            name='folder'
            value='blog'
            readOnly
          />
        </div>
      </div>

      <div>
        <label className='block text-sm font-semibold leading-6 text-black'>
          Content
        </label>

        <Hydrated fallback={<div>Loading...</div>}>
          {() => (
            <QuillEditor
              value={content}
              onChange={(c) => {
                setContent(c);
              }}
            />
          )}
        </Hydrated>
        <input type='hidden' name='content' value={content} />
      </div>

      <div className='flex text-xs justify-between'>
        <button
          className='center rounded-lg bg-red py-2 px-3 font-sans font-bold uppercase text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg enable:active:bg-red-500/80 disabled:opacity-60'
          type='button'
          disabled={loading}
          onClick={async () => {
            if (confirm('Bạn có chắc muốn xóa bài viết này chứ?')) {
              await fetch(
                `/cmsdesk/posts/${params.id}/edit?_data=routes/cmsdesk.posts_.$id.edit`,
                {
                  method: 'DELETE',
                }
              );
              navigate('/cmsdesk/posts');
            }
          }}
        >
          Delete
        </button>

        <div className='flex gap-x-2'>
          <button
            className='center rounded-lg bg-blue-500 py-2 px-3 font-sans font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg enable:active:bg-blue-500/80 disabled:opacity-60'
            type='submit'
            disabled={!isChanged || loading}
          >
            Save
          </button>

          <button
            className='center rounded-lg border border-blue-500 py-2 px-3 font-sans font-bold uppercase text-blue-500 shadow-md shadow-blue-500/20 transition-all hover:shadow-lg active:opacity-60'
            onClick={() => navigate(-1)}
            type='button'
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </div>
    </fetcher.Form>
  );
}

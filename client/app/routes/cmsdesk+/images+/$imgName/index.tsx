import { toast } from 'react-toastify';
import { LoaderFunctionArgs, MetaFunction, redirect } from '@remix-run/node';
import { useEffect, useRef, useState } from 'react';
import {
  useFetcher,
  useLoaderData,
  useLocation,
  useNavigate,
  useNavigation,
  useRevalidator,
} from '@remix-run/react';

import { getImageUrl, toVnDateString } from '~/utils';
import { deleteImage, getImage, updateImage } from '~/services/image.server';
import HandsomeError from '~/components/HandsomeError';
import TextInput from '~/components/TextInput';
import { authenticator } from '~/services/auth.server';
import LoadingOverlay from '~/components/LoadingOverlay';
import ImageMetadata from './ImageMetadata';

export const action = async ({ request, params }: LoaderFunctionArgs) => {
  const { imgName } = params;
  if (!imgName) throw new Response('Image not found', { status: 404 });

  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/cmsdesk/login',
  });

  try {
    switch (request.method) {
      case 'PUT': {
        const formData = new URLSearchParams(await request.text());
        const alt = formData.get('alt');

        await updateImage(imgName, { alt }, user);

        return { toast: { message: 'Cập nhật thành công', type: 'success' } };
      }

      case 'DELETE': {
        await deleteImage(imgName, user);

        return { toast: { message: 'Xóa ảnh thành công', type: 'success' } };
      }

      default:
        throw new Response('Method not allowed', { status: 405 });
    }
  } catch (error: any) {
    return { toast: { message: error.message, type: 'error' } };
  }
};

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { imgName } = params;
  if (!imgName) throw new Response('Image not found', { status: 404 });

  try {
    const image = await getImage(imgName);

    return { image };
  } catch (error: any) {
    throw new Response(error.message, { status: error.status || 500 });
  }
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const { image } = data || {};

  return [
    {
      title: `Ảnh ${image?.img_alt || image?.img_name}`,
      description: `Ảnh ${
        image?.img_alt || image?.img_name
      } được tải lên vào ${toVnDateString(image?.updatedAt || '')}`,
    },
  ];
};

export default function ImagePopup() {
  const { image } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const location = useNavigation();

  const fetcher = useFetcher<typeof action>();
  const toastIdRef = useRef<any>(null);
  const [loading, setLoading] = useState(false);

  const closePopupHandler = () => {
    if (history.state?.idx === 0) navigate('/cmsdesk/images');
    else navigate(-1);
  };

  useEffect(() => {
    document.body.style.height = '100vh';
    document.body.style.overflow = 'hidden';

    const escapeHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closePopupHandler();
    };
    document.addEventListener('keydown', escapeHandler);

    return () => {
      document.body.style.height = 'auto';
      document.body.style.overflowY = 'auto';
      document.removeEventListener('keydown', escapeHandler);
    };
  }, []);

  useEffect(() => {
    switch (fetcher.state) {
      case 'submitting':
        toastIdRef.current = toast.loading('Loading...', {
          autoClose: false,
        });
        setLoading(true);
        break;

      case 'idle':
        if (fetcher.data?.toast && toastIdRef.current) {
          const { toast: toastData } = fetcher.data as any;
          toast.update(toastIdRef.current, {
            render: toastData.message,
            type: toastData.type || 'success', // Default to 'success' if type is not provided
            autoClose: 3000,
            isLoading: false,
          });
          toastIdRef.current = null;
          setLoading(false);

          if (toastData.type === 'success' && fetcher.formMethod === 'DELETE') {
            navigate('/cmsdesk/images');
          }
          break;
        }

        break;
    }
  }, [fetcher.state]);

  return (
    <div
      className='fixed inset-0 bg-black/70 flex h-full z-50 p-8 overflow-y-auto'
      onClick={closePopupHandler}
    >
      <section
        className='container gap-8 p-8 rounded-xl bg-white divide-x divide-zinc-200'
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className='col-span-6 flex-col items-center rounded-xl 
          text-[--sub11-text] overflow-hidden aspect-square'
        >
          <img
            src={getImageUrl(image.img_name)}
            alt={image.img_alt}
            className='object-contain'
          />
        </div>

        <div className='col-span-6 flex flex-col gap-8 pl-4 -ml-4 justify-between'>
          <div className='flex flex-col divide-y divide-zinc-200 gap-8'>
            <ImageMetadata image={image} />

            <div className='-mt-4 pt-4'>
              <fetcher.Form id='update-image' method='PUT'>
                <TextInput
                  label='Văn bản thay thế'
                  name='alt'
                  oneline
                  defaultValue={image.img_alt}
                />
              </fetcher.Form>
            </div>
          </div>

          <div className='flex items-center justify-end gap-4'>
            <button
              className='text-red hover:text-orange'
              type='button'
              onClick={() => {
                if (confirm('Bạn có chắc chắn muốn xóa ảnh này?')) {
                  fetcher.submit(null, { method: 'DELETE' });
                }
              }}
            >
              Xóa vĩnh viễn
            </button>

            <a
              href={getImageUrl(image.img_name)}
              download={image.img_name}
              className='border-x border-zinc-200 px-4 hover:text-blue-500'
            >
              Tải về tệp tin
            </a>

            <button
              className='btn bg-blue-500 text-white hover:opacity-90 active:bg-blue-600'
              form='update-image'
              type='submit'
            >
              Lưu thay đổi
            </button>
          </div>
        </div>
      </section>

      {loading && <LoadingOverlay />}
    </div>
  );
}

export const ErrorBoundary = () => <HandsomeError basePath='/cmsdesk/images' />;

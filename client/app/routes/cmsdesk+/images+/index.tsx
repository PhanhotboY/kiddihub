import { useState } from 'react';
import { toast } from 'react-toastify';
import { RiAddLine } from '@remixicon/react';
import { Link, useLoaderData } from '@remix-run/react';

import { IImage } from '~/interfaces/image.interface';
import { getImages } from '~/services/image.server';
import { getImageUrl } from '~/utils';
import LoadingOverlay from '~/components/LoadingOverlay';
import { uploadImages } from '~/services/image.client';
import HandsomeError from '~/components/HandsomeError';

export const loader = async () => {
  const images = await getImages();
  return { images };
};

export const meta = [
  {
    title: 'Danh sách ảnh',
  },
];

export default function ImagesPage() {
  const { images: fetchedImages } = useLoaderData<typeof loader>();

  const [images, setImages] = useState<IImage[]>(fetchedImages);
  const [loading, setLoading] = useState(false);

  return (
    <div className='grid grid-cols-8 gap-4 pt-4'>
      {images.map((image, index) => (
        <Link
          key={index}
          to={`/cmsdesk/images/${image.img_name}`}
          className={`border-2 rounded-lg aspect-square cursor-pointer flex justify-center items-center transition-all
        border-gray-300`}
        >
          <img
            src={getImageUrl(image.img_name)}
            alt={`Image ${index + 1}`}
            className='object-contain'
          />
        </Link>
      ))}

      <button
        className='fixed bottom-24 right-10 center rounded-lg bg-blue-500 p-3 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg active:bg-blue-500/80'
        onClick={() => {
          const input = document.createElement('input');
          input.type = 'file';
          input.accept = 'image/*';
          input.multiple = true;
          input.onchange = async (e) => {
            setLoading(true);
            const files = (e.target as HTMLInputElement).files;
            if (!files || files.length === 0) {
              toast.error('No image selected');
              setLoading(false);
              return;
            }

            const res = await uploadImages(files);
            if (res?.success !== 1) {
              toast.error(res.toast.message);
              setLoading(false);
              return;
            }

            setImages((prev) => [...prev, ...res.images]);
            setLoading(false);
          };
          input.style.display = 'none';
          input.click();
        }}
      >
        <RiAddLine />
      </button>

      {loading && <LoadingOverlay />}
    </div>
  );
}

export const ErrorBoundary = () => <HandsomeError basePath='/cmsdesk/images' />;

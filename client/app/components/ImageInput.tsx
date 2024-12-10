import { useFetcher } from '@remix-run/react';
import { RiCloseLine, RiUploadCloud2Line } from '@remixicon/react';
import { useState } from 'react';

export default function ImageInput({
  label,
  name,
  value,
  action,
  onChange,
  fetcherKey,
}: {
  name: string;
  label: string;
  value?: string;
  action: string;
  fetcherKey: string;
  onChange: (e: any) => void;
}) {
  const fetcher = useFetcher<any>({ key: fetcherKey });

  return (
    <fetcher.Form
      className=''
      method='POST'
      action={action}
      encType='multipart/form-data'
    >
      <label
        htmlFor={name}
        className='block text-sm font-semibold leading-6 text-black mb-4 text-center'
      >
        {label}
      </label>

      <div className='flex flex-col items-center justify-center'>
        {value ? (
          <div className='relative wrapper rounded-xl border border-blue-100 w-full flex justify-center p-2 shadow-sm shadow-blue-500 '>
            <img src={value} alt='' className='w-full h-40 object-contain' />

            <button
              className='absolute top-2 right-4'
              type='button'
              onClick={() => onChange(null)}
            >
              <RiCloseLine />
            </button>
          </div>
        ) : (
          <label
            htmlFor={name}
            className='cursor-pointer flex flex-col w-full items-center rounded-xl border-2 border-dashed border-blue-400 bg-white p-6 text-center'
          >
            <RiUploadCloud2Line className='w-6 h-6 text-blue-400' />

            <h2 className='text-xl mt-2 font-medium text-gray-700 tracking-wide'>
              {label}
            </h2>

            <p className='mt-2 text-gray-500 tracking-wide'>
              Upload or darg & drop your file SVG, PNG, JPG or GIF.
            </p>

            <input
              id={name}
              type='file'
              accept='image/*'
              className='hidden'
              name='img'
              value={undefined}
              onChange={async (e) => {
                fetcher.submit(e.target.form);
              }}
            />

            <input
              className='hidden'
              type='text'
              name='folder'
              value={name}
              readOnly
            />
          </label>
        )}
      </div>
    </fetcher.Form>
  );
}

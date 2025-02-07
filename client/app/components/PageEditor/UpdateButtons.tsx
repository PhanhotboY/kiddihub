import { useNavigate, useParams } from '@remix-run/react';

export default function UpdateButtons({
  loading,
  isChanged,
  isPublished,
}: {
  loading: boolean;
  isChanged: boolean;
  isPublished: boolean;
}) {
  const navigate = useNavigate();
  const params = useParams();

  return (
    <div className='col-span-12 flex text-xs justify-between fixed top-0 right-0 w-10/12 bg-white px-8 py-4 z-10'>
      <div className='flex gap-x-2'>
        <button
          className='center rounded-lg bg-red py-2 px-3 font-sans font-bold uppercase text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg enable:active:bg-red-500/80 disabled:opacity-60'
          type='button'
          disabled={loading}
          onClick={async () => {
            if (confirm('Bạn có chắc muốn xóa bài viết này chứ?')) {
              await fetch(`/cmsdesk/pages/${params.id}/edit`, {
                method: 'DELETE',
              });
              navigate('/cmsdesk/pages');
            }
          }}
        >
          Xóa
        </button>
      </div>

      <div className='flex gap-x-2'>
        {isPublished && (
          <button
            className='center rounded-lg border border-blue-500 py-2 px-3 font-sans font-bold uppercase text-blue-500 shadow-md 
            shadow-blue-500/20 transition-all hover:shadow-lg enable:active:bg-blue-500/10 disabled:opacity-60'
            type='submit'
            disabled={loading}
            name='isPublished'
            value='false'
          >
            Ẩn trang
          </button>
        )}

        {isPublished ? (
          <button
            className='center rounded-lg bg-blue-500 py-2 px-3 font-sans font-bold uppercase text-white 
          shadow-md shadow-blue-500/20 transition-all hover:shadow-lg enable:active:bg-blue-500/80 
          disabled:opacity-60'
            type='submit'
            disabled={!isChanged || loading}
          >
            Lưu Trang
          </button>
        ) : (
          <button
            className='center rounded-lg bg-blue-500 py-2 px-3 font-sans font-bold uppercase text-white 
          shadow-md shadow-blue-500/20 transition-all hover:shadow-lg enable:active:bg-blue-500/80 
          disabled:opacity-60'
            type='submit'
            disabled={loading}
            name='isPublished'
            value='true'
          >
            Xuất bản
          </button>
        )}
        <button
          className='center rounded-lg border border-zinc-500 py-2 px-3 font-sans font-bold uppercase 
          text-zinc-500 shadow-md shadow-zinc-500/20 transition-all hover:shadow-lg active:opacity-60'
          onClick={() => {
            if (history.state?.idx === 0) navigate('/cmsdesk/pages');
            else navigate(-1);
          }}
          type='button'
          disabled={loading}
        >
          Quay lại
        </button>
      </div>
    </div>
  );
}

import { useLoaderData, useNavigate } from '@remix-run/react';
import { RiAddLine } from '@remixicon/react';
import { toast } from 'react-toastify';
import { getSchools } from '~/services/school.server';

export const loader = async () => {
  const schools = await getSchools();

  return { schools };
};

export default function SchoolManagement() {
  const { schools } = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  if (!schools.length) {
    return (
      <div className='container flex flex-col items-center justify-center h-full'>
        <h1 className='text-2xl font-bold'>No schools found</h1>
        <button
          className='mt-4 rounded-lg bg-blue-500 p-3 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg active:bg-blue-500/80'
          onClick={async () => {
            try {
              navigate(`/cmsdesk/schools/new`);
            } catch (error: any) {
              toast[(error.type as 'error') || 'error'](error.message);
            }
          }}
        >
          <RiAddLine />
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1>School Management</h1>
    </div>
  );
}

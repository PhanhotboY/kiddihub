import { ActionFunctionArgs, json, LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData, useNavigate } from '@remix-run/react';
import { RiAddLine } from '@remixicon/react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import PostCard from '~/components/BlogPost/PostCard';
import LoadingOverlay from '~/components/LoadingOverlay';
import { authenticator } from '~/services/auth.server';
import { createSchool, getSchools } from '~/services/school.server';
import SchoolCard from '~/widgets/SchoolCard';

export const meta = [{ title: 'Manage School' }];

export const action = async ({ request }: ActionFunctionArgs) => {
  const user = await authenticator.isAuthenticated(request);
  switch (request.method) {
    case 'POST':
      try {
        const school = await createSchool({}, user!);

        return json(school, { status: 201 });
      } catch (error) {
        return json(
          { toast: { message: 'Failed to create school', type: 'error' } },
          { status: 500 }
        );
      }

    default:
      throw new Response(null, {
        status: 405,
        statusText: 'Method Not Allowed',
      });
  }
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await authenticator.isAuthenticated(request);
  const schools = await getSchools(user!);

  return json({ schools });
};

export default function ManageSchool() {
  const { schools } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  return (
    <div className='container grid grid-cols-12 gap-4'>
      {loading && <LoadingOverlay />}

      {schools.map((scl: any, i: number) => (
        <div className='col-span-12' key={i}>
          <SchoolCard school={scl} index={i} admin />
        </div>
      ))}

      <button
        className='fixed bottom-24 right-10 center rounded-lg bg-blue-500 p-3 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg active:bg-blue-500/80'
        onClick={async () => {
          try {
            setLoading(true);
            const res = await fetch(
              '/cmsdesk/schools?_data=routes/cmsdesk.schools',
              {
                method: 'POST',
              }
            );
            if (!res.ok) {
              throw await res.json();
            }
            const school = await res.json();

            navigate(`/cmsdesk/schools/${school.id}/edit`);
          } catch (error: any) {
            console.log('error', error);
            toast[(error.toast.type as 'error') || 'error'](
              error.toast.message
            );
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

import { Outlet } from '@remix-run/react';
import { useState } from 'react';
import SearchHeader from '~/components/SearchHeader';
import SearchFilter from '~/widgets/SearchFilter';
import { json, LoaderFunctionArgs } from '@remix-run/node';
import { SCHOOL } from '~/constants/school.constant';
import HandsomeError from '~/components/HandsomeError';

export const loader = ({ request, params }: LoaderFunctionArgs) => {
  const schoolModel = params.schoolModel;

  if (
    !schoolModel ||
    !Object.values(SCHOOL.MODEL)
      .reduce((p, model) => [...p, model.slug], [] as string[])
      .includes(schoolModel)
  ) {
    throw new Response(null, {
      status: 404,
    });
  }

  return json({ schoolModel });
};

export default function SearchPage() {
  const [openFilter, setOpenFilter] = useState(false);

  return (
    <div className='bg-slate-200/50'>
      <SearchHeader openFilter={() => setOpenFilter(true)} />

      <div className='container grid grid-cols-12 gap-6 py-4'>
        <SearchFilter
          className={`transition-all duration-500 ${
            openFilter ? 'max-lg:translate-x-0' : 'max-lg:translate-x-full'
          }`}
          closeFilter={() => setOpenFilter(false)}
        />

        <div className='col-span-12 lg:col-span-9 flex flex-col gap-6'>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export const ErrorBoundary = () => <HandsomeError />;

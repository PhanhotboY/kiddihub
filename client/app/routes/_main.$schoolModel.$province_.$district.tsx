import { defer, json, LoaderFunctionArgs } from '@remix-run/node';
import { Await, useLoaderData } from '@remix-run/react';
import { Suspense, useState } from 'react';
import HandsomeError from '~/components/HandsomeError';
import SupportPopup from '~/components/SupportPopup';
import { ISchool } from '~/interfaces/school.interface';
import { getSchools } from '~/services/school.server';
import SchoolCard from '~/widgets/SchoolCard';

export const loader = ({ request, params }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const query = url.searchParams.get('q') || '';
  const page = url.searchParams.get('page') || '1';

  const schoolModel = params['schoolModel'];
  const province = params['province'];
  const district = params['district'];

  const schools = getSchools();

  return defer({
    schools,
    query,
    page,
    schoolModel,
    province,
    district,
  });
};

export default function SearchPageByProvince() {
  const { schools } = useLoaderData<typeof loader>();

  const [askSchool, setAskSchool] = useState<ISchool | null>(null);

  return (
    <>
      <Suspense>
        <Await resolve={schools}>
          {(schools) =>
            schools.map((school, i) => (
              <SchoolCard
                school={school}
                key={i}
                index={i + 1}
                openPopup={(school) => setAskSchool(school)}
              />
            ))
          }
        </Await>
      </Suspense>

      {askSchool && (
        <SupportPopup
          school={askSchool}
          closePopup={() => setAskSchool(null)}
        />
      )}
    </>
  );
}

export const ErrorBoundary = () => <HandsomeError />;

import { json, LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { useState } from 'react';
import BreadScrum from '~/components/BreadScrum';
import Footer from '~/components/Footer';
import HandsomeError from '~/components/HandsomeError';
import Header from '~/components/Header';
import SchoolInformation from '~/components/SchoolInformation';
import SupportPopup from '~/components/SupportPopup';
import { ISchool } from '~/interfaces/school.interface';
import { getSchoolDetail } from '~/services/school.server';
import SchoolOverview from '~/widgets/SchoolOverview';
import { SCHOOL } from '../constants/school.constant';

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const schoolSlug = params.schoolSlug;
  if (!schoolSlug) throw new Response(null, { status: 404 });

  const school = await getSchoolDetail(schoolSlug);
  if (!school) throw new Response(null, { status: 404 });

  return json({ school });
};

export default function SchoolDetail() {
  const { school } = useLoaderData<typeof loader>();

  const [askSchool, setAskSchool] = useState<ISchool | null>(null);

  return (
    <>
      <main className='mt-[72px]'>
        <SchoolOverview
          school={school}
          images={[
            'https://static.kiddihub.com/images/b6ZX7jQsSQrPgXUw0-457692217122154487730247549400325114343870504n.jpg',
            'https://static.kiddihub.com/images/b6ZX7jQsSQrPgXUw0-457692217122154487730247549400325114343870504n.jpg',
            'https://static.kiddihub.com/images/b6ZX7jQsSQrPgXUw0-457692217122154487730247549400325114343870504n.jpg',
            'https://static.kiddihub.com/images/b6ZX7jQsSQrPgXUw0-457692217122154487730247549400325114343870504n.jpg',
            'https://static.kiddihub.com/images/b6ZX7jQsSQrPgXUw0-457692217122154487730247549400325114343870504n.jpg',
          ]}
          breadscrum={[
            {
              label:
                Object.values(SCHOOL.MODEL).find(
                  (m) => m.slug === (school.sch_model as any)
                )?.name || 'Mầm non',
              path: `/${school.sch_model}`,
            },
            {
              label: school.sch_name,
              path: `/truong/${school.sch_slug}`,
            },
          ]}
        />

        <div className='container py-6'>
          <SchoolInformation
            school={school}
            openSupport={(s) => setAskSchool(s)}
          />
        </div>

        {askSchool && (
          <SupportPopup
            school={askSchool}
            closePopup={() => setAskSchool(null)}
          />
        )}
      </main>

      <Footer />
    </>
  );
}

export const ErrorBoundary = () => (
  <>
    <Header shadow />
    <HandsomeError /> <Footer />
  </>
);

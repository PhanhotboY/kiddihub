import { useFetcher, useLoaderData, useNavigate } from '@remix-run/react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

import UpdateButtons from './UpdateButtons';
import CreateButtons from './CreateButtons';
import { action } from '~/routes/cmsdesk+/schools+/new';

export default function Wrapper({
  fetcherKey,
  type,
  isChanged,
  children,
}: {
  fetcherKey: string;
  isChanged: boolean;
  type: 'update' | 'create';
  children: React.ReactNode;
}) {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const toastIdRef = useRef<any>(null);

  const fetcher = useFetcher<typeof action>({ key: fetcherKey });

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
          if (type === 'create' && fetcher.data.school) {
            navigate(`/cmsdesk/schools/${fetcher.data.school?.id}/edit`);
          }
          break;
        }

        toast.update(toastIdRef.current, {
          render: fetcher.data?.toast.message,
          autoClose: 3000,
          isLoading: false,
          type: 'error',
        });

        break;
    }
  }, [fetcher.state]);

  return (
    <fetcher.Form
      className='container grid grid-cols-12 gap-4 mt-8'
      method={type === 'update' ? 'PUT' : 'POST'}
      encType='multipart/form-data'
    >
      {children}

      {type === 'update' && (
        <UpdateButtons loading={loading} isChanged={isChanged} />
      )}

      {type === 'create' && <CreateButtons loading={loading} />}
    </fetcher.Form>
  );
}

import { LoaderFunctionArgs } from '@remix-run/node';

import { getUsers } from '~/services/user.server';
import { getPosts } from '~/services/post.server';
import { getSchools } from '~/services/school.server';
import { getAppSettings } from '~/services/app.server';

const services = {
  getUsers,
  getPosts,
  getSchools,
  getAppSettings,
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const getter = url.searchParams.get('getter') as string;
  const page = +url.searchParams.get('page')! || 1;

  if (!getter || !(getter in services)) {
    throw new Response(null, { status: 400, statusText: 'Invalid request' });
  }

  const data = await services[getter as keyof typeof services]();

  return data;
};

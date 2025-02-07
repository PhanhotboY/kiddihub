import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from '@remix-run/node';
import { authenticator } from '~/services/auth.server';
import { useLoaderData, useNavigate, useRevalidator } from '@remix-run/react';
import CategoryDetail from './components/CategoryDetail';
import {
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory,
} from '~/services/category.server';
import { getPages } from '~/services/page.server';

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/cmsdesk/login',
  });

  const { id } = params;
  const body = await request.json();

  switch (request.method) {
    case 'PUT': {
      try {
        await updateCategory(id || '', body, user);
        return new Response(null, { status: 200 });
      } catch (error) {
        console.error('Error setting viewed category:', error);
        return new Response(null, { status: 500 });
      }
    }

    case 'DELETE': {
      try {
        await deleteCategory(id || '', user);
        return new Response(null, { status: 200 });
      } catch (error) {
        console.error('Error setting viewed category:', error);
        return new Response(null, { status: 500 });
      }
    }

    default: {
      return { toast: { message: 'Method not allowed', type: 'error' } };
    }
  }
};

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  try {
    if (!params.id) {
      throw new Response(null, { status: 400 });
    }
    const user = await authenticator.isAuthenticated(request, {
      failureRedirect: '/cmsdesk/login',
    });

    const category = await getCategory(params.id);
    const pages = await getPages({ isPublished: true, user });
    const categories = await getCategories();

    return { category, pages, categories };
  } catch (error) {
    console.error('Error loading category detail:', error);
    return { category: null };
  }
};

export default function CategoryDetailPopup() {
  const { category, pages, categories } = useLoaderData<typeof loader>() as any;
  const navigate = useNavigate();
  const revalidator = useRevalidator();

  return (
    <CategoryDetail
      category={category}
      pages={pages}
      categories={categories}
      popupHidder={() => {
        if (history.state?.idx === 0) navigate('/cmsdesk/categories');
        else navigate(-1);
        revalidator.revalidate();
      }}
    />
  );
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const { category } = data || {};
  return [{ title: `${category?.cat_name}` }];
};

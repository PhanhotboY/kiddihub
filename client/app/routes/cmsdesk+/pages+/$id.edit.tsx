import { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { useState } from 'react';

import BlogEditor from '~/components/PageEditor/Blog';
import ContactPageEditor from '~/components/PageEditor/ContactPage';
import LandingPageEditor from '~/components/PageEditor/LandingPage';
import { PAGE } from '~/constants/page.constant';
import { authenticator } from '~/services/auth.server';
import { deletePage, getPostDetail, updatePage } from '~/services/page.server';
import { getPageCategories } from '~/services/pageCategory.server';
import { getPageTemplates } from '~/services/pageTemplate.server';

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const id = params.id;
  if (!id) {
    throw new Response(null, {
      status: 404,
      statusText: 'Page not found',
    });
  }

  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/cmsdesk/login',
  });

  switch (request.method) {
    case 'PUT':
      try {
        let formData = await request.formData();

        const folder = formData.get('folder') as string;
        const thumbnail = formData.get('thumbnail') as File;

        const title = formData.get('title') as string;
        const content = formData.get('content') as string;
        const category = formData.get('category') as string;
        const template = formData.get('template') as string;
        const isPublished = formData.get('isPublished') === 'true';

        // Save the page to the database
        const page = await updatePage(
          id,
          { title, content, thumbnail, category, template, isPublished },
          user
        );

        // return redirect('/cmsdesk/pages');
        return {
          page,
          toast: { message: 'Cập nhật bài viết thành công!', type: 'success' },
        };
      } catch (error: any) {
        console.error(error);
        return {
          toast: { message: error.message, type: 'error' },
        };
      }

    case 'DELETE':
      try {
        // Delete the page from the database
        const res = await deletePage(id, user!);
        return {
          res,
          toast: { message: 'Xóa bài viết thành công!', type: 'success' },
        };
      } catch (error: any) {
        console.error(error);
        return {
          toast: { message: error.message, type: 'error' },
        };
      }

    default:
      return {
        error: 'Method not allowed',
        toast: { message: 'Có lỗi xảy ra!', type: 'error' },
      };
  }
};

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const id = params.id;
  if (!id) {
    throw new Error('Page not found');
  }

  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/cmsdesk/login',
  });
  // Fetch the page from the database
  const page = await getPostDetail(id, user);
  const pageTemplates = await getPageTemplates();
  const pageCategories = await getPageCategories();

  return { page, pageTemplates, pageCategories };
};

export default function EditPage() {
  const { page, pageTemplates } = useLoaderData<typeof loader>();

  const [template, setTemplate] = useState(
    page.pst_template._id ||
      pageTemplates.find((tem) => tem.ptp_code === PAGE.TEMPLATE.BLOG.code)
        ?.id ||
      pageTemplates[0].id
  );

  switch (template) {
    case pageTemplates.find(
      (tem) => tem.ptp_code === PAGE.TEMPLATE.HOME_PAGE.code
    )?.id:
      return (
        <LandingPageEditor
          page={page}
          type='update'
          template={template}
          setTemplate={setTemplate}
        />
      );

    case pageTemplates.find(
      (tem) => tem.ptp_code === PAGE.TEMPLATE.CONTACT_PAGE.code
    )?.id:
      return (
        <ContactPageEditor
          page={page}
          type='update'
          template={template}
          setTemplate={setTemplate}
        />
      );

    default:
      return (
        <BlogEditor
          page={page}
          type='update'
          template={template}
          setTemplate={setTemplate}
        />
      );
  }
}

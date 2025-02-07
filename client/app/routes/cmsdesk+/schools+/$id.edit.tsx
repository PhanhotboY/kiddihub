import { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { useState } from 'react';

import { SCHOOL } from '~/constants/school.constant';
import { authenticator } from '~/services/auth.server';
import {
  deleteSchool,
  getSchoolDetail,
  updateSchool,
} from '~/services/school.server';
import SchoolEditor from './components/SchoolEditor';

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const id = params.id;
  if (!id) {
    throw new Response(null, {
      status: 404,
      statusText: 'School not found',
    });
  }

  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/cmsdesk/login',
  });

  switch (request.method) {
    case 'PUT':
      try {
        let formData = await request.formData();

        const name = formData.get('name') as string;
        const avatar = formData.get('avatar') as string;
        const model = formData.get('model') as string;
        const type = formData.get('type') as string;
        const program = formData.get('program') as string;
        const address = {
          district: formData.get('district') as string,
          province: formData.get('province') as string,
          street: formData.get('street') as string,
        };
        const age = {
          from: formData.get('fromAge') as string,
          to: formData.get('toAge') as string,
        };
        const tuition = {
          from: formData.get('fromTuition') as string,
          to: formData.get('toTuition') as string,
        };
        const information = {
          introduction: formData.get('introduction') as string,
          infrastructure: formData.get('infrastructure') as string,
          service: formData.get('service') as string,
          curriculum: formData.get('curriculum') as string,
          workforce: formData.get('workforce') as string,
          policy: formData.get('policy') as string,
        };
        const contact = {
          email: formData.get('email') as string,
          msisdn: formData.get('msisdn') as string,
          facebook: formData.get('facebook') as string,
          instagram: formData.get('instagram') as string,
          website: formData.get('website') as string,
          map: formData.get('map') as string,
        };

        if (
          !name ||
          !avatar ||
          !model ||
          !type ||
          !program ||
          !address ||
          !age ||
          !tuition ||
          !information ||
          !contact
        ) {
          return {
            toast: {
              message: 'Vui lòng điền đầy đủ thông tin!',
              type: 'error',
            },
            school: null,
          };
        }

        // Save the school to the database
        const school = await updateSchool(
          id,
          {
            name,
            avatar,
            model,
            type,
            program,
            address,
            age,
            tuition,
            information,
            contact,
          },
          user!
        );

        // return redirect('/cmsdesk/schools');
        return {
          school,
          toast: { message: 'Cập nhật trường thành công!', type: 'success' },
        };
      } catch (error: any) {
        console.error(error);
        return {
          toast: { message: error.message, type: 'error' },
        };
      }

    case 'DELETE':
      try {
        // Delete the school from the database
        const res = await deleteSchool(id, user!);
        return {
          res,
          toast: { message: 'Xóa trường thành công!', type: 'success' },
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
    throw new Error('School not found');
  }

  // Fetch the school from the database
  const school = await getSchoolDetail(id);

  return { school };
};

export default function EditSchool() {
  const { school } = useLoaderData<typeof loader>();

  return <SchoolEditor type='update' school={school} />;
}

import { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { useState } from 'react';

import { authenticator } from '~/services/auth.server';
import { createSchool } from '~/services/school.server';
import SchoolEditor from './components/SchoolEditor';

export const action = async ({ request }: ActionFunctionArgs) => {
  const user = await authenticator.isAuthenticated(request);
  switch (request.method) {
    case 'POST':
      try {
        const r = request.clone();
        let formData = await r.formData();

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
        const school = await createSchool(
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

        return {
          toast: {
            message: 'Trường được tạo thành công!',
            type: 'success',
          },
          school,
        };
      } catch (error: any) {
        return {
          toast: { message: error.statusText || error.message, type: 'error' },
          school: null,
        };
      }

    default:
      return {
        toast: { message: 'Method not allowed', type: 'error' },
        school: null,
      };
  }
};

export default function CreateSchool() {
  return <SchoolEditor type='create' />;
}

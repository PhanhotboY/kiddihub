import { ActionFunctionArgs } from '@remix-run/node';

import { authenticator } from '~/services/auth.server';
import BranchEditor from './components/BranchEditor';
import { createBranch } from '~/services/branch.server';

export const action = async ({ request }: ActionFunctionArgs) => {
  const user = await authenticator.isAuthenticated(request);
  switch (request.method) {
    case 'POST':
      try {
        let formData = await request.formData();

        const email = formData.get('email') as string;
        const msisdn = formData.get('msisdn') as string;
        const map = formData.get('map') as string;
        const isMain = formData.get('isMain') === 'on';
        const province = formData.get('province') as string;
        const district = formData.get('district') as string;
        const street = formData.get('street') as string;

        if (!email || !msisdn || !map || !province || !district || !street) {
          return {
            toast: {
              message: 'Vui lòng điền đầy đủ thông tin!',
              type: 'error',
            },
            page: null,
          };
        }

        // Save the page to the database
        const branch = await createBranch(
          {
            email,
            msisdn,
            map,
            isMain,
            address: { province, district, street },
          },
          user!
        );

        return {
          toast: {
            message: 'Chi nhánh được tạo thành công!',
            type: 'success',
          },
          branch,
        };
      } catch (error: any) {
        return {
          toast: { message: error.statusText || error.message, type: 'error' },
          page: null,
        };
      }

    default:
      return {
        toast: { message: 'Method not allowed', type: 'error' },
        page: null,
      };
  }
};

export default function CreateBranch() {
  return <BranchEditor type='create' />;
}

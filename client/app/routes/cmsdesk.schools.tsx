import { json } from '@remix-run/node';
import { getSchools } from '~/services/school.service';

export const meta = [{ title: 'Manage School' }];

export const loader = async () => {
  const school = await getSchools();

  return json({ school });
};

export default function ManageSchool() {
  return <div className='container'>Manage school page</div>;
}

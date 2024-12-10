import { json } from '@remix-run/node';
import { getAppSettings } from '~/services/app.server';

export const loader = async () => {
  // const appSettings = await getAppSettings();

  // return json({ appSettings });
  return json({});
};

export default function ManageUser() {
  return <div className='container'>Manage user page</div>;
}

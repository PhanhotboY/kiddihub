// components
import {
  LoaderFunctionArgs,
  NavLink,
  useFetcher,
  useNavigate,
} from 'react-router-dom';
import PasswordInput from '@components/PasswordInput';
import { toast } from 'react-toastify';

// hooks
import { useEffect, useRef, useState } from 'react';
import TextInput from '~/components/TextInput';
import Select from '../Select';
import ImageInput from '~/components/ImageInput';

export const loader = async ({}: LoaderFunctionArgs) => {
  return {};
};

const UserProfileDetails = ({ user }: { user: any }) => {
  const fetcher = useFetcher();
  const navigate = useNavigate();

  const [isChanged, setIsChanged] = useState(false);
  const [avatar, setAvatar] = useState(user.usr_avatar);
  const [firstName, setFirstName] = useState(user.usr_firstName);
  const [lastName, setLastName] = useState(user.usr_lastName);
  const [email, setEmail] = useState(user.usr_email);
  const [msisdn, setMsisdn] = useState(user.usr_msisdn);
  const [address, setAddress] = useState(user.usr_address);
  const [gender, setGender] = useState(user.usr_sex);
  const [username, setUserName] = useState(user.usr_username);
  const [password, setPassword] = useState('');

  useEffect(() => {
    setIsChanged(
      avatar !== user.usr_avatar ||
        firstName !== user.usr_firstName ||
        lastName !== user.usr_lastName ||
        email !== user.usr_email ||
        msisdn !== user.usr_msisdn ||
        address !== user.usr_address ||
        username !== user.usr_username ||
        password !== ''
    );
  }, [
    avatar,
    email,
    firstName,
    lastName,
    msisdn,
    address,
    gender,
    username,
    password,
  ]);

  const toastIdRef = useRef<any>(null);

  useEffect(() => {
    switch (fetcher.state) {
      case 'submitting':
        toastIdRef.current = toast.loading('Loading...', {
          autoClose: false,
        });

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
          setPassword('');
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
    <div className='card flex flex-col gap-[30px] md:gap-12 md:col-span-2 md:!pb-[50px] xl:col-span-12'>
      <div className='flex flex-col gap-5'>
        <fetcher.Form id='updateProfileForm' method='POST'>
          <div className='grid gap-4 md:grid-cols-12 md:gap-5 text-[#333]'>
            <div className='col-span-2 row-span-2'>
              <div className='mx-auto'>
                <ImageInput
                  label='Ảnh đại diện'
                  id='avatar'
                  name='avatar'
                  value={avatar}
                  onChange={setAvatar}
                />
              </div>
            </div>

            <div className='col-span-5'>
              <TextInput
                label='Họ'
                id='lastName'
                name='lastName'
                placeholder='Last Name'
                autoComplete='last-name'
                value={lastName}
                onChange={setLastName}
              />
            </div>

            <div className='col-span-5'>
              <TextInput
                label='Tên'
                id='firstName'
                name='firstName'
                placeholder='First Name'
                autoComplete='first-name'
                value={firstName}
                onChange={setFirstName}
              />
            </div>

            <div className='col-span-5'>
              <TextInput
                label='Số điện thoại'
                id='msisdn'
                name='msisdn'
                type='tel'
                placeholder='Số điện thoại'
                autoComplete='tel'
                value={msisdn}
                onChange={setMsisdn}
              />
            </div>

            <div className='col-span-5'>
              <Select
                label='Giới tính'
                name='sex'
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className='w-full'
              >
                <option value='male'>Nam</option>
                <option value='female'>Nữ</option>
                <option value='other'>Khác</option>
              </Select>
            </div>

            <div className='col-span-6'>
              <TextInput
                label='Email'
                id='email'
                name='email'
                type='email'
                placeholder='Email'
                autoComplete='email'
                value={email}
                onChange={setEmail}
              />
            </div>

            <div className='col-span-6'>
              <TextInput
                label='Địa chỉ'
                id='address'
                name='address'
                placeholder='Address'
                autoComplete='address'
                value={address}
                onChange={setAddress}
              />
            </div>

            <div className='col-span-6'>
              <TextInput
                label='Username'
                id='username'
                name='username'
                placeholder='Username'
                autoComplete='username'
                value={username}
                onChange={setUserName}
              />
            </div>
            <div className='col-span-6'>
              <PasswordInput
                id='password'
                value={password}
                placeholder='Password'
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
        </fetcher.Form>

        <div className='mt-2.5 flex justify-between'>
          <button
            className='btn btn--secondary w-full md:max-w-[280px]'
            onClick={async (e) => {
              if (window.confirm('Bạn có chắc chắn muốn đăng xuất?')) {
                fetch('/cmsdesk/logout', { method: 'POST' });
                navigate('/cmsdesk/login');
              }
            }}
          >
            Log Out
          </button>

          <button
            className='btn btn--primary w-full md:w-fit md:px-[70px]'
            type='submit'
            disabled={!isChanged}
            form='updateProfileForm'
          >
            Cập nhật
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfileDetails;

// components
import {
  json,
  LoaderFunctionArgs,
  NavLink,
  useFetcher,
} from 'react-router-dom';
import PasswordInput from '@components/PasswordInput';
import { toast } from 'react-toastify';

// hooks
import { useEffect, useRef, useState } from 'react';

export const loader = async ({}: LoaderFunctionArgs) => {
  return json({});
};

const UserProfileDetails = ({ user }: { user: any }) => {
  const fetcher = useFetcher();

  const [isChanged, setIsChanged] = useState(false);
  const [firstName, setFirstName] = useState(user.usr_firstName);
  const [lastName, setLastName] = useState(user.usr_lastName);
  const [email, setEmail] = useState(user.usr_email);
  const [msisdn, setMsisdn] = useState(user.usr_msisdn);
  const [address, setAddress] = useState(user.usr_address);
  const [gender, setGender] = useState(user.usr_sex);
  const [password, setPassword] = useState('');

  useEffect(() => {
    setIsChanged(true);
  }, [email, firstName, lastName, msisdn, address, gender]);

  const toastIdRef = useRef<any>(null);

  useEffect(() => {
    switch (fetcher.state) {
      case 'submitting':
        toastIdRef.current = toast.loading('Loadding...', {
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
    <div className='card flex flex-col gap-[30px] md:gap-12 md:row-start-2 md:col-span-2 md:!pb-[50px] xl:row-start-1 xl:col-start-2 xl:col-span-1'>
      <div className='flex flex-col gap-5'>
        <h5>My Profile Details</h5>

        <fetcher.Form method='POST'>
          <div className='grid gap-4 md:grid-cols-2 md:gap-5 text-[#333]'>
            <div className='field-wrapper'>
              <label className='field-label' htmlFor='lastName'>
                Họ
              </label>
              <input
                id='lastName'
                className={'field-input'}
                name='lastName'
                type='text'
                placeholder='Last Name'
                autoComplete='last-name'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div className='field-wrapper'>
              <label className='field-label' htmlFor='firstName'>
                Tên
              </label>
              <input
                className={'field-input '}
                type='text'
                id='firstName'
                name='firstName'
                placeholder='First Name'
                autoComplete='first-name'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div className='field-wrapper'>
              <label className='field-label' htmlFor='email'>
                Email
              </label>
              <input
                id='email'
                className={'field-input'}
                type='text'
                name='email'
                placeholder='Email'
                autoComplete='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className='field-wrapper'>
              <label className='field-label' htmlFor='msisdn'>
                Sđt
              </label>
              <input
                id='msisdn'
                type='tel'
                name='msisdn'
                pattern='[0-9]{10}'
                placeholder='0123456789'
                className={'field-input'}
                autoComplete='phone'
                value={msisdn}
                onChange={(e) => setMsisdn(e.target.value)}
              />
            </div>

            <div className='field-wrapper'>
              <label className='field-label' htmlFor='address'>
                Địa chỉ
              </label>
              <input
                id='address'
                className='field-input'
                name='address'
                type='text'
                placeholder='71 Bùi Tá Hán, An Phú, Q2, TP.HCM'
                autoComplete='address'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className='field-wrapper'>
              <label className='field-label' htmlFor='sex'>
                Gender
              </label>
              <select
                className='field-input'
                id='sex'
                name='sex'
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value='male'>Nam</option>
                <option value='female'>Nữ</option>
                <option value='other'>Khác</option>
              </select>
            </div>

            <PasswordInput
              id='password'
              value={password}
              placeholder='Password'
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className='mt-2.5'>
            <button className='text-btn' type='button'>
              Change password
            </button>
            <button
              className='btn btn--primary w-full mt-5 md:w-fit md:px-[70px]'
              type='submit'
              disabled={!isChanged}
            >
              Update information
            </button>
          </div>
        </fetcher.Form>
      </div>
    </div>
  );
};

export default UserProfileDetails;

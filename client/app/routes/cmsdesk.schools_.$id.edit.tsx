import { ActionFunctionArgs, LoaderFunctionArgs, json } from '@remix-run/node';
import {
  useFetcher,
  useLoaderData,
  useNavigate,
  useParams,
} from '@remix-run/react';
import { RiCloseLine, RiUploadCloud2Line } from '@remixicon/react';
import { useEffect, useRef, useState } from 'react';
import { toast as notify } from 'react-toastify';

import TextInput from '~/components/TextInput';
import { SCHOOL } from '~/constants/school.constant';
import { uploadImage } from '~/lib/uploadHandler.server';
import { authenticator } from '~/services/auth.server';
import {
  deleteSchool,
  getSchoolDetail,
  updateSchool,
} from '~/services/school.server';
import Select from '~/widgets/Select';
import pkg from 'vn-provinces';

interface IProvince {
  code: string;
  name: string;
  slug: string;
  unit: string;
}
interface IDistrict {
  code: string;
  name: string;
  slug: string;
  unit: string;
  provinceCode: string;
  provinceName: string;
  fullName: string;
}

const { getProvinces, getDistrictsByProvinceCode } = pkg;
const provinces = getProvinces() as Array<IProvince>;

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const id = params.id;
  if (!id) {
    throw new Response(null, {
      status: 404,
      statusText: 'School not found',
    });
  }

  const user = await authenticator.isAuthenticated(request);
  switch (request.method) {
    case 'PUT':
      try {
        const r = request.clone();
        let formData = await r.formData();
        const folder = formData.get('folder') as string;
        const file = formData.get('avatar') as File;
        let avatar;

        if (file.size > 0) {
          formData = await uploadImage(request, folder);
          avatar = formData.get('avatar') as string;
        }
        const name = formData.get('name') as string;
        const model = formData.get('model') as string;
        const type = formData.get('type') as string;
        const program = formData.get('program') as string;
        const province = formData.get('province') as string;
        const district = formData.get('district') as string;
        const street = formData.get('street') as string;
        const ageFrom = formData.get('ageFrom') as string;
        const ageTo = formData.get('ageTo') as string;
        const tuitionFrom = formData.get('tuitionFrom') as string;
        const tuitionTo = formData.get('tuitionTo') as string;
        const introduction = formData.get('introduction') as string;
        const infrastructure = formData.get('infrastructure') as string;
        const service = formData.get('service') as string;
        const curriculum = formData.get('curriculum') as string;
        const workforce = formData.get('workforce') as string;
        const policy = formData.get('policy') as string;
        const email = formData.get('email') as string;
        const msisdn = formData.get('msisdn') as string;
        const facebook = formData.get('facebook') as string;
        const instagram = formData.get('instagram') as string;
        const website = formData.get('website') as string;
        const map = formData.get('map') as string;

        if (
          ageFrom &&
          ageTo &&
          (!ageFrom.match(/^\d+[d,m,y]$/) || !ageTo.match(/^\d+[d,m,y]$/))
        ) {
          return json({
            toast: { message: 'Tuổi không hợp lệ', type: 'error' },
          });
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
            address: { province, district, street },
            age: { from: ageFrom, to: ageTo },
            tuition: { from: tuitionFrom, to: tuitionTo },
            information: {
              introduction,
              infrastructure,
              service,
              curriculum,
              workforce,
              policy,
            },
            contact: { email, msisdn, facebook, instagram, website, map },
          },
          user!
        );

        // return redirect('/cmsdesk/schools');
        return json({
          school,
          toast: { message: 'Cập nhật bài viết thành công!', type: 'success' },
        });
      } catch (error: any) {
        console.error(error);
        return json({
          toast: { message: error.message, type: 'error' },
        });
      }

    case 'DELETE':
      try {
        // Delete the school from the database
        const res = await deleteSchool(id, user!);
        return json({
          res,
          toast: { message: 'Xóa bài viết thành công!', type: 'success' },
        });
      } catch (error: any) {
        console.error(error);
        return json({
          toast: { message: error.message, type: 'error' },
        });
      }

    default:
      return json(
        { error: 'Method not allowed', toast: { message: 'Có lỗi xảy ra!' } },
        { status: 405 }
      );
  }
};

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const id = params.id;
  if (!id) {
    throw new Error('School not found');
  }
  // Fetch the school from the database
  const school = await getSchoolDetail(id);

  return json({ school });
};

export default function EditSchool() {
  const navigate = useNavigate();
  const { school } = useLoaderData<typeof loader>();

  const [isChanged, setIsChanged] = useState(false);
  const [name, setName] = useState(school.sch_name || '');
  const [avatar, setAvatar] = useState(school.sch_avatar || '');
  // const [images, setImages] = useState(school.sch_images || []);

  const [model, setModel] = useState(school.sch_model || '');

  const [type, setType] = useState(school.sch_type || '');

  const [program, setProgram] = useState(school.sch_program || '');

  const [province, setProvince] = useState(
    provinces.find((p) => p.slug === school.sch_address.province)?.slug || ''
  );
  const [districts, setDistricts] = useState(
    provinces.find((p) => p.slug === school.sch_address.province)?.code
      ? getDistrictsByProvinceCode(
          provinces.find((p) => p.slug === school.sch_address.province)?.code ||
            ''
        )
      : ([] as Array<IDistrict>)
  );
  const [district, setDistrict] = useState(
    districts.find((d) => d.slug === school.sch_address.district)?.slug || ''
  );
  const [street, setStreet] = useState(school.sch_address.street || '');

  const [ageFrom, setAgeFrom] = useState(school.sch_age.from || '');
  const [ageTo, setAgeTo] = useState(school.sch_age.to || '');

  const [tuitionFrom, setTuitionFrom] = useState(school.sch_tuition.from || 0);
  const [tuitionTo, setTuitionTo] = useState(school.sch_tuition.to || 0);

  const [introduction, setIntroduction] = useState(
    school.sch_information.introduction || ''
  );
  const [infrastructure, setInfrastructure] = useState(
    school.sch_information.infrastructure || ''
  );
  const [service, setService] = useState(school.sch_information.service || '');
  const [curriculum, setCurriculum] = useState(
    school.sch_information.curriculum || ''
  );
  const [workforce, setWorkforce] = useState(
    school.sch_information.workforce || ''
  );
  const [policy, setPolicy] = useState(school.sch_information.policy || '');

  const [email, setEmail] = useState(school.sch_contact.email || '');
  const [msisdn, setMsisdn] = useState(school.sch_contact.msisdn || '');
  const [facebook, setFacebook] = useState(school.sch_contact.facebook || '');
  const [instagram, setInstagram] = useState(
    school.sch_contact.instagram || ''
  );
  const [website, setWebsite] = useState(school.sch_contact.website || '');
  const [map, setMap] = useState(school.sch_contact.map || '');

  const [loading, setLoading] = useState(false);
  const params = useParams();

  const toastIdRef = useRef<any>(null);

  const fetcher = useFetcher<typeof action>();

  useEffect(() => {
    switch (fetcher.state) {
      case 'submitting':
        toastIdRef.current = notify.loading('Loadding...', {
          autoClose: false,
        });
        setLoading(true);
        break;

      case 'idle':
        if (fetcher.data?.toast && toastIdRef.current) {
          const { toast: toastData } = fetcher.data as any;
          notify.update(toastIdRef.current, {
            render: toastData.message,
            type: toastData.type || 'success', // Default to 'success' if type is not provided
            autoClose: 3000,
            isLoading: false,
          });
          toastIdRef.current = null;
          setLoading(false);
          break;
        }

        notify.update(toastIdRef.current, {
          render: fetcher.data?.toast.message,
          autoClose: 3000,
          isLoading: false,
          type: 'error',
        });

        break;
    }
  }, [fetcher.state]);

  useEffect(() => {
    setIsChanged(
      name !== school.sch_name ||
        avatar !== school.sch_avatar ||
        model !== school.sch_model ||
        type !== school.sch_type ||
        program !== school.sch_program ||
        province !== school.sch_address.province ||
        district !== school.sch_address.district ||
        street !== school.sch_address.street ||
        ageFrom !== school.sch_age.from ||
        ageTo !== school.sch_age.to ||
        tuitionFrom !== school.sch_tuition.from ||
        tuitionTo !== school.sch_tuition.to ||
        introduction !== school.sch_information.introduction ||
        infrastructure !== school.sch_information.infrastructure ||
        service !== school.sch_information.service ||
        curriculum !== school.sch_information.curriculum ||
        workforce !== school.sch_information.workforce ||
        policy !== school.sch_information.policy ||
        email !== school.sch_contact.email ||
        msisdn !== school.sch_contact.msisdn ||
        facebook !== school.sch_contact.facebook ||
        instagram !== school.sch_contact.instagram ||
        website !== school.sch_contact.website ||
        map !== school.sch_contact.map
    );
  }, [
    school,
    name,
    avatar,
    model,
    type,
    program,
    province,
    district,
    street,
    ageFrom,
    ageTo,
    tuitionFrom,
    tuitionTo,
    introduction,
    infrastructure,
    service,
    curriculum,
    workforce,
    policy,
    email,
    msisdn,
    facebook,
    instagram,
    website,
    map,
  ]);

  useEffect(() => {
    getDistrictsByProvinceCode(
      provinces.find((p) => p.slug === province)?.code || ''
    );
    const districts =
      getDistrictsByProvinceCode(
        provinces.find((p) => p.slug === province)?.code || ''
      ) || ([] as Array<IDistrict>);

    setDistricts(districts);
    setDistrict(
      districts.find((d) => d.slug === school.sch_address.district)?.slug || ''
    );
  }, [province]);

  return (
    <fetcher.Form
      className='container grid grid-cols-12 gap-6'
      method='PUT'
      encType='multipart/form-data'
    >
      {/* name */}
      <div className='col-span-12'>
        <label
          htmlFor='name'
          className='block text-sm font-semibold leading-6 text-black'
        >
          Name
        </label>
        <div className='mt-2.5'>
          <input
            type='text'
            name='name'
            id='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete='name'
            className='block w-full rounded px-3.5 py-2 border border-zinc-300 placeholder:text-gray-400 focus:outline-none'
            required
          />
        </div>
      </div>

      {/* avatar */}
      <div className='col-span-6 col-span-6 row-span-2'>
        <p className='block text-sm font-semibold leading-6 text-black mb-4'>
          Avatar
        </p>

        <div className='flex flex-col items-center justify-center'>
          {avatar && (
            <div className='relative wrapper rounded-xl border border-blue-100 w-full flex justify-center p-2 shadow-sm shadow-blue-500 h-32'>
              <img
                src={avatar}
                alt=''
                className='h-full w-full m-auto object-contain object-center'
              />

              <button
                className='absolute top-2 right-4'
                type='button'
                onClick={() => setAvatar('')}
              >
                <RiCloseLine />
              </button>
            </div>
          )}

          <label
            htmlFor='avatar'
            className='cursor-pointer flex flex-col w-full items-center rounded-xl border-2 border-dashed border-blue-400 bg-white p-6 text-center'
            style={{ display: !avatar ? 'block' : 'none' }}
          >
            <RiUploadCloud2Line className='w-6 h-6 text-blue-400 m-auto' />

            <h2 className='text-xl mt-2 font-medium text-gray-700 tracking-wide'>
              avatar
            </h2>

            <p className='mt-2 text-gray-500 tracking-wide'>
              Upload or darg & drop your file SVG, PNG, JPG or GIF.
            </p>

            <input
              id='avatar'
              type='file'
              name='avatar'
              accept='image/*'
              className='hidden'
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const url = URL.createObjectURL(file);
                setAvatar(url);
              }}
            />
          </label>

          <input
            className='hidden'
            type='text'
            name='folder'
            value='schools'
            readOnly
          />
        </div>
      </div>

      {/* Model */}
      <div className='col-span-6 row-span-3 flex flex-col gap-6'>
        <Select
          label='Mô hình'
          className='w-full p-2 shadow-sm shadow-blue-500 ring-1 ring-inset ring-blue-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6 focus:outline-none'
          value={model}
          name='model'
          onChange={(e) => setModel(e.target.value as any)}
          required
        >
          {Object.values(SCHOOL.MODEL).map(({ name, slug }, i) => (
            <option key={i} value={slug}>
              {name}
            </option>
          ))}
        </Select>

        <Select
          label='Loại hình trường'
          className='w-full p-2 shadow-sm shadow-blue-500 ring-1 ring-inset ring-blue-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6 focus:outline-none'
          value={type}
          name='type'
          onChange={(e) => setType(e.target.value as any)}
          required
        >
          {Object.values(SCHOOL.TYPE).map(({ name, slug }, i) => (
            <option key={i} value={slug}>
              {name}
            </option>
          ))}
        </Select>

        <Select
          label='Chương trình học'
          className='w-full p-2 shadow-sm shadow-blue-500 ring-1 ring-inset ring-blue-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6 focus:outline-none'
          value={program}
          name='program'
          onChange={(e) => setProgram(e.target.value as any)}
          required
        >
          {Object.values(SCHOOL.PROGRAM).map(({ name, slug }, i) => (
            <option key={i} value={slug}>
              {name}
            </option>
          ))}
        </Select>
      </div>

      {/* Adress */}
      <>
        <div className='col-span-6'>
          <Select
            label='Tỉnh/Thành phố'
            className='w-full p-2 shadow-sm shadow-blue-500 ring-1 ring-inset ring-blue-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6 focus:outline-none'
            value={province}
            name='province'
            onChange={(e) => setProvince(e.target.value as any)}
            required
          >
            <option value=''></option>
            {provinces.map(({ name, slug }, i) => (
              <option key={i} value={slug}>
                {name}
              </option>
            ))}
          </Select>
        </div>

        <div className='col-span-6'>
          <Select
            label='Quận/Huyện'
            className='w-full p-2 shadow-sm shadow-blue-500 ring-1 ring-inset ring-blue-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6 focus:outline-none'
            value={district}
            name='district'
            onChange={(e) => setDistrict(e.target.value as any)}
            required
          >
            <option value=''></option>
            {districts.map(({ name, slug }, i) => (
              <option key={i} value={slug}>
                {name}
              </option>
            ))}
          </Select>
        </div>

        {/* Age */}
        <div className='col-span-6 flex gap-6'>
          <TextInput
            name='ageFrom'
            value={ageFrom}
            label='Từ tuổi'
            onChange={setAgeFrom}
            required
          />

          <TextInput
            name='ageTo'
            value={ageTo}
            label='Đến tuổi'
            onChange={setAgeTo}
            required
          />
        </div>

        <div className='col-span-6'>
          <TextInput
            label='Địa chỉ cụ thể'
            value={street}
            name='street'
            onChange={setStreet}
            required
          />
        </div>
      </>

      {/* Tuition */}
      <div className='col-span-6 flex gap-4'>
        <TextInput
          name='tuitionFrom'
          value={tuitionFrom}
          label='Học phí từ'
          type='number'
          onChange={setTuitionFrom}
          required
        />

        <TextInput
          name='tuitionTo'
          value={tuitionTo}
          label='Học phí đến'
          type='number'
          onChange={setTuitionTo}
          required
        />
      </div>

      {/* social */}
      <div className='col-span-6 grid grid-cols-2 row-span-3 gap-6'>
        <TextInput
          name='email'
          value={email}
          label='Email'
          type='email'
          onChange={setEmail}
          required
        />

        <TextInput
          name='msisdn'
          value={msisdn}
          label='Số điện thoại'
          type='tel'
          onChange={setMsisdn}
          required
        />

        <TextInput
          name='facebook'
          value={facebook}
          label='Facebook'
          type='url'
          onChange={setFacebook}
          required
        />

        <TextInput
          name='instagram'
          value={instagram}
          label='Instagram'
          type='url'
          onChange={setInstagram}
          required
        />

        <TextInput
          name='website'
          value={website}
          label='Website'
          type='url'
          onChange={setWebsite}
          required
        />

        <TextInput
          name='map'
          value={map}
          label='Map'
          type='url'
          onChange={setMap}
          required
        />
      </div>

      <Buttons
        loading={loading}
        schoolId={params.id}
        isChanged={isChanged}
        navigate={navigate}
      />
    </fetcher.Form>
  );
}

const Buttons = ({
  loading,
  schoolId,
  isChanged,
  navigate,
}: {
  loading: boolean;
  schoolId?: string;
  isChanged: boolean;
  navigate: any;
}) => (
  <div className='col-span-12 flex text-xs justify-between'>
    <button
      className='center rounded-lg bg-red py-2 px-3 font-sans font-bold uppercase text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg enable:active:bg-red-500/80 disabled:opacity-60'
      type='button'
      disabled={loading}
      onClick={async () => {
        if (confirm('Bạn có chắc muốn xóa trường học này chứ?')) {
          await fetch(
            `/cmsdesk/schools/${schoolId}/edit?_data=routes/cmsdesk.schools_.$id.edit`,
            {
              method: 'DELETE',
            }
          );
          navigate('/cmsdesk/schools');
        }
      }}
    >
      Delete
    </button>

    <div className='flex gap-x-2'>
      <button
        className='center rounded-lg bg-blue-500 py-2 px-3 font-sans font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg enable:active:bg-blue-500/80 disabled:opacity-60'
        type='submit'
        disabled={!isChanged || loading}
      >
        Save
      </button>

      <button
        className='center rounded-lg border border-blue-500 py-2 px-3 font-sans font-bold uppercase text-blue-500 shadow-md shadow-blue-500/20 transition-all hover:shadow-lg active:opacity-60'
        onClick={() => navigate(-1)}
        type='button'
        disabled={loading}
      >
        Cancel
      </button>
    </div>
  </div>
);

import { useLoaderData } from '@remix-run/react';
import { useEffect, useState } from 'react';

// import { loader, action } from '~/routes/cmsdesk+/schools+/$id.edit';
import Select from '~/widgets/Select';
import { ISchool, ISchoolDetail } from '~/interfaces/school.interface';
import TextInput from '~/components/TextInput';
import ImageInput from '~/components/ImageInput';
import Wrapper from './Wrapper';
import { SCHOOL } from '~/constants/school.constant';
import {
  getDistrictByCode,
  getDistrictBySlug,
  getDistrictsByProvinceCode,
  getProvinceByCode,
  getProvinceBySlug,
  provinces,
} from '~/utils/address.util';

export default function SchoolEditor({
  school,
  type,
}: {
  school?: ISchoolDetail;
  type: 'update' | 'create';
}) {
  const [isChanged, setIsChanged] = useState(false);
  const [schoolName, setSchoolName] = useState(school?.sch_name || '');
  const [schoolAvatar, setSchoolAvatar] = useState(school?.sch_avatar || '');
  const [schoolModel, setSchoolModel] = useState(school?.sch_model || '');
  const [schoolType, setSchoolType] = useState(school?.sch_type || '');
  const [schoolProgram, setSchoolProgram] = useState(school?.sch_program || '');
  const [province, setProvince] = useState(
    getProvinceByCode(school?.sch_address?.province) || provinces[0]
  );
  const [districts, setDistricts] = useState(
    getDistrictsByProvinceCode(province.code)
  );
  const [district, setDistrict] = useState(
    getDistrictByCode(districts, school?.sch_address?.district) || districts[0]
  );
  const [street, setStreet] = useState(school?.sch_address?.street || '');
  const [fromAge, setFromAge] = useState(school?.sch_age?.from || '');
  const [toAge, setToAge] = useState(school?.sch_age?.to || '');
  const [fromTuition, setFromTuition] = useState(
    school?.sch_tuition?.from || ''
  );
  const [toTuition, setToTuition] = useState(school?.sch_tuition?.to || '');
  const [introduction, setIntroduction] = useState(
    school?.sch_information?.introduction || ''
  );
  const [infrastructure, setInfrastructure] = useState(
    school?.sch_information?.infrastructure || ''
  );
  const [service, setService] = useState(
    school?.sch_information?.service || ''
  );
  const [curriculum, setCurriculum] = useState(
    school?.sch_information?.curriculum || ''
  );
  const [workforce, setWorkforce] = useState(
    school?.sch_information?.workforce || ''
  );
  const [policy, setPolicy] = useState(school?.sch_information?.policy || '');
  const [email, setEmail] = useState(school?.sch_contact?.email || '');
  const [msisdn, setMsisdn] = useState(school?.sch_contact?.msisdn || '');
  const [facebook, setFacebook] = useState(school?.sch_contact?.facebook || '');
  const [instagram, setInstagram] = useState(
    school?.sch_contact?.instagram || ''
  );
  const [website, setWebsite] = useState(school?.sch_contact?.website || '');
  const [map, setMap] = useState(school?.sch_contact?.map || '');

  useEffect(() => {
    setDistricts(getDistrictsByProvinceCode(province.code));
    setDistrict(districts[0]);
  }, [province.code]);

  return (
    <Wrapper fetcherKey={school?.id || 'new'} type={type} isChanged={isChanged}>
      <div className='name col-span-12'>
        <TextInput
          label='Tên trường'
          name='name'
          value={schoolName}
          onChange={setSchoolName}
        />
      </div>

      <div className='avatar col-span-6 row-span-2'>
        <ImageInput
          label='Ảnh đại diện'
          name='avatar'
          value={schoolAvatar}
          onChange={setSchoolAvatar}
        />
      </div>

      <div className='model col-span-6'>
        <Select
          label='Mô hình'
          name='model'
          value={schoolModel}
          onChange={(e) => setSchoolModel(e.target.value)}
          className='w-full'
        >
          <option value='' disabled>
            Chọn mô hình
          </option>
          {Object.values(SCHOOL.MODEL).map((model, i) => (
            <option key={i} value={model.slug}>
              {model.name}
            </option>
          ))}
        </Select>
      </div>

      <div className='program col-span-6'>
        <Select
          label='Chương trình đào tạo'
          name='program'
          value={schoolModel}
          onChange={(e) => setSchoolModel(e.target.value)}
          className='w-full'
        >
          <option value='' disabled>
            Chọn chương trình đào tạo
          </option>
          {Object.values(SCHOOL.PROGRAM).map((program, i) => (
            <option key={i} value={program.slug}>
              {program.name}
            </option>
          ))}
        </Select>
      </div>

      <div className='type col-span-6'>
        <Select
          label='Loại hình'
          name='type'
          value={schoolType}
          onChange={(e) => setSchoolType(e.target.value)}
          className='w-full'
        >
          <option value='' disabled>
            Chọn loại hình
          </option>
          {Object.values(SCHOOL.TYPE).map((type, i) => (
            <option key={i} value={type.slug}>
              {type.name}
            </option>
          ))}
        </Select>
      </div>

      <div className='province col-span-6'>
        <Select
          label='Tỉnh/Thành phố'
          name='province'
          className='w-full'
          value={province.slug}
          onChange={(e) => setProvince(getProvinceBySlug(e.target.value)!)}
        >
          <option value='' disabled>
            Chọn tỉnh/thành phố
          </option>

          {provinces.map((p) => (
            <option key={p.code} value={p.slug}>
              {p.name}
            </option>
          ))}
        </Select>
      </div>

      <div className='street col-span-6'>
        <TextInput
          label='Địa chỉ'
          name='address'
          value={street}
          onChange={setStreet}
        />
      </div>

      <div className='district col-span-6'>
        <Select
          label='Quận/Huyện'
          name='district'
          className='w-full'
          value={district.slug}
          onChange={(e) =>
            setDistrict(getDistrictBySlug(districts, e.target.value)!)
          }
        >
          <option value='' disabled>
            Chọn quận/huyện
          </option>

          {districts.map((d) => (
            <option key={d.code} value={d.slug}>
              {d.name}
            </option>
          ))}
        </Select>
      </div>

      <div className='fromAge col-span-6'>
        <TextInput
          label='Độ tuổi từ'
          name='fromAge'
          value={fromAge}
          onChange={setFromAge}
        />
      </div>

      <div className='toAge col-span-6'>
        <TextInput label='Đến' name='toAge' value={toAge} onChange={setToAge} />
      </div>

      <div className='fromTuition col-span-6'>
        <TextInput
          label='Học phí từ'
          name='fromTuition'
          value={fromTuition}
          onChange={setFromTuition}
        />
      </div>

      <div className='toTuition col-span-6'>
        <TextInput
          label='Đến'
          name='toTuition'
          value={toTuition}
          onChange={setToTuition}
        />
      </div>

      <div className='introduction col-span-12'>
        <TextInput
          label='Giới thiệu'
          name='introduction'
          value={introduction}
          onChange={setIntroduction}
        />
      </div>

      <div className='infrastructure col-span-12'>
        <TextInput
          label='Cơ sở vật chất'
          name='infrastructure'
          value={infrastructure}
          onChange={setInfrastructure}
        />
      </div>

      <div className='service col-span-12'>
        <TextInput
          label='Dịch vụ'
          name='service'
          value={service}
          onChange={setService}
        />
      </div>

      <div className='curriculum col-span-12'>
        <TextInput
          label='Chương trình'
          name='curriculum'
          value={curriculum}
          onChange={setCurriculum}
        />
      </div>

      <div className='workforce col-span-12'>
        <TextInput
          label='Đội ngũ'
          name='workforce'
          value={workforce}
          onChange={setWorkforce}
        />
      </div>

      <div className='policy col-span-12'>
        <TextInput
          label='Chính sách'
          name='policy'
          value={policy}
          onChange={setPolicy}
        />
      </div>

      <div className='email col-span-6'>
        <TextInput
          label='Email'
          name='email'
          value={email}
          onChange={setEmail}
        />
      </div>

      <div className='msisdn col-span-6'>
        <TextInput
          label='Số điện thoại'
          name='msisdn'
          value={msisdn}
          onChange={setMsisdn}
        />
      </div>

      <div className='facebook col-span-6'>
        <TextInput
          label='Facebook'
          name='facebook'
          value={facebook}
          onChange={setFacebook}
        />
      </div>

      <div className='instagram col-span-6'>
        <TextInput
          label='Instagram'
          name='instagram'
          value={instagram}
          onChange={setInstagram}
        />
      </div>

      <div className='website col-span-6'>
        <TextInput
          label='Website'
          name='website'
          value={website}
          onChange={setWebsite}
        />
      </div>

      <div className='map col-span-6'>
        <TextInput label='Bản đồ' name='map' value={map} onChange={setMap} />
      </div>
    </Wrapper>
  );
}

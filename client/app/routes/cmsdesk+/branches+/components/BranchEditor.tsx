import { useEffect, useRef, useState } from 'react';
import pkg from 'vn-provinces';

import { IBranchDetail } from '~/interfaces/branch.interface';
import TextInput from '@components/TextInput';
import Wrapper from './Wrapper';
import Select from '~/widgets/Select';
import CheckboxInput from '~/components/CheckboxInput';

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

const { getProvinces, getDistrictsByProvinceCode, getProvinceByCode } = pkg;
const provinces = getProvinces() as Array<IProvince>;

export default function BranchEditor({
  branch,
  type,
}: {
  branch?: IBranchDetail;
  type: 'update' | 'create';
}) {
  const [isChanged, setIsChanged] = useState(false);
  const [email, setEmail] = useState(branch?.bra_email || '');
  const [msisdn, setMsisdn] = useState(branch?.bra_msisdn || '');
  const [province, setProvince] = useState(
    provinces.find((p) => p.slug === branch?.bra_address.province)?.slug || ''
  );
  const [districts, setDistricts] = useState(
    provinces.find((p) => p.slug === branch?.bra_address.province)?.code
      ? getDistrictsByProvinceCode(
          provinces.find((p) => p.slug === branch?.bra_address.province)
            ?.code || ''
        )
      : ([] as Array<IDistrict>)
  );
  const [district, setDistrict] = useState(
    districts.find((d) => d.slug === branch?.bra_address.district)?.slug || ''
  );
  // const [ward, setWard] = useState(branch?.bra_address);
  const [street, setStreet] = useState(branch?.bra_address.street || '');
  const [isMain, setIsMain] = useState(branch?.bra_isMain || false);
  const [map, setMap] = useState(branch?.bra_map || '');

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
      districts.find((d) => d.slug === branch?.bra_address.district)?.slug || ''
    );
  }, [province]);

  useEffect(() => {
    if (branch) {
      setIsChanged(
        email !== branch.bra_email ||
          msisdn !== branch.bra_msisdn ||
          province !== branch?.bra_address.province ||
          district !== branch?.bra_address.district ||
          street !== branch.bra_address.street ||
          isMain !== branch.bra_isMain ||
          map !== branch.bra_map
      );
    }
  }, [branch, email, msisdn, province, district, street, isMain, map]);

  return (
    <Wrapper fetcherKey={branch?.id || 'new'} type={type} isChanged={isChanged}>
      <div className='col-span-6'>
        <TextInput
          label='Email'
          name='email'
          type='email'
          value={email}
          onChange={setEmail}
        />
      </div>

      <div className='col-span-6 col-start-1'>
        <TextInput
          label='Số điện thoại'
          name='msisdn'
          value={msisdn}
          onChange={setMsisdn}
          pattern='[0-9]{10,11}'
        />
      </div>

      <div className='col-span-6 col-start-1'>
        <TextInput label='Map' name='map' value={map} onChange={setMap} />
      </div>

      <div className='col-span-6 row-start-1 col-start-7'>
        <Select
          label='Tỉnh/Thành phố'
          name='province'
          className='w-full'
          value={province}
          onChange={(e) => setProvince(e.target.value)}
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

      <div className='col-span-6 row-start-2 col-start-7'>
        <Select
          label='Quận/Huyện'
          name='district'
          className='w-full'
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
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

      <div className='col-span-6 row-start-3 col-start-7'>
        <TextInput
          label='Địa chỉ chi tiết'
          name='street'
          value={street}
          onChange={setStreet}
        />
      </div>

      <div className='col-span-6'>
        <CheckboxInput
          label='Đặt làm chi nhánh chính'
          type='checkbox'
          name='isMain'
          checked={isMain}
          onChange={setIsMain}
        />
      </div>
    </Wrapper>
  );
}

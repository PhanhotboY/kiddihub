import { Form } from '@remix-run/react';
import { RiCloseLine, RiSearchLine } from '@remixicon/react';
import { useEffect, useState } from 'react';
import pkg from 'vn-provinces';
import SearchSelect from '~/components/SearchSelect';
import { SCHOOL } from '~/constants/school.constant';

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
const schoolModels = Object.values(SCHOOL.MODEL) as Array<{
  name: string;
  slug: string;
  link: string;
}>;

export default function SearchBox({
  className,
  sketch,
  defaultSchoolModel,
  defaultProvince,
  defaultDistrict,
}: {
  className?: string;
  sketch?: boolean;
  defaultSchoolModel?: string;
  defaultProvince?: string;
  defaultDistrict?: string;
}) {
  const [schoolModel, setSchoolModel] = useState(
    schoolModels.find((sm) => sm.slug === defaultSchoolModel) || schoolModels[0]
  );
  const [query, setQuery] = useState('');
  const [province, setProvince] = useState<IProvince>({} as any); // Hồ Chí Minh
  const [districts, setDistricts] = useState<Array<IDistrict>>([]);
  const [district, setDistrict] = useState<IDistrict>({} as any);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const districts =
      getDistrictsByProvinceCode(province.code) || ([] as Array<IDistrict>);

    setDistricts(districts);
    setDistrict(districts[0] || ({} as any));
  }, [province.slug]);

  return (
    <div className='flex justify-center'>
      <Form
        className='w-full'
        action={
          `/${schoolModel.slug}` +
          (province.slug
            ? `/${province.slug}` + (district.slug ? `/${district.slug}` : '')
            : '')
        }
        method='GET'
      >
        <div
          className={`h-full w-full flex items-center bg-white rounded-lg overflow-hidden p-2 justify-between text-[--sub1-text-color] lg:divide-x divide-zinc-200 ${
            sketch ? 'gap-8' : 'gap-4'
          } ${className || ''}`}
        >
          <div
            className={`fixed lg:static inset-0 w-full lg:w-fit bg-black/50 lg:bg-transparent z-50 lg:z-0 max-lg:transition-all duration-300 max-lg:-translate-x-full ${
              isMenuOpen ? 'max-lg:translate-x-0' : ''
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div
              className='relative bg-white lg:bg-transparent w-full sm:w-2/3 lg:w-fit h-full p-4 lg:p-0'
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <div className='lg:hidden w-full flex justify-between mb-6'>
                <p className='text-xl'>Tìm kiếm</p>

                <button
                  className='absolute top-4 right-4'
                  type='button'
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  <RiCloseLine size={28} />
                </button>
              </div>

              <div
                className={`lg:h-fit grid grid-cols-2 lg:flex lg:divide-x divide-zinc-200 ${
                  sketch ? 'gap-4 lg:gap-8' : 'gap-4'
                }`}
              >
                <SearchSelect
                  sketch={sketch}
                  label='Trường, trung tâm'
                  options={schoolModels}
                  className='col-span-1'
                  value={schoolModel}
                  onChange={(e) => {
                    setSchoolModel(
                      schoolModels.find((st) => st.slug === e.target.value) ||
                        ({} as any)
                    );
                  }}
                />

                <SearchSelect
                  sketch={sketch}
                  label={'Tỉnh thành'}
                  options={provinces}
                  className='col-span-1'
                  value={province}
                  selectAll
                  onChange={(e) => {
                    setProvince(
                      provinces.find((p) => p.slug === e.target.value) ||
                        ({} as any)
                    );
                  }}
                />

                <SearchSelect
                  sketch={sketch}
                  label={'Quận huyện'}
                  options={districts}
                  value={district}
                  selectAll
                  className='col-span-2'
                  onChange={(e) => {
                    setDistrict(
                      districts.find((d) => d.slug === e.target.value) ||
                        ({} as any)
                    );
                  }}
                />

                <button
                  className='lg:hidden bg-[--main-color] text-white text-base rounded-lg px-6 py-2 h-full col-span-1 w-full'
                  type='submit'
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  Tìm kiếm
                </button>
              </div>
            </div>
          </div>

          <div
            className={`w-full max-w-80 relative h-full flex items-center ${
              sketch ? 'grow' : ''
            }`}
          >
            <RiSearchLine
              className='absolute left-2 top-1/2 -translate-y-1/2 block lg:hidden'
              size={16}
            />
            <input
              className={`text-base text-[--sub1-text-color] flex-grow outline-none p-2 pl-8 lg:pl-4 w-full`}
              type='text'
              placeholder='Nhập tên trường, khu vực'
              name='q'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />

            {query && (
              <RiCloseLine
                className='absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer'
                onClick={() => setQuery('')}
              />
            )}
          </div>

          <div className='h-full w-max border-none'>
            <button
              className='hidden lg:block bg-[--main-color] text-white text-base rounded-lg px-6 py-2 h-full w-max'
              type='submit'
            >
              Tìm kiếm
            </button>

            <button
              className='lg:hidden bg-[--main-color] text-white text-base rounded-lg px-6 py-2 h-full w-max'
              type='button'
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              Tìm kiếm
            </button>
          </div>
        </div>
      </Form>
    </div>
  );
}

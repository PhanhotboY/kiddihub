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

const getPublicId = (url?: string) => {
  return url?.split('/upload/')[1] || '';
};

const ageUnit = {
  d: 'ngày',
  m: 'tháng',
  y: 'tuổi',
};

const getUnit = (u: string) => {
  return ageUnit[
    (Object.keys(ageUnit).find((key) => key === u) ||
      'y') as keyof typeof ageUnit
  ];
};

const toAgeString = ({ from, to }: { from: string; to: string }) => {
  const [fromAge, fromAgeUnit] = from.split('');
  const [toAge, toAgeUnit] = to.split('');

  if (from === to) {
    return `${from} ${getUnit(fromAgeUnit)}`;
  }

  return `${fromAge} ${getUnit(fromAgeUnit)} - ${toAge} ${getUnit(toAgeUnit)}`;
};

const abbCurrency = ['đồng', 'nghìn', 'triệu', 'tỷ'];
const shortenNumber = (money: number, stack = 0) => {
  if (Math.abs(+money) < 1_000 || stack >= abbCurrency.length - 1)
    return `${+money.toFixed(2)} ${abbCurrency[stack]}`;

  return shortenNumber(+(+money / 1_000).toFixed(2), ++stack);
};

const toTuitionString = ({ from, to }: { from: number; to: number }) => {
  if (from === to) {
    return shortenNumber(from);
  }

  return `${shortenNumber(from)} - ${shortenNumber(to)}`;
};

const toAddressString = ({
  street,
  province,
  district,
}: {
  street: string;
  province: string;
  district: string;
}) => {
  const p = provinces.find((p) => p.slug === province);
  const districts = getDistrictsByProvinceCode(
    p?.code || ''
  ) as Array<IDistrict>;
  return `${street}, ${
    districts?.find((d) => d.slug === district)?.name || ''
  }, ${p?.name || ''}`;
};

export { getPublicId, toAgeString, toTuitionString, toAddressString };

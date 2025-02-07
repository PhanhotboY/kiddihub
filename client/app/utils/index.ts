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

const toTuitionString = ({
  from,
  to,
}: {
  from: string | number;
  to: string | number;
}) => {
  return `${toCurrencyString(from)} - ${toCurrencyString(to)}`;
};

const abbCurrency = ['Đ', 'K', 'Tr', 'T'];
const shortenNumber = (money: number, stack = 0) => {
  if (Math.abs(+money) < 1_000 || stack >= abbCurrency.length - 1) {
    if (stack < 2) return `${+money.toFixed(2)}${abbCurrency[stack]}`;

    const [int, dec] = money.toFixed(2).split('.');
    return `${int}${abbCurrency[stack]}${dec.replace(/0+$/, '')}`;
  }

  return shortenNumber(+(+money / 1_000).toFixed(2), ++stack);
};

const toCurrencyString = (money: number | string) => {
  return shortenNumber(+money);
};

const getMapLink = (html: string) => {
  return html.match(/<iframe.*src="([^"]*)".*><\/iframe>/)?.[1];
};

const getImageUrl = (name: string) => {
  return `http://localhost:8080/uploads/${name}`;
};

const toVnDateString = (date: string) => {
  return new Date(date).toLocaleDateString('vi-VN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

export {
  toAgeString,
  toCurrencyString,
  toTuitionString,
  getMapLink,
  getImageUrl,
  toVnDateString,
};

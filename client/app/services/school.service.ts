import { fetcher } from '.';

const getSchools = async () => {
  const response = await fetcher('/schools');
  return response;
};

export { getSchools };

import { ISchool, ISchoolDetail } from '~/interfaces/school.interface';
import { fetcher } from '.';
import { ISessionUser } from '~/interfaces/auth.interface';

const getSchools = async (request?: ISessionUser) => {
  // const response = await fetcher('/data/schools');
  const schools = await fetcher('/schools', { request });

  return schools as Array<ISchool>;
};

const getSchoolDetail = async (id: string) => {
  const school = await fetcher(`/schools/${id}`);
  return school as ISchoolDetail;
};

const createSchool = async (school: any, request: ISessionUser) => {
  const scl = await fetcher('/schools', {
    method: 'POST',
    body: JSON.stringify(school),
    request,
  });

  return scl as ISchoolDetail;
};

const updateSchool = async (id: string, data: any, request: ISessionUser) => {
  const school = await fetcher(`/schools/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    request,
  });
  return school as ISchoolDetail;
};

const deleteSchool = async (id: string, request: ISessionUser) => {
  const school = await fetcher(`/schools/${id}`, {
    method: 'DELETE',
    request,
  });
  return school;
};

export {
  getSchoolDetail,
  getSchools,
  createSchool,
  updateSchool,
  deleteSchool,
};

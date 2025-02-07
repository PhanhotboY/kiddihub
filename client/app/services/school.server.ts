import { ISchool, ISchoolCreate } from '~/interfaces/school.interface';
import { fetcher } from '.';
import { ISessionUser } from '~/interfaces/auth.interface';

const getSchoolDetail = async (schoolSlug: string) => {
  const school = await fetcher('/schools/' + schoolSlug);
  return school;
};

const getSchools = async () => {
  const schools = await fetcher('/schools');
  return schools as ISchool[];
};

const createSchool = async (school: ISchoolCreate, request: ISessionUser) => {
  const newSchool = await fetcher('/schools', {
    method: 'POST',
    body: JSON.stringify(school),
    request,
  });
  return newSchool;
};

const updateSchool = async (
  schoolSlug: string,
  school: ISchoolCreate,
  request: ISessionUser
) => {
  const updatedSchool = await fetcher('/schools/' + schoolSlug, {
    method: 'PUT',
    body: JSON.stringify(school),
    request,
  });
  return updatedSchool;
};

const deleteSchool = async (schoolSlug: string, request: ISessionUser) => {
  const deletedSchool = await fetcher('/schools/' + schoolSlug, {
    method: 'DELETE',
    request,
  });
  return deletedSchool;
};

export {
  getSchoolDetail,
  getSchools,
  createSchool,
  updateSchool,
  deleteSchool,
};

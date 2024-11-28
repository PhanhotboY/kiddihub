import { getReturnData } from '@utils/index';
import { NotFoundError } from '../core/errors';
import { ISchool, ISchoolAttrs } from '../interfaces/school.interface';
import { SchoolModel } from '../models/school.model';

const getSchools = async ({
  address,
  name,
  age,
}: {
  address: { province: string; district: string };
  name: string;
  age: {
    from: number;
    to: number;
  };
}) => {
  return await SchoolModel.find(
    {
      $and: [
        { sch_address: address },
        {
          sch_acceptedAge: {
            from: { $lte: age.from || 0 },
            to: { $gte: age.to || 100 },
          },
        },
        ...(name ? [{ $text: { $search: name } }] : []),
      ],
    },
    name
      ? {
          score: { $meta: 'textScore' }, // Include the text score in the projection
        }
      : {}
  ).sort(name ? { score: { $meta: 'textScore' } } : {});
};

const createSchool = async (school: ISchoolAttrs) => {
  const newSchool = await SchoolModel.create(school);
  return getReturnData(newSchool);
};

const getSchoolById = async (id: string) => {
  const school = await SchoolModel.findById(id);
  if (!school) {
    throw new NotFoundError('School not found');
  }
  return getReturnData(school);
};

const updateSchool = async (id: string, update: ISchoolAttrs) => {
  const school = await SchoolModel.findByIdAndUpdate(id, update, { new: true });
  if (!school) {
    throw new NotFoundError('School not found');
  }
  return getReturnData(school);
};

const deleteSchool = async (id: string) => {
  const school = await SchoolModel.findByIdAndDelete(id);
  if (!school) {
    throw new NotFoundError('School not found');
  }
  return getReturnData(school);
};

export { getSchools, createSchool, getSchoolById, updateSchool, deleteSchool };

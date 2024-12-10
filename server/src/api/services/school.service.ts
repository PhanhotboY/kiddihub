import {
  formatAttributeName,
  getReturnData,
  getReturnList,
  removeNestedNullish,
} from '@utils/index';
import { NotFoundError } from '../core/errors';
import { ISchool, ISchoolAttrs } from '../interfaces/school.interface';
import { SchoolModel } from '../models/school.model';
import slugify from 'slugify';
import { isValidObjectId } from 'mongoose';
import { SCHOOL } from '../constants';

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
  const schools = await SchoolModel.find(
    removeNestedNullish({
      $and: [
        { sch_address: address },
        {
          sch_age: {
            from: { $lte: age.from || null },
            to: { $gte: age.to || null },
          },
        },
        ...(name ? [{ $text: { $search: name } }] : []),
      ],
    }),
    {
      ...(name
        ? {
            score: { $meta: 'textScore' }, // Include the text score in the projection
          }
        : {}),
      sch_information: 0, // Exclude the information field
      sch_programs: 0, // Exclude the programs field
    }
  )
    .sort(name ? { score: { $meta: 'textScore' } } : {})
    .lean()
    .exec();

  return getReturnList(schools);
};

const createSchool = async (school: ISchoolAttrs) => {
  const newSchool = await SchoolModel.build({
    ...school,
    slug: school.name && slugify(school.name, { lower: true }),
  });
  return getReturnData(newSchool);
};

const getSchoolById = async (id: string) => {
  let school;
  if (isValidObjectId(id)) {
    // if the given value is a valid ObjectId
    school = await SchoolModel.findById(id);
  } else {
    // else, search by slug
    school = await SchoolModel.findOne({ sch_slug: id });
  }

  if (!school) {
    throw new NotFoundError('School not found');
  }

  return getReturnData(school);
};

const updateSchool = async (id: string, update: ISchoolAttrs) => {
  const school = await SchoolModel.findByIdAndUpdate(
    id,
    {
      ...formatAttributeName(removeNestedNullish(update), SCHOOL.PREFIX),
      sch_slug: update.name && slugify(update.name, { lower: true }),
    },
    { new: true }
  );
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

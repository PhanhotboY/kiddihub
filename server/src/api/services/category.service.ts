import { CategoryModel } from '@models/category.model';
import {
  formatAttributeName,
  getReturnData,
  getReturnList,
  removeNestedNullish,
} from '@utils/index';
import { ICategoryAttrs } from '../interfaces/category.interface';
import { CATEGORY } from '../constants';
import { NotFoundError } from '../core/errors';

const getCategories = async () => {
  const categories = await CategoryModel.find({}, { __v: 0 })
    .lean() // If you need plain JS objects
    .populate({
      path: 'cat_parent',
      select: 'cat_name cat_page cat_parent',
    })
    .populate({
      path: 'cat_page',
      select: 'pst_title pst_slug id',
    })
    .exec();
  return getReturnList(categories);
};

const getCategory = async (id: string) => {
  const category = await CategoryModel.findById(id)
    .lean() // If you need plain JS objects
    .populate({
      path: 'cat_parent',
      select: 'cat_name cat_page',
    })
    .populate({
      path: 'cat_page',
      select: 'pst_title pst_slug id',
    })
    .exec();
  if (!category) {
    throw new NotFoundError('Category not found');
  }
  return getReturnData(category);
};

const createCategory = async (category: ICategoryAttrs) => {
  const newCategory = await CategoryModel.build(removeNestedNullish(category));

  return newCategory;
};

const updateCategory = async (id: string, category: ICategoryAttrs) => {
  const updatedCategory = await CategoryModel.findByIdAndUpdate(
    id,
    {
      ...formatAttributeName(removeNestedNullish(category), CATEGORY.PREFIX),
      cat_parent: category.parent === '' ? null : category.parent,
    },
    { new: true }
  );
  if (!updatedCategory) {
    throw new NotFoundError('Category not found');
  }

  return updatedCategory;
};

const deleteCategory = async (id: string) => {
  const deletedCategory = await CategoryModel.deleteOne({ _id: id });

  return deletedCategory;
};

export {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
};

import slugify from 'slugify';

import {
  formatAttributeName,
  getReturnData,
  getReturnList,
  removeNestedNullish,
} from '@utils/index';
import { IPageAttrs } from '../interfaces/page.interface';
import { PageModel } from '../models/page.model';
import { BadRequestError, NotFoundError } from '../core/errors';
import { PAGE } from '../constants';
import { isValidObjectId } from 'mongoose';
import { IPageCategoryAttrs } from '../interfaces/pageCategory.interface';
import { PageCategoryModel } from '@models/pageCategory.model';
import { IPageTemplateAttrs } from '../interfaces/pageTemplate.interface';
import { PageTemplateModel } from '@models/pageTemplate.model';
import { getExcerpt } from '@utils/page.util';

const createPage = async (page: IPageAttrs) => {
  if (!page.category) {
    const defaultCategory = await PageCategoryModel.findOne({
      pct_slug: PAGE.CATEGORY.OPTIONS.NONE.slug,
    });
    page.category = defaultCategory!._id.toString();
  }

  const newPage = await PageModel.build({
    ...page,
    excerpt: page.excerpt || getExcerpt(page.content),
    slug: page.title && slugify(page.title, { lower: true }),
    views: 0,
  });
  return getReturnData(newPage);
};

const getPublishedPages = async ({
  type,
  q,
}: {
  type?: string;
  q?: string;
}) => {
  let template;
  if (type) template = await getPageTemplate(type);

  const pages = await PageModel.find(
    {
      ...removeNestedNullish({ pst_template: template?.id.toString() }),
      ...(q && {
        $or: [
          { pst_title: { $regex: q, $options: 'i' } },
          { pst_excerpt: { $regex: q, $options: 'i' } },
        ],
      }),
      pst_isPublished: true,
    },
    ['-pst_content']
  );
  return getReturnList(pages);
};

const getAllPages = async (query: any) => {
  const pages = await PageModel.find(
    { ...formatAttributeName(removeNestedNullish(query), PAGE.PREFIX) },
    ['-pst_content']
  );
  return getReturnList(pages);
};

const getUnpublishedPages = async () => {
  const pages = await PageModel.find({ pst_isPublished: false });
  return getReturnList(pages);
};

const getPostDetail = async (id: string) => {
  let page;
  if (isValidObjectId(id)) {
    // if the given value is a valid ObjectId
    page = await PageModel.findById(id).populate([
      {
        path: 'pst_category',
        select: 'pct_name pct_slug',
      },
      {
        path: 'pst_template',
        select: 'ptp_name ptp_code',
      },
    ]);
  } else {
    // else, search by slug
    page = await PageModel.findOne({ pst_slug: id }).populate([
      {
        path: 'pst_category',
        select: 'pct_name pct_slug',
      },
      {
        path: 'pst_template',
        select: 'ptp_name ptp_code',
      },
    ]);
  }

  if (!page) {
    throw new NotFoundError('Page not found');
  }

  return getReturnData(page, { without: ['__v'] });
};

const updatePage = async (id: string, page: IPageAttrs) => {
  delete page.views;
  const updatedPage = await PageModel.findByIdAndUpdate(
    id,
    {
      ...formatAttributeName(
        removeNestedNullish({ ...page, excerpt: getExcerpt(page.content) }),
        PAGE.PREFIX
      ),
      pst_slug: page.title && slugify(page.title, { lower: true }),
    },
    {
      new: true,
    }
  );
  if (!updatedPage) {
    throw new NotFoundError('Page not found');
  }

  return getReturnData(updatedPage);
};

const increasePageViews = async (id: string) => {
  await PageModel.findByIdAndUpdate(id, {
    $inc: { pst_views: 1 },
  });
  return { message: 'Page views increased successfully' };
};

const deletePage = async (id: string) => {
  const deletedPage = await PageModel.findByIdAndDelete(id);
  if (!deletedPage) {
    throw new NotFoundError('Page not found');
  }

  return getReturnData(deletedPage);
};

const createPageCategory = async (pct: IPageCategoryAttrs) => {
  if (pct.parent && !isValidObjectId(pct.parent)) {
    throw new BadRequestError('Invalid parent ID');
  }
  const newPageCategory = await PageCategoryModel.build({
    ...pct,
    slug: pct.name && slugify(pct.name, { lower: true }),
  });
  return getReturnData(newPageCategory);
};

const getPageCategories = async () => {
  const pageCategories = await PageCategoryModel.find(
    {},
    {},
    {
      populate: {
        path: 'pct_parent',
        populate: 'pct_parent',
        select: 'pct_name pct_slug pct_parent',
      },
    }
  );
  return getReturnList(pageCategories);
};

const updatePageCategory = async (id: string, pct: IPageCategoryAttrs) => {
  if (pct.parent && !isValidObjectId(pct.parent)) {
    throw new BadRequestError('Invalid parent ID');
  }
  const updatedPageCategory = await PageCategoryModel.findByIdAndUpdate(
    id,
    {
      ...formatAttributeName(removeNestedNullish(pct), PAGE.CATEGORY.PREFIX),
      slug: pct.name && slugify(pct.name, { lower: true }),
    },
    {
      new: true,
    }
  );
  if (!updatedPageCategory) {
    throw new NotFoundError('Page category not found');
  }

  return getReturnData(updatedPageCategory);
};

const deletePageCategory = async (id: string) => {
  const deletedPageCategory = await PageCategoryModel.findByIdAndDelete(id);
  if (!deletedPageCategory) {
    throw new NotFoundError('Page category not found');
  }

  return getReturnData(deletedPageCategory);
};

const createPageTemplate = async (ptp: IPageTemplateAttrs) => {
  const newPageTemplate = await PageTemplateModel.build(ptp);
  return getReturnData(newPageTemplate);
};

const getPageTemplates = async () => {
  const pageTemplates = await PageTemplateModel.find();
  return getReturnList(pageTemplates);
};

const getPageTemplate = async (id: string) => {
  let template;

  if (isValidObjectId(id)) {
    // if the given value is a valid ObjectId
    template = await PageTemplateModel.findById(id);
  } else {
    // else, search by slug
    template = await PageTemplateModel.findOne({ ptp_code: id });
  }

  if (!template) {
    throw new NotFoundError('Page not found');
  }

  return getReturnData(template);
};

const updatePageTemplate = async (id: string, ptp: IPageTemplateAttrs) => {
  const updatedPageTemplate = await PageTemplateModel.findByIdAndUpdate(
    id,
    formatAttributeName(removeNestedNullish(ptp), PAGE.TEMPLATE.PREFIX),
    {
      new: true,
    }
  );
  if (!updatedPageTemplate) {
    throw new NotFoundError('Page template not found');
  }

  return getReturnData(updatedPageTemplate);
};

const deletePageTemplate = async (id: string) => {
  const deletedPageTemplate = await PageTemplateModel.findByIdAndDelete(id);
  if (!deletedPageTemplate) {
    throw new NotFoundError('Page template not found');
  }

  return getReturnData(deletedPageTemplate);
};

export {
  createPage,
  getPublishedPages,
  getAllPages,
  getUnpublishedPages,
  getPostDetail,
  updatePage,
  deletePage,
  increasePageViews,
  createPageCategory,
  getPageCategories,
  createPageTemplate,
  getPageTemplate,
  getPageTemplates,
  updatePageCategory,
  deletePageCategory,
  updatePageTemplate,
  deletePageTemplate,
};

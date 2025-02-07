import { IPageCategory } from '~/interfaces/pageCategory.interface';
import { fetcher } from '.';

const getPageCategories = async () => {
  const pageCategories = await fetcher('/pages/categories');
  return pageCategories as IPageCategory[];
};

const createPageCategory = async (data: any) => {
  const pageCategory = await fetcher('/pages/categories', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  return pageCategory;
};

export { getPageCategories, createPageCategory };

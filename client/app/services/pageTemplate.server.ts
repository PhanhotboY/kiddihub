import { IPageTemplate } from '~/interfaces/pageTemplate.interface';
import { fetcher } from '.';

const getPageTemplates = async () => {
  const pageTemplates = await fetcher('/pages/templates');
  return pageTemplates as IPageTemplate[];
};

const createPageTemplate = async (data: any) => {
  const pageTemplate = await fetcher('/pages/templates', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  return pageTemplate;
};

export { getPageTemplates, createPageTemplate };

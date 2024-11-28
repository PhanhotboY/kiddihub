import { fetcher } from '.';

const getAppSettings = async () => {
  const res = await fetcher(`/app/settings`);

  return res as {
    app_meta: {
      title: string;
      description: string;
      keywords: string;
    };
    app_favicon?: string;
    app_logo?: string;
    app_contact: {
      email: string;
      phone: string;
      address: string;
    };
    app_social: {
      facebook: string;
      instagram: string;
    };
    app_google: {
      analytics: string;
      reCaptcha: string;
    };
    app_taxCode: string;
  };
};

const updateAppSettings = async (data: Partial<IAppAttrs>, request: any) => {
  const res = await fetcher(`/app/settings`, {
    method: 'PUT',
    body: JSON.stringify(data),
    request,
  });

  return res as IAppAttrs;
};

export interface IAppAttrs {
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  favicon?: string;
  logo?: string;
  contact: {
    email: string;
    phone: string;
    address: string;
  };
  social: {
    facebook: string;
    instagram: string;
  };
  google: {
    analytics: string;
    reCaptcha: string;
  };
  taxCode: string;
}

export { getAppSettings, updateAppSettings };

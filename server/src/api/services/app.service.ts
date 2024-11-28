import {
  formatAttributeName,
  getReturnData,
  removeNestedNullish,
} from '@utils/index';
import { IAppAttrs } from '../interfaces/app.interface';
import { AppModel } from '../models/app.model';
import { APP } from '../constants';

const updateAppSettings = async (settings: IAppAttrs) => {
  let app = await AppModel.findOne({});
  if (!app) {
    const app = await AppModel.build(settings);
    return getReturnData(app);
  }
  await app.updateOne(
    formatAttributeName(removeNestedNullish(settings), APP.PREFIX)
  );

  app = await AppModel.findOne({});

  return getReturnData(app!);
};

const getAppSettings = async () => {
  const app = await AppModel.findOne({});
  if (!app) {
    const app = await AppModel.build({
      meta: {
        title: 'string',
        description: 'string',
        keywords: 'string',
      },
      favicon: 'string',
      logo: 'string',
      contact: {
        email: 'string',
        phone: 'string',
        address: 'string',
      },
      social: {
        facebook: 'string',
        instagram: 'string',
      },
      google: {
        analytics: 'string',
        reCaptcha: 'string',
      },
      taxCode: 'string',
    });
    return getReturnData(app);
  }

  return getReturnData(app);
};

export { updateAppSettings, getAppSettings };

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
  app = await app.updateOne(
    formatAttributeName(removeNestedNullish(settings), APP.PREFIX),
    { new: true }
  );

  return getReturnData(app!);
};

const getAppSettings = async () => {
  const app = await AppModel.findOne({});
  if (!app) {
    const app = await AppModel.build({
      title: '',
      description: '',
      logo: '',
      favicon: '',
      social: {
        facebook: '',
        zalo: '',
        youtube: '',
        tiktok: '',
      },
      taxCode: '',
      headScripts: '',
      bodyScripts: '',
    });
    return getReturnData(app);
  }

  return getReturnData(app);
};

export { updateAppSettings, getAppSettings };

require('dotenv').config();
import { PageTemplateModel } from '@models/pageTemplate.model';
import { mongodbInstance } from '../db/init.mongodb';
import { PAGE, TEMPLATE } from '@constants/index';
import { PageCategoryModel } from '@models/pageCategory.model';
import { TemplateModel } from '@models/template.model';
import { emailVerificationEmailTemplate } from '@utils/email.template';
import { passwordEmailTemplate } from '@utils/password.template';

const htmlTemplate = {
  [TEMPLATE.NAME.PASSWORD]: passwordEmailTemplate,
  [TEMPLATE.NAME.VERIFY_EMAIL]: emailVerificationEmailTemplate,
};

async function main() {
  await mongodbInstance.connect();

  for (const temp of Object.values(PAGE.TEMPLATE.OPTIONS)) {
    await PageTemplateModel.build(temp);
  }
  for (const cat of Object.values(PAGE.CATEGORY.OPTIONS)) {
    // @ts-ignore
    await PageCategoryModel.build(cat);
  }

  for (const name of Object.values(TEMPLATE.NAME)) {
    await TemplateModel.build({
      name,
      html: htmlTemplate[name](),
      status: 'active',
    });
  }

  console.log('Metadata generated successfully!');

  await mongodbInstance.disconnect();
}

main();

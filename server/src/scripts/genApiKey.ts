import { randomBytes } from 'crypto';
import { ApiKeyModel } from '../api/models/apiKey.model';

require('dotenv').config();
import { mongodbInstance } from '../db/init.mongodb';

async function main() {
  await mongodbInstance.connect();

  await ApiKeyModel.create({
    key: randomBytes(32).toString('hex'),
    status: true,
    permissions: ['0000', '1111', '2222'],
  });

  await ApiKeyModel.create({
    key: randomBytes(32).toString('hex'),
    status: true,
    permissions: ['0000'],
  });

  await ApiKeyModel.create({
    key: randomBytes(32).toString('hex'),
    status: true,
    permissions: ['1111'],
  });

  await ApiKeyModel.create({
    key: randomBytes(32).toString('hex'),
    status: true,
    permissions: ['2222'],
  });

  await mongodbInstance.disconnect();
}

main();

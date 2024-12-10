import {
  ActionFunctionArgs,
  json,
  unstable_composeUploadHandlers,
  unstable_createMemoryUploadHandler,
  unstable_parseMultipartFormData,
} from '@remix-run/node';
import { existsSync, writeFileSync, rmSync, write } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { uploadImage } from '~/lib/uploadHandler.server';

export const action = async ({ request }: ActionFunctionArgs) => {
  const r = request.clone();
  const body = await r.formData();
  const folder = body.get('folder') as string;

  if (folder === 'favicon') {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    const path = resolve(__dirname + '../../../public/favicon.ico');

    if (existsSync(path)) {
      rmSync(path);
    }

    const img = body.get('img') as File;
    const buffer = await img.arrayBuffer();
    writeFileSync(path, Buffer.from(buffer));

    return json({
      toast: { message: 'Upload ảnh thành công!', type: 'success' },
    });
  }

  try {
    const formData = await uploadImage(request, folder);

    const imageUrl = formData.get('img') as string;

    return json({
      imageUrl,
      toast: { message: 'Upload ảnh thành công!', type: 'success' },
    });
  } catch (error: any) {
    console.error(error);
    return json({
      toast: { message: error.message, type: 'error' },
    });
  }
};

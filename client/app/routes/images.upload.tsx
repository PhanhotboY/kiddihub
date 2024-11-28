import {
  ActionFunctionArgs,
  json,
  unstable_composeUploadHandlers,
  unstable_createMemoryUploadHandler,
  unstable_parseMultipartFormData,
} from '@remix-run/node';
import { updateAppSettings } from '~/services/app.service';

import { uploadImage } from '~/services/cloudinary.service';

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    const r = request.clone();
    const body = await r.formData();
    const folder = body.get('folder') as string;

    const formData = await unstable_parseMultipartFormData(
      request,
      uploadHandler({ folder })
    );

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

const uploadHandler = ({ id, folder }: { id?: string; folder?: string }) =>
  unstable_composeUploadHandlers(
    // our custom upload handler
    async ({ name, contentType, data, filename }) => {
      if (name !== 'img') {
        return undefined;
      }
      const uploadedImage = await uploadImage(data, { id, folder });

      return uploadedImage.secure_url;
    },
    // fallback to memory for everything else
    unstable_createMemoryUploadHandler()
  );

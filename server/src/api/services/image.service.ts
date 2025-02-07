import { ImageModel } from '@models/image.model';
import {
  formatAttributeName,
  getReturnData,
  getReturnList,
  removeNestedNullish,
} from '@utils/index';
import { BadRequestError, NotFoundError } from '../core/errors';
import { IImageAttrs } from '../interfaces/image.interface';
import { IMAGE } from '../constants/image.constant';

const getImages = async () => {
  const images = await ImageModel.find({}, ['-__v']).lean();
  return getReturnList(images);
};

const getImage = async (name: string) => {
  const image = await ImageModel.findOne({ img_name: name }, ['-__v']).lean();
  if (!image) throw new NotFoundError('Image not found');

  return getReturnData(image);
};

const createImage = async (files?: Express.Multer.File[]) => {
  if (!files) throw new BadRequestError('No image uploaded');

  const newImage = [];
  for (const file of files) {
    const image = await ImageModel.build({
      name: file.filename,
      alt: file.originalname,
    });
    newImage.push(image);
  }
  return getReturnList(newImage);
};

const updateImage = async (name: string, image: IImageAttrs) => {
  let updatedImage = await ImageModel.findOneAndUpdate(
    { img_name: name },
    {
      ...formatAttributeName(removeNestedNullish(image), IMAGE.PREFIX),
    },
    { new: true }
  );
  // If image not found
  if (!updatedImage) throw new NotFoundError('Image not found');
  return getReturnData(updatedImage!);
};

const deleteImage = async (name: string) => {
  const deletedImage = await ImageModel.findOneAndDelete({ img_name: name });
  // If image not found
  if (!deletedImage) throw new NotFoundError('Image not found');
  return getReturnData(deletedImage || {});
};

export { getImages, getImage, createImage, updateImage, deleteImage };

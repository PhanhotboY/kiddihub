import { Schema, Types, model } from 'mongoose';
import { IImage, IImageModel } from '../interfaces/image.interface';
import { formatAttributeName } from '../utils';
import { IMAGE } from '../constants/image.constant';

const sliderSchema = new Schema<IImage, IImageModel>(
  { img_name: String, img_alt: String },
  {
    timestamps: true,
    collection: IMAGE.COLLECTION_NAME,
  }
);

sliderSchema.statics.build = (attrs: IImage) => {
  return ImageModel.create(formatAttributeName(attrs, IMAGE.PREFIX));
};

export const ImageModel = model<IImage, IImageModel>(
  IMAGE.DOCUMENT_NAME,
  sliderSchema
);

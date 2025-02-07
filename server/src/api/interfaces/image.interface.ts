import { HydratedDocument, Model } from 'mongoose';

export interface IRawImage {
  img_name: string;
  img_alt: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IImageAttrs {
  name: string;
  alt: string;
}

export type IImage = HydratedDocument<IRawImage>;

export interface IImageModel extends Model<IImage> {
  build(attrs: IImageAttrs): Promise<IImage>;
}

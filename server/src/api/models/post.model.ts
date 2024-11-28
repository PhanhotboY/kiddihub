import { Schema, Types, model } from 'mongoose';
import { IPost, IPostModel } from '../interfaces/post.interface';
import { formatAttributeName } from '../utils';
import { POST } from '../constants';

const postSchema = new Schema<IPost, IPostModel>(
  {
    pst_title: {
      type: String,
      trim: true,
    },
    pst_content: {
      type: String,
      trim: true,
    },
    pst_excerpt: {
      type: String,
      trim: true,
    },
    pst_thumbnail: {
      type: String,
      trim: true,
    },
    pst_slug: {
      type: String,
      trim: true,
    },
    pst_tags: {
      type: [String],
      trim: true,
    },
    pst_views: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
    collection: POST.COLLECTION_NAME,
  }
);

// Pre-save hook to generate the excerpt
postSchema.pre('save', function (next) {
  // `this` refers to the document being saved
  if (this.pst_content && !this.pst_excerpt) {
    // Set excerpt as the first 100 characters of content (or adjust length as needed)
    this.pst_excerpt = this.pst_content.slice(0, 500); // Adjust the length as needed
  }
  next();
});

postSchema.statics.build = (attrs: IPost) => {
  return PostModel.create(formatAttributeName(attrs, POST.PREFIX));
};

export const PostModel = model<IPost, IPostModel>(
  POST.DOCUMENT_NAME,
  postSchema
);

import slugify from 'slugify';

import {
  formatAttributeName,
  getReturnData,
  getReturnList,
  removeNestedNullish,
} from '@utils/index';
import { IPostAttrs } from '../interfaces/post.interface';
import { PostModel } from '../models/post.model';
import { NotFoundError } from '../core/errors';
import { POST } from '../constants';
import { isValidObjectId } from 'mongoose';

const createPost = async (post: IPostAttrs) => {
  const newPost = await PostModel.build({
    ...post,
    slug: post.title && slugify(post.title, { lower: true }),
    views: 0,
  });
  return getReturnData(newPost);
};

const getPosts = async () => {
  const posts = await PostModel.find({}, ['-pst_content']);
  return getReturnList(posts);
};

const getPostDetail = async (id: string) => {
  let post;
  if (isValidObjectId(id)) {
    // if the given value is a valid ObjectId
    post = await PostModel.findById(id);
  } else {
    // else, search by slug
    post = await PostModel.findOne({ pst_slug: id });
  }

  if (!post) {
    throw new NotFoundError('Post not found');
  }

  return getReturnData(post);
};

const updatePost = async (id: string, post: IPostAttrs) => {
  delete post.views;
  const updatedPost = await PostModel.findByIdAndUpdate(
    id,
    {
      ...formatAttributeName(removeNestedNullish(post), POST.PREFIX),
      pst_slug: post.title && slugify(post.title, { lower: true }),
    },
    {
      new: true,
    }
  );
  if (!updatedPost) {
    throw new NotFoundError('Post not found');
  }

  return getReturnData(updatedPost);
};

const increasePostViews = async (id: string) => {
  await PostModel.findByIdAndUpdate(id, {
    $inc: { pst_views: 1 },
  });
  return { message: 'Post views increased successfully' };
};

const deletePost = async (id: string) => {
  const deletedPost = await PostModel.findByIdAndDelete(id);
  if (!deletedPost) {
    throw new NotFoundError('Post not found');
  }

  return getReturnData(deletedPost);
};

export {
  createPost,
  getPosts,
  getPostDetail,
  updatePost,
  deletePost,
  increasePostViews,
};

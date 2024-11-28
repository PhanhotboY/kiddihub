import { ISessionUser } from '~/interfaces/auth.interface';
import { fetcher } from '.';
import { IPost, IPostDetail } from '~/interfaces/post.interface';

const getPosts = async () => {
  const posts = await fetcher('/posts');
  return posts as IPost[];
};

const getPostDetail = async (id: string) => {
  const post = await fetcher(`/posts/${id}`);
  return post as IPostDetail;
};

const createPost = async (data: any, request: ISessionUser) => {
  const post = await fetcher('/posts', {
    method: 'POST',
    body: JSON.stringify(data),
    request,
  });
  return post;
};

const updatePost = async (id: string, data: any, request: ISessionUser) => {
  const post = await fetcher(`/posts/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    request,
  });
  return post;
};

const deletePost = async (id: string, request?: ISessionUser) => {
  const post = await fetcher(`/posts/${id}`, {
    method: 'DELETE',
    request,
  });
  return post;
};

const increaseViewCount = async (id: string, request: ISessionUser) => {
  const res = await fetcher(`/posts/${id}/views`, {
    method: 'POST',
    request,
  });
  return res;
};

export {
  getPosts,
  getPostDetail,
  createPost,
  updatePost,
  deletePost,
  increaseViewCount,
};

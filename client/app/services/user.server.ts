import { ISessionUser } from '~/interfaces/auth.interface';
import { fetcher } from '.';

const getUsers = async () => {
  const user = await fetcher('/');
};

const getCurrentUser = async (request: ISessionUser) => {
  const user = await fetcher('/users/me', {
    request,
  });
  return user;
};

const createUser = async () => {};

const updateUser = async (userId: string, data: any, request: ISessionUser) => {
  const user = await fetcher(`/users/${userId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    request,
  });
  return user;
};

const deleteUser = async () => {};

export { getUsers, getCurrentUser, createUser, updateUser, deleteUser };

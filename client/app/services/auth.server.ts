import { Authenticator } from 'remix-auth';
import { FormStrategy } from 'remix-auth-form';

import { sessionStorage } from '~/services/session.server';
import { fetcher } from '.';
import { ISessionUser } from '~/interfaces/auth.interface';

// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session
const authenticator = new Authenticator<ISessionUser>(sessionStorage);

authenticator.use(
  new FormStrategy(async ({ form }) => {
    let email = form.get('email') as string;
    let password = form.get('password') as string;

    let user = await login(email, password);

    return user;
  }),
  // each strategy has a name and can be changed to use another one
  // same strategy multiple times, especially useful for the OAuth2 strategy.
  'user-pass'
);

const login = async (email: string, password: string) => {
  console.log('logging in...');
  const res = await fetcher('/auth/signin', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  return res;
};

const logout = async (request: ISessionUser) => {
  await fetcher('/auth/signout', {
    method: 'POST',
    request,
  });
};

export { authenticator, logout };

export * from './app.constant';
export * from './role.constant';
export * from './template.constant';
export * from './user.constant';
export * from './otp.constant';
export * from './resource.constant';
export * from './school.constant';
export * from './review.constant';
export * from './post.constant';

export const KEYTOKEN = {
  COLLECTION_NAME: 'KeyTokens',
  DOCUMENT_NAME: 'KeyToken',
};

export const APIKEY = {
  COLLECTION_NAME: 'ApiKeys',
  DOCUMENT_NAME: 'ApiKey',
};

export const HEADER = {
  API_KEY: 'x-api-key',
  CLIENT_ID: 'x-client-id',
  AUTHORIZATION: 'authorization',
  REFRESH_TOKEN: 'x-refresh-token',
};

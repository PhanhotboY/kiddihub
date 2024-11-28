const API_URL = process.env.API_URL || 'http://localhost:3000';

const headers = {
  'Content-Type': 'application/json',
  'x-api-key': process.env.API_APIKEY || '',
};

const fetcher = async (
  path: string,
  options?: RequestInit & {
    request?: {
      user: {
        id: string;
        usr_firstName: string;
        usr_lastName: string;
        usr_email: string;
        usr_msisdn: string;
      };
      tokens: { accessToken: string; refreshToken: string };
    };
  }
) => {
  const response = await fetch(`${API_URL}${path}`, {
    method: 'GET',
    ...options,
    headers: {
      ...headers,
      ...options?.headers,
      'x-client-id': options?.request?.user?.id || '',
      Authorization: options?.request?.tokens?.accessToken || '',
    },
  });
  const data = await response.json();
  if (data.errors) {
    console.log(options?.method || 'GET', path, data.errors);
    throw new Response(null, {
      status: data.errors.status,
      statusText: data.errors.message,
    });
  }
  return data.metadata;
};

export { fetcher };

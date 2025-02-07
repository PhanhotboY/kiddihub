const env = process.env;

interface IServerConfig {
  serverUrl: string;
  clientUrl: string;
}

const serverConfigEnv: Record<string, IServerConfig> = {
  development: {
    serverUrl: env.DEV_SERVER_URL as string,
    clientUrl: env.DEV_CLIENT_URL as string,
  },
  production: {
    serverUrl: env.PRO_SERVER_URL as string,
    clientUrl: env.PRO_CLIENT_URL as string,
  },
};

export const serverConfig: IServerConfig =
  serverConfigEnv[env.NODE_ENV || 'development'] || serverConfigEnv.development;

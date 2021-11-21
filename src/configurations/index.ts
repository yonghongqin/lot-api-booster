import * as nconf from "nconf";
import * as path from "path";

// Read Configurations
const configs = new nconf.Provider({
  env: true,
  argv: true,
  store: {
    type: "file",
    file: path.join(
      __dirname,
      `./config.${process.env.NODE_ENV || "dev"}.json`
    ),
  },
});

export interface IServerConfigurations {
  port: number;
  plugins: Array<string>;
  jwtSecret: string;
  jwtExpiration: string;
  routePrefix: string;
}

export interface IDataConfiguration {
  connectionString: string;
}

export interface IRdsDataConfiguration {
  connectionString: { [key: string]: string };
}

export function getDatabaseConfig(): IDataConfiguration {
  return configs.get("database");
}

export function getServerConfigs(): IServerConfigurations {
  return configs.get("server");
}

export function getRdsConfig(): IRdsDataConfiguration {
  return configs.get("database-rds");
}

/**
 * external API call
 */
export interface IExternalCallConfigurations {
  port: number;
  baseUrl: string;
}
// configuration for extenal service call
export function getExternalCallConfigs(
  externalServiceName: string
): IExternalCallConfigurations {
  return configs.get(externalServiceName);
}

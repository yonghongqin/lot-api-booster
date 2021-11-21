import config from "config";
// const logger = require('../utils/logger')

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
  return config.get("database");
}

export function getServerConfigs(): IServerConfigurations {
  return config.get("server");
}

export function getRdsConfig(): IRdsDataConfiguration {
  return config.get("database-rds");
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
  return config.get(externalServiceName);
}

export function getValue(key: string): any {
  let value;
  try {
    value = config.get(key);
  } catch (error) {
    // configuration key does not exist
    if (["sequelize.useEnvVariable"].indexOf(key) < 0) {
      // logger.error(`configurationService failed to get key '${key}'`, error)
    }
  }
  return value;
}

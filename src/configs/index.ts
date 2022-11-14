import * as dotenv from 'dotenv';

// read .env
dotenv.config();
const conf = process.env;
//Read Configurations
const configs = new Map();

configs.set("dev", {
  "database": {
    "type": conf.database_type,
    "host": conf.database_host,
    "port": conf.database_port,
    "username": conf.database_username,
    "password": conf.database_password,
    "database": conf.database_database,
    "synchronize": conf.database_synchronize,
    "logging": conf.database_logging,
    "logger": conf.database_logger,
    "timezone": conf.database_timezone,
    "insecureAuth": conf.database_insecureAuth,
    "entities": [],
    "migrations": [],
    "subscribers": [],
  },
  "server": {
    "port": conf.server_port,
    "jwtSecret": conf.server_jwtSecret,
    "jwtExpiration": conf.server_jwtExpiration,
    "routePrefix": "",
    "plugins": ["swagger"] //"logger", "jwt-auth", 
  }
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

export function getDatabaseConfig(): IDataConfiguration {
  return configs.get("dev").database;
}

export function getServerConfigs(): IServerConfigurations {
  return configs.get("dev").server;
}
import { DataSource, DataSourceOptions } from "typeorm";
import { getDatabaseConfig } from "./configs";
import { Team, Event } from "./entity";
const defaults = getDatabaseConfig() as unknown as DataSourceOptions;

export const connectionSource = new DataSource({
    ...defaults,
    // tables
    entities: [Team, Event],
    migrations: []
  });
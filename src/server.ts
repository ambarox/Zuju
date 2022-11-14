"use strict";

import { Server } from "@hapi/hapi";
import { swaggerConfig } from "./plugins/swagger";
import { IServerConfigurations } from "./configs";
import { teamsRoutes } from "./modules/teams";
import { fixturesRoutes } from "./modules/fixtures";
import { paginationConfig } from "./plugins/pagination";
import pagination = require('hapi-pagination');

export let server: Server;

export const init = async function (
  configs: IServerConfigurations
): Promise<Server> {
  server = new Server({
    port: process.env.PORT || configs.port,
    host: "0.0.0.0",
  });

  // Prefix for routes
  if (configs.routePrefix) {
    server.realm.modifiers.route.prefix = configs.routePrefix;
  }

  // plugins
  await server.register(swaggerConfig);
  await server.register({plugin: pagination, options: paginationConfig});

  server.route(teamsRoutes);
  server.route(fixturesRoutes);

  return server;
};

export const start = async function (): Promise<void> {
  console.log(`Listening on ${server.settings.host}:${server.settings.port}`);
  return server.start();
};

process.on("unhandledRejection", (err) => {
  console.error("unhandledRejection");
  console.error(err);
  process.exit(1);
});

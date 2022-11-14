import "reflect-metadata";
import { init, start } from "./server";
import { getServerConfigs } from "./configs";
import { connectionSource } from "./data-source";

const configs = getServerConfigs();

init(configs).then(() => {
  // init database
  connectionSource.initialize()
    .then(async () => {
      // start server
      start();
    })
    .catch((error) => console.log(error));
});

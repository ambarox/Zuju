import * as HapiSwagger from "hapi-swagger";
import * as Inert from "@hapi/inert";
import * as Vision from "@hapi/vision";

const swaggerOptions: HapiSwagger.RegisterOptions = {
  info: {
    title: "Fixtures app",
  },
  host: "localhost:4000",
  swaggerUI: true,
  documentationPage: true,
};

export const swaggerConfig = [
  Inert,
  Vision,
  {
    plugin: HapiSwagger,
    options: swaggerOptions,
  },
];

import express, { Application } from "express";
import { port, connectionDB } from "./config";
import fileUpload from "express-fileupload";
import swaggerDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import log from "./logger";

// import schedule from "node-schedule";
// const schedule = require("node-schedule");

// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
class App {
  public app: Application;
  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(fileUpload());
    // scheduler

    //
    const option = {
      swaggerDefinition: {
        openapi: "3.0.0",
        info: {
          title: "API",
          version: "1.0.0",
        },
        servers: [
          {
            url: "http://localhost:4000",
          },
        ],
        components: {
          securitySchemes: {
            bearerAuth: {
              type: "http",
              scheme: "bearer",
              bearerFormat: "JWT",
            },
          },
        },
        security: [
          {
            bearerAuth: [],
          },
        ],
      },
      apis: ["./src/routes/*.routes.ts"],
    };
    const swaggerSpace = swaggerDoc(option);
    this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpace));
    //
  }
  public listen(appInt: {
    controllers: any[];
    topMiddleware: any[];
    bottomMiddleware: any[];
  }) {
    this.app.listen(port, () => {
      connectionDB();
      this.middleware(appInt.topMiddleware); //before routes middleware
      this.routes(appInt.controllers); //routes

      this.middleware(appInt.bottomMiddleware); //after middleware
      log.info(`App listening on port ${port}`);
    });
  }
  private routes(controllers: any[]) {
    controllers.forEach((controller) => {
      this.app.use(`/api/v1${controller.path}`, controller.router);
    });
  }
  private middleware(middleware: any[]) {
    middleware.forEach((middleware) => {
      this.app.use(middleware);
    });
  }
}
export default App;

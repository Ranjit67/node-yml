import App from "./app";
import {
  LanguageRoute,
  EventRoutes,
  UserRoutes,
  EmailTokenRoutes,
} from "./routes";
import { BottomMiddleware, TopMiddleware } from "./middleware";

const object = {
  controllers: [
    new LanguageRoute(),
    new EventRoutes(),
    new UserRoutes(),
    new EmailTokenRoutes(),
  ],
  topMiddleware: [new TopMiddleware().allowCrossDomain],
  bottomMiddleware: [
    new BottomMiddleware().routeNotFoundErrorHandler,
    new BottomMiddleware().fromRouteErrorHandler,
  ],
};

const app = new App();

app.listen(object);

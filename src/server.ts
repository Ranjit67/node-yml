import App from "./app";
import {
  LanguageRoute,
  EventRoutes,
  UserRoutes,
  EmailTokenRoutes,
  AuthRoutes,
  ServiceRoutes,
  AssignArtistRoutes,
  PromoCodeRoutes,
} from "./routes";
import { BottomMiddleware, TopMiddleware } from "./middleware";

const object = {
  controllers: [
    new LanguageRoute(),
    new EventRoutes(),
    new UserRoutes(),
    new EmailTokenRoutes(),
    new AuthRoutes(),
    new ServiceRoutes(),
    new AssignArtistRoutes(),
    new PromoCodeRoutes(),
  ],
  topMiddleware: [new TopMiddleware().allowCrossDomain],
  bottomMiddleware: [
    new BottomMiddleware().routeNotFoundErrorHandler,
    new BottomMiddleware().fromRouteErrorHandler,
  ],
};

const app = new App();

app.listen(object);

import App from "./app";
import { BottomMiddleware, TopMiddleware } from "./middleware";
import {
  LanguageRoute,
  EventRoutes,
  UserRoutes,
  EmailTokenRoutes,
  AuthRoutes,
  ServiceRoutes,
  AssignArtistRoutes,
  PromoCodeRoutes,
  FavoriteRoutes,
  VisitorRoutes,
  SupportRouter,
} from "./routes";

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
    new FavoriteRoutes(),
    new VisitorRoutes(),
    new SupportRouter(),
  ],
  topMiddleware: [new TopMiddleware().allowCrossDomain],
  bottomMiddleware: [
    new BottomMiddleware().routeNotFoundErrorHandler,
    new BottomMiddleware().fromRouteErrorHandler,
  ],
};

const app = new App();

app.listen(object);

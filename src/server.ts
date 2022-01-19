import App from "./app";
import { BottomMiddleware, TopMiddleware } from "./middleware";
import {
  LanguageRoute,
  EventRoutes,
  UserRoutes,
  EmailTokenRoutes,
  AuthRoutes,
  ServiceRoutes,
  WalletHistoryRoute,
  AssignArtistRoutes,
  PromoCodeRoutes,
  FavoriteRoutes,
  VisitorRoutes,
  SupportRouter,
  CategoryRoutes,
  SubCategoryRoutes,
  GenresRoutes,
  PricingRoutes,
  ReviewRoutes,
  WalletRoute,
  CrowdRoutes,
} from "./routes";

const object = {
  controllers: [
    new UserRoutes(),
    new AuthRoutes(),
    new EventRoutes(),
    new CrowdRoutes(),
    new WalletRoute(),
    new ReviewRoutes(),
    new GenresRoutes(),
    new ServiceRoutes(),
    new PricingRoutes(),
    new LanguageRoute(),
    new VisitorRoutes(),
    new SupportRouter(),
    new FavoriteRoutes(),
    new CategoryRoutes(),
    new PromoCodeRoutes(),
    new EmailTokenRoutes(),
    new SubCategoryRoutes(),
    new WalletHistoryRoute(),
    new AssignArtistRoutes(),
  ],
  topMiddleware: [new TopMiddleware().allowCrossDomain],
  bottomMiddleware: [
    new BottomMiddleware().routeNotFoundErrorHandler,
    new BottomMiddleware().fromRouteErrorHandler,
  ],
};

const app = new App();

app.listen(object);

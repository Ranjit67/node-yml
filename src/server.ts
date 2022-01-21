import App from "./app";
import schedule from "node-schedule";
import { BottomMiddleware, TopMiddleware } from "./middleware";
import {
  ArtistBlockDateRoutes,
  ArtistMediaRoute,
  LanguageRoute,
  RequestRouter,
  EventRoutes,
  DayRoutes,
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
  BookingRouter,
  SubCategoryRoutes,
  GenresRoutes,
  PricingRoutes,
  ReviewRoutes,
  WalletRoute,
  CrowdRoutes,
} from "./routes";

const object = {
  controllers: [
    new DayRoutes(),
    new UserRoutes(),
    new AuthRoutes(),
    new EventRoutes(),
    new CrowdRoutes(),
    new WalletRoute(),
    new ReviewRoutes(),
    new GenresRoutes(),
    new RequestRouter(),
    new ServiceRoutes(),
    new PricingRoutes(),
    new LanguageRoute(),
    new VisitorRoutes(),
    new BookingRouter(),
    new SupportRouter(),
    new FavoriteRoutes(),
    new CategoryRoutes(),
    new PromoCodeRoutes(),
    new EmailTokenRoutes(),
    new ArtistMediaRoute(),
    new SubCategoryRoutes(),
    new AssignArtistRoutes(),
    new WalletHistoryRoute(),
    new ArtistBlockDateRoutes(),
  ],
  topMiddleware: [new TopMiddleware().allowCrossDomain],
  bottomMiddleware: [
    new BottomMiddleware().routeNotFoundErrorHandler,
    new BottomMiddleware().fromRouteErrorHandler,
  ],
};

const app = new App();

app.listen(object);

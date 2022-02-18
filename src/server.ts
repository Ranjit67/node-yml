import App from "./app";
// import schedule from "node-schedule";
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
  PersonalizeVideoRoute,
  PromoCodeRoutes,
  FavoriteRoutes,
  VisitorRoutes,
  SupportRouter,
  CategoryRoutes,
  BookingRouter,
  SubCategoryRoutes,
  BookingRescheduleRoute,
  NotificationRoute,
  GenresRoutes,
  PricingRoutes,
  ReviewRoutes,
  WalletRoute,
  CrowdRoutes,
  VersionRouter,
  EmailTestRoute,
  OrderRoutes,
  FilterRoutes,
} from "./routes";
import { PaymentRoutes } from "./payment";
import { SchedulerService } from "./services";
import { BookingSchedule } from "./scheduleJob";

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
    new VersionRouter(),
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
    new NotificationRoute(),
    new SubCategoryRoutes(),
    new AssignArtistRoutes(),
    new WalletHistoryRoute(),
    new ArtistBlockDateRoutes(),
    new PersonalizeVideoRoute(),
    new BookingRescheduleRoute(),
    new OrderRoutes(),
    new EmailTestRoute(),
    new PaymentRoutes(),
    new FilterRoutes(),
  ],
  topMiddleware: [new TopMiddleware().allowCrossDomain],
  bottomMiddleware: [
    new BottomMiddleware().routeNotFoundErrorHandler,
    new BottomMiddleware().fromRouteErrorHandler,
  ],
};

const app = new App();
const job = async () => {
  await new BookingSchedule().checkEventExpire();
  await new BookingSchedule().afterEndEventLongDays();
};
new SchedulerService(job);

app.listen(object);

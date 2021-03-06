"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventDurationRoutes = exports.FilterRoutes = exports.OrderRoutes = exports.EmailTestRoute = exports.BookingRescheduleRoute = exports.PersonalizeVideoRoute = exports.ArtistBlockDateRoutes = exports.WalletHistoryRoute = exports.AssignArtistRoutes = exports.NotificationRoute = exports.SubCategoryRoutes = exports.ArtistMediaRoute = exports.EmailTokenRoutes = exports.PromoCodeRoutes = exports.FavoriteRoutes = exports.CategoryRoutes = exports.VersionRouter = exports.LanguageRoute = exports.VisitorRoutes = exports.ServiceRoutes = exports.PricingRoutes = exports.SupportRouter = exports.BookingRouter = exports.RequestRouter = exports.GenresRoutes = exports.ReviewRoutes = exports.WalletRoute = exports.CrowdRoutes = exports.EventRoutes = exports.AuthRoutes = exports.UserRoutes = exports.DayRoutes = void 0;
var day_routes_1 = require("./day.routes");
Object.defineProperty(exports, "DayRoutes", { enumerable: true, get: function () { return __importDefault(day_routes_1).default; } });
var user_routes_1 = require("./user.routes");
Object.defineProperty(exports, "UserRoutes", { enumerable: true, get: function () { return __importDefault(user_routes_1).default; } });
var auth_routes_1 = require("./auth.routes");
Object.defineProperty(exports, "AuthRoutes", { enumerable: true, get: function () { return __importDefault(auth_routes_1).default; } });
var event_routes_1 = require("./event.routes");
Object.defineProperty(exports, "EventRoutes", { enumerable: true, get: function () { return __importDefault(event_routes_1).default; } });
var crowd_routes_1 = require("./crowd.routes");
Object.defineProperty(exports, "CrowdRoutes", { enumerable: true, get: function () { return __importDefault(crowd_routes_1).default; } });
var wallet_routes_1 = require("./wallet.routes");
Object.defineProperty(exports, "WalletRoute", { enumerable: true, get: function () { return __importDefault(wallet_routes_1).default; } });
var review_routes_1 = require("./review.routes");
Object.defineProperty(exports, "ReviewRoutes", { enumerable: true, get: function () { return __importDefault(review_routes_1).default; } });
var genres_routes_1 = require("./genres.routes");
Object.defineProperty(exports, "GenresRoutes", { enumerable: true, get: function () { return __importDefault(genres_routes_1).default; } });
var request_routes_1 = require("./request.routes");
Object.defineProperty(exports, "RequestRouter", { enumerable: true, get: function () { return __importDefault(request_routes_1).default; } });
var booking_routes_1 = require("./booking.routes");
Object.defineProperty(exports, "BookingRouter", { enumerable: true, get: function () { return __importDefault(booking_routes_1).default; } });
var support_routes_1 = require("./support.routes");
Object.defineProperty(exports, "SupportRouter", { enumerable: true, get: function () { return __importDefault(support_routes_1).default; } });
var pricing_routes_1 = require("./pricing.routes");
Object.defineProperty(exports, "PricingRoutes", { enumerable: true, get: function () { return __importDefault(pricing_routes_1).default; } });
var service_routes_1 = require("./service.routes");
Object.defineProperty(exports, "ServiceRoutes", { enumerable: true, get: function () { return __importDefault(service_routes_1).default; } });
var visitor_routes_1 = require("./visitor.routes");
Object.defineProperty(exports, "VisitorRoutes", { enumerable: true, get: function () { return __importDefault(visitor_routes_1).default; } });
var language_routes_1 = require("./language.routes");
Object.defineProperty(exports, "LanguageRoute", { enumerable: true, get: function () { return __importDefault(language_routes_1).default; } });
var version_routes_1 = require("./version.routes");
Object.defineProperty(exports, "VersionRouter", { enumerable: true, get: function () { return __importDefault(version_routes_1).default; } });
var category_routes_1 = require("./category.routes");
Object.defineProperty(exports, "CategoryRoutes", { enumerable: true, get: function () { return __importDefault(category_routes_1).default; } });
var favorite_routes_1 = require("./favorite.routes");
Object.defineProperty(exports, "FavoriteRoutes", { enumerable: true, get: function () { return __importDefault(favorite_routes_1).default; } });
var promoCode_routes_1 = require("./promoCode.routes");
Object.defineProperty(exports, "PromoCodeRoutes", { enumerable: true, get: function () { return __importDefault(promoCode_routes_1).default; } });
var emailToken_routes_1 = require("./emailToken.routes");
Object.defineProperty(exports, "EmailTokenRoutes", { enumerable: true, get: function () { return __importDefault(emailToken_routes_1).default; } });
var artistMedia_routes_1 = require("./artistMedia.routes");
Object.defineProperty(exports, "ArtistMediaRoute", { enumerable: true, get: function () { return __importDefault(artistMedia_routes_1).default; } });
var subCategory_routes_1 = require("./subCategory.routes");
Object.defineProperty(exports, "SubCategoryRoutes", { enumerable: true, get: function () { return __importDefault(subCategory_routes_1).default; } });
var notification_routes_1 = require("./notification.routes");
Object.defineProperty(exports, "NotificationRoute", { enumerable: true, get: function () { return __importDefault(notification_routes_1).default; } });
var assignArtist_routes_1 = require("./assignArtist.routes");
Object.defineProperty(exports, "AssignArtistRoutes", { enumerable: true, get: function () { return __importDefault(assignArtist_routes_1).default; } });
var walletHistory_routes_1 = require("./walletHistory.routes");
Object.defineProperty(exports, "WalletHistoryRoute", { enumerable: true, get: function () { return __importDefault(walletHistory_routes_1).default; } });
var artistBlockDate_routes_1 = require("./artistBlockDate.routes");
Object.defineProperty(exports, "ArtistBlockDateRoutes", { enumerable: true, get: function () { return __importDefault(artistBlockDate_routes_1).default; } });
var personalizeVideo_routes_1 = require("./personalizeVideo.routes");
Object.defineProperty(exports, "PersonalizeVideoRoute", { enumerable: true, get: function () { return __importDefault(personalizeVideo_routes_1).default; } });
var bookingReschedule_routes_1 = require("./bookingReschedule.routes");
Object.defineProperty(exports, "BookingRescheduleRoute", { enumerable: true, get: function () { return __importDefault(bookingReschedule_routes_1).default; } });
var emailTest_routes_1 = require("./emailTest.routes");
Object.defineProperty(exports, "EmailTestRoute", { enumerable: true, get: function () { return __importDefault(emailTest_routes_1).default; } });
var order_routes_1 = require("./order.routes");
Object.defineProperty(exports, "OrderRoutes", { enumerable: true, get: function () { return __importDefault(order_routes_1).default; } });
var filter_routes_1 = require("./filter.routes");
Object.defineProperty(exports, "FilterRoutes", { enumerable: true, get: function () { return __importDefault(filter_routes_1).default; } });
var eventDuration_routes_1 = require("./eventDuration.routes");
Object.defineProperty(exports, "EventDurationRoutes", { enumerable: true, get: function () { return __importDefault(eventDuration_routes_1).default; } });
//# sourceMappingURL=index.js.map
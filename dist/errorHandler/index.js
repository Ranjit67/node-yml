"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserErrorHandler = exports.EventErrorHandler = exports.FavoriteErrorHandler = exports.ServiceErrorHandler = exports.AssignArtistErrorHandler = void 0;
var assignArtist_errorHandler_1 = require("./assignArtist.errorHandler");
Object.defineProperty(exports, "AssignArtistErrorHandler", { enumerable: true, get: function () { return __importDefault(assignArtist_errorHandler_1).default; } });
var service_errorHandler_1 = require("./service.errorHandler");
Object.defineProperty(exports, "ServiceErrorHandler", { enumerable: true, get: function () { return __importDefault(service_errorHandler_1).default; } });
var favorite_errorHandler_1 = require("./favorite.errorHandler");
Object.defineProperty(exports, "FavoriteErrorHandler", { enumerable: true, get: function () { return __importDefault(favorite_errorHandler_1).default; } });
var event_errorHandler_1 = require("./event.errorHandler");
Object.defineProperty(exports, "EventErrorHandler", { enumerable: true, get: function () { return __importDefault(event_errorHandler_1).default; } });
var user_errorHandler_1 = require("./user.errorHandler");
Object.defineProperty(exports, "UserErrorHandler", { enumerable: true, get: function () { return __importDefault(user_errorHandler_1).default; } });
//# sourceMappingURL=index.js.map
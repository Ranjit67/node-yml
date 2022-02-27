"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var config_1 = require("./config");
var express_fileupload_1 = __importDefault(require("express-fileupload"));
var logger_1 = __importDefault(require("./logger"));
var App = (function () {
    function App() {
        this.app = (0, express_1.default)();
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use((0, express_fileupload_1.default)());
    }
    App.prototype.listen = function (appInt) {
        var _this = this;
        this.app.listen(config_1.port, function () {
            (0, config_1.connectionDB)();
            _this.middleware(appInt.topMiddleware);
            _this.routes(appInt.controllers);
            _this.middleware(appInt.bottomMiddleware);
            logger_1.default.info("App listening on port " + config_1.port);
        });
    };
    App.prototype.routes = function (controllers) {
        var _this = this;
        controllers.forEach(function (controller) {
            _this.app.use("/api/v1" + controller.path, controller.router);
        });
    };
    App.prototype.middleware = function (middleware) {
        var _this = this;
        middleware.forEach(function (middleware) {
            _this.app.use(middleware);
        });
    };
    return App;
}());
exports.default = App;
//# sourceMappingURL=app.js.map
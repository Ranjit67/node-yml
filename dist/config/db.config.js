"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var config_1 = require("../config");
var logger_1 = __importDefault(require("../logger"));
function connectionDB() {
    return mongoose_1.default.connect(config_1.database).then(function () {
        logger_1.default.info("Database connected");
    }).catch(function (err) {
        logger_1.default.info(err);
        process.exit(1);
    });
}
exports.default = connectionDB;
//# sourceMappingURL=db.config.js.map
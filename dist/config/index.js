"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FCM_PUSH_URL = exports.SERVER_KEY = exports.host = exports.password = exports.email = exports.secretAccessKey = exports.accessKeyId = exports.region = exports.BucketName = exports.accessTokenString = exports.emailTokenString = exports.connectionDB = exports.database = exports.port = void 0;
var app_config_1 = require("./app.config");
Object.defineProperty(exports, "port", { enumerable: true, get: function () { return app_config_1.port; } });
Object.defineProperty(exports, "database", { enumerable: true, get: function () { return app_config_1.database; } });
var db_config_1 = require("./db.config");
Object.defineProperty(exports, "connectionDB", { enumerable: true, get: function () { return __importDefault(db_config_1).default; } });
var jwt_config_1 = require("./jwt.config");
Object.defineProperty(exports, "emailTokenString", { enumerable: true, get: function () { return jwt_config_1.emailTokenString; } });
Object.defineProperty(exports, "accessTokenString", { enumerable: true, get: function () { return jwt_config_1.accessTokenString; } });
var aws_config_1 = require("./aws.config");
Object.defineProperty(exports, "BucketName", { enumerable: true, get: function () { return aws_config_1.BucketName; } });
Object.defineProperty(exports, "region", { enumerable: true, get: function () { return aws_config_1.region; } });
Object.defineProperty(exports, "accessKeyId", { enumerable: true, get: function () { return aws_config_1.accessKeyId; } });
Object.defineProperty(exports, "secretAccessKey", { enumerable: true, get: function () { return aws_config_1.secretAccessKey; } });
var email_config_1 = require("./email.config");
Object.defineProperty(exports, "email", { enumerable: true, get: function () { return email_config_1.email; } });
Object.defineProperty(exports, "password", { enumerable: true, get: function () { return email_config_1.password; } });
Object.defineProperty(exports, "host", { enumerable: true, get: function () { return email_config_1.host; } });
var pushNotification_config_1 = require("./pushNotification.config");
Object.defineProperty(exports, "SERVER_KEY", { enumerable: true, get: function () { return pushNotification_config_1.SERVER_KEY; } });
Object.defineProperty(exports, "FCM_PUSH_URL", { enumerable: true, get: function () { return pushNotification_config_1.FCM_PUSH_URL; } });
//# sourceMappingURL=index.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = exports.port = void 0;
var port = Number(process.env.PORT) || 5000;
exports.port = port;
var database = "mongodb+srv://skyrisecelebrity:" + "siPhzzqgvnCAbuUm" + "@cluster0.gqqoe.mongodb.net/SkyRiseDB?retryWrites=true&w=majority";
exports.database = database;
//# sourceMappingURL=app.config.js.map
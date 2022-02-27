"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var languageSchema = new mongoose_1.Schema({
    languageName: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: new Date(),
    },
});
var LanguageSchema = (0, mongoose_1.model)("Language", languageSchema);
exports.default = LanguageSchema;
//# sourceMappingURL=language.models.js.map
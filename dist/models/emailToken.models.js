"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var emailTokenSchema = new mongoose_1.Schema({
    userRef: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    emailTokenString: {
        type: String,
    },
    timestamp: {
        type: Date,
    },
});
var EmailToken = (0, mongoose_1.model)("EmailToken", emailTokenSchema);
exports.default = EmailToken;
//# sourceMappingURL=emailToken.models.js.map
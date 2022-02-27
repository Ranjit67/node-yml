"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FavoriteErrorHandler = (function () {
    function FavoriteErrorHandler() {
    }
    FavoriteErrorHandler.prototype.objectId = function (res) {
        return res.status(200).json({
            success: {
                data: [],
            },
        });
    };
    return FavoriteErrorHandler;
}());
exports.default = FavoriteErrorHandler;
//# sourceMappingURL=favorite.errorHandler.js.map
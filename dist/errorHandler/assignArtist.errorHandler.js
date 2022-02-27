"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AssignArtistErrorHandler = (function () {
    function AssignArtistErrorHandler() {
    }
    AssignArtistErrorHandler.prototype.allAlreadyAssign = function (res) {
        return res.status(409).json({
            error: { message: "Artist is already assigned to this Manager." },
        });
    };
    return AssignArtistErrorHandler;
}());
exports.default = AssignArtistErrorHandler;
//# sourceMappingURL=assignArtist.errorHandler.js.map
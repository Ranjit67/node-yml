"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_errors_1 = require("http-errors");
var resultMessage_1 = require("../resultMessage");
var models_1 = require("../models");
var services_1 = require("../services");
var GenresController = (function () {
    function GenresController() {
        this.dir = "genres";
    }
    GenresController.prototype.create = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, genresName, subCategoryId, iconPicture, awsS3, iconImage, saveGenres, updateInSubCategory, error_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 4, , 5]);
                        _b = req.body, genresName = _b.genresName, subCategoryId = _b.subCategoryId;
                        iconPicture = (_a = req === null || req === void 0 ? void 0 : req.files) === null || _a === void 0 ? void 0 : _a.icon;
                        if (!genresName || !subCategoryId || !iconPicture)
                            throw new http_errors_1.BadRequest(resultMessage_1.genresMessage.error.allField);
                        awsS3 = new services_1.AwsS3Services();
                        return [4, awsS3.upload(iconPicture, "genres")];
                    case 1:
                        iconImage = _c.sent();
                        if (!iconImage)
                            throw new http_errors_1.InternalServerError(resultMessage_1.genresMessage.error.iconImageUploadFail);
                        return [4, models_1.GenresSchema.create({
                                title: genresName,
                                iconUrl: iconImage === null || iconImage === void 0 ? void 0 : iconImage.Location,
                                iconFile: iconImage === null || iconImage === void 0 ? void 0 : iconImage.key,
                                parentId: subCategoryId,
                            })];
                    case 2:
                        saveGenres = _c.sent();
                        if (!saveGenres)
                            throw new http_errors_1.NotAcceptable(resultMessage_1.genresMessage.error.notCreated);
                        return [4, models_1.SubCategorySchema.findByIdAndUpdate(subCategoryId, {
                                $push: {
                                    genres: saveGenres === null || saveGenres === void 0 ? void 0 : saveGenres._id,
                                },
                            })];
                    case 3:
                        updateInSubCategory = _c.sent();
                        if (!updateInSubCategory)
                            throw new http_errors_1.NotAcceptable(resultMessage_1.genresMessage.error.genresNotLinked);
                        res.json({
                            success: {
                                message: resultMessage_1.genresMessage.success.created,
                            },
                        });
                        return [3, 5];
                    case 4:
                        error_1 = _c.sent();
                        next(error_1);
                        return [3, 5];
                    case 5: return [2];
                }
            });
        });
    };
    GenresController.prototype.genresUnderSubCategory = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var subCategoryIds, findGenresUnder, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        subCategoryIds = req.body.subCategoryIds;
                        if (!subCategoryIds.length)
                            throw new http_errors_1.BadRequest(resultMessage_1.genresMessage.error.allField);
                        return [4, models_1.GenresSchema.find({
                                parentId: { $in: subCategoryIds },
                            })];
                    case 1:
                        findGenresUnder = _a.sent();
                        res.json({
                            success: {
                                data: findGenresUnder,
                            },
                        });
                        return [3, 3];
                    case 2:
                        error_2 = _a.sent();
                        next(error_2);
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    GenresController.prototype.update = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, genresId, genresNewName, iconPicture, findGenres, awsS3, deletePreviousIcon, iconImage, updateGenres, updateGenres, error_3;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 8, , 9]);
                        _b = req.body, genresId = _b.genresId, genresNewName = _b.genresNewName;
                        if (!genresId)
                            throw new http_errors_1.BadRequest(resultMessage_1.genresMessage.error.allField);
                        iconPicture = (_a = req === null || req === void 0 ? void 0 : req.files) === null || _a === void 0 ? void 0 : _a.icon;
                        return [4, models_1.GenresSchema.findById(genresId)];
                    case 1:
                        findGenres = _c.sent();
                        if (!findGenres)
                            throw new http_errors_1.NotAcceptable(resultMessage_1.genresMessage.error.genresError);
                        if (!iconPicture) return [3, 5];
                        awsS3 = new services_1.AwsS3Services();
                        return [4, awsS3.delete(findGenres === null || findGenres === void 0 ? void 0 : findGenres.iconFile, "genres")];
                    case 2:
                        deletePreviousIcon = _c.sent();
                        if (!deletePreviousIcon)
                            throw new http_errors_1.InternalServerError(resultMessage_1.genresMessage.error.iconImageDeleteFail);
                        return [4, awsS3.upload(iconPicture, "genres")];
                    case 3:
                        iconImage = _c.sent();
                        return [4, models_1.GenresSchema.findByIdAndUpdate(genresId, {
                                title: genresNewName !== null && genresNewName !== void 0 ? genresNewName : findGenres === null || findGenres === void 0 ? void 0 : findGenres.title,
                                iconUrl: iconImage === null || iconImage === void 0 ? void 0 : iconImage.Location,
                                iconFile: iconImage === null || iconImage === void 0 ? void 0 : iconImage.key,
                            }, { new: true })];
                    case 4:
                        updateGenres = _c.sent();
                        if (!updateGenres)
                            throw new http_errors_1.NotAcceptable(resultMessage_1.genresMessage.error.notUpdated);
                        return [2, res.json({
                                success: {
                                    message: resultMessage_1.genresMessage.success.updated,
                                },
                            })];
                    case 5: return [4, models_1.GenresSchema.findByIdAndUpdate(genresId, {
                            title: genresNewName !== null && genresNewName !== void 0 ? genresNewName : findGenres === null || findGenres === void 0 ? void 0 : findGenres.title,
                        })];
                    case 6:
                        updateGenres = _c.sent();
                        if (!updateGenres)
                            throw new http_errors_1.NotAcceptable(resultMessage_1.genresMessage.error.notUpdated);
                        return [2, res.json({
                                success: {
                                    message: resultMessage_1.genresMessage.success.updated,
                                },
                            })];
                    case 7: return [3, 9];
                    case 8:
                        error_3 = _c.sent();
                        next(error_3);
                        return [3, 9];
                    case 9: return [2];
                }
            });
        });
    };
    GenresController.prototype.getAllGenresUnderSubCategories = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var subcategoriesIDs, findGenres, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        subcategoriesIDs = req.body.subcategoriesIDs;
                        if (!Array.isArray(subcategoriesIDs))
                            throw new http_errors_1.BadRequest(resultMessage_1.genresMessage.error.allField);
                        return [4, models_1.GenresSchema.find({
                                parentId: { $in: subcategoriesIDs },
                            })];
                    case 1:
                        findGenres = _a.sent();
                        if (!findGenres.length)
                            return [2, res.json({
                                    success: {
                                        data: [],
                                    },
                                })];
                        return [2, res.json({
                                success: {
                                    data: findGenres,
                                },
                            })];
                    case 2:
                        error_4 = _a.sent();
                        next(error_4);
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    GenresController.prototype.delete = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var ids, findGenres, aws3, _i, findGenres_1, item, deletePreviousIcon, _a, removeSubcategory, removeFromUser, deleteGenres, error_5;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 11, , 12]);
                        ids = req.body.ids;
                        if (!(ids === null || ids === void 0 ? void 0 : ids.length))
                            throw new http_errors_1.BadRequest(resultMessage_1.genresMessage.error.allField);
                        return [4, models_1.GenresSchema.find({ _id: { $in: ids } })];
                    case 1:
                        findGenres = _b.sent();
                        if (!(findGenres === null || findGenres === void 0 ? void 0 : findGenres.length))
                            throw new http_errors_1.NotAcceptable(resultMessage_1.genresMessage.error.noGenresFound);
                        aws3 = new services_1.AwsS3Services();
                        _i = 0, findGenres_1 = findGenres;
                        _b.label = 2;
                    case 2:
                        if (!(_i < findGenres_1.length)) return [3, 7];
                        item = findGenres_1[_i];
                        if (!(item === null || item === void 0 ? void 0 : item.iconFile)) return [3, 4];
                        return [4, aws3.delete(item === null || item === void 0 ? void 0 : item.iconFile, "genres")];
                    case 3:
                        _a = _b.sent();
                        return [3, 5];
                    case 4:
                        _a = "";
                        _b.label = 5;
                    case 5:
                        deletePreviousIcon = _a;
                        _b.label = 6;
                    case 6:
                        _i++;
                        return [3, 2];
                    case 7: return [4, models_1.SubCategorySchema.updateMany({ genres: { $in: ids } }, { $pull: { genres: { $in: ids } } })];
                    case 8:
                        removeSubcategory = _b.sent();
                        return [4, models_1.UserSchema.updateMany({ genres: { $in: ids } }, { $pull: { genres: { $in: ids } } })];
                    case 9:
                        removeFromUser = _b.sent();
                        return [4, models_1.GenresSchema.deleteMany({ _id: { $in: ids } })];
                    case 10:
                        deleteGenres = _b.sent();
                        if (!deleteGenres)
                            throw new http_errors_1.NotAcceptable(resultMessage_1.genresMessage.error.notDeleted);
                        res.json({
                            success: {
                                message: resultMessage_1.genresMessage.success.deleted,
                            },
                        });
                        return [3, 12];
                    case 11:
                        error_5 = _b.sent();
                        next(error_5);
                        return [3, 12];
                    case 12: return [2];
                }
            });
        });
    };
    return GenresController;
}());
exports.default = GenresController;
//# sourceMappingURL=genres.controller.js.map
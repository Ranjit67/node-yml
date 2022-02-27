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
var subCategoryController = (function () {
    function subCategoryController() {
        this.dir = "subCategory";
    }
    subCategoryController.prototype.create = function (req, res, next) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var _c, subCategory, categoryId, iconPicture, findCategory, awsS3, iconImage, subCategorySave, updateInCategory, error_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 5, , 6]);
                        _c = req.body, subCategory = _c.subCategory, categoryId = _c.categoryId;
                        iconPicture = (_a = req === null || req === void 0 ? void 0 : req.files) === null || _a === void 0 ? void 0 : _a.icon;
                        if (!subCategory || !categoryId || !iconPicture)
                            throw new http_errors_1.BadRequest(resultMessage_1.subCategoryMessage.error.allField);
                        return [4, models_1.CategorySchema.findById(categoryId)];
                    case 1:
                        findCategory = _d.sent();
                        if ((_b = findCategory === null || findCategory === void 0 ? void 0 : findCategory.genres) === null || _b === void 0 ? void 0 : _b.length)
                            throw new http_errors_1.NotAcceptable(resultMessage_1.subCategoryMessage.error.haveGenresInCategory);
                        awsS3 = new services_1.AwsS3Services();
                        return [4, awsS3.upload(iconPicture, "subCategory")];
                    case 2:
                        iconImage = _d.sent();
                        if (!iconImage)
                            throw new http_errors_1.InternalServerError(resultMessage_1.subCategoryMessage.error.iconImageUploadFail);
                        return [4, models_1.SubCategorySchema.create({
                                title: subCategory,
                                parentId: categoryId,
                                iconUrl: iconImage === null || iconImage === void 0 ? void 0 : iconImage.Location,
                                iconFile: iconImage === null || iconImage === void 0 ? void 0 : iconImage.key,
                            })];
                    case 3:
                        subCategorySave = _d.sent();
                        if (!subCategorySave)
                            throw new http_errors_1.InternalServerError(resultMessage_1.subCategoryMessage.error.notCreated);
                        return [4, models_1.CategorySchema.findOneAndUpdate({ _id: categoryId }, {
                                $push: {
                                    subcategories: subCategorySave === null || subCategorySave === void 0 ? void 0 : subCategorySave._id,
                                },
                            })];
                    case 4:
                        updateInCategory = _d.sent();
                        if (!updateInCategory)
                            throw new http_errors_1.InternalServerError(resultMessage_1.subCategoryMessage.error.subCategoryNotLinked);
                        res.json({
                            success: {
                                message: resultMessage_1.subCategoryMessage.success.created,
                            },
                        });
                        return [3, 6];
                    case 5:
                        error_1 = _d.sent();
                        next(error_1);
                        return [3, 6];
                    case 6: return [2];
                }
            });
        });
    };
    subCategoryController.prototype.categoryUnderSubCategory = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var categoryId, findSubCategories, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        categoryId = req.params.categoryId;
                        if (!categoryId)
                            throw new http_errors_1.BadRequest(resultMessage_1.subCategoryMessage.error.allField);
                        return [4, models_1.SubCategorySchema.find({
                                parentId: categoryId,
                            })];
                    case 1:
                        findSubCategories = _a.sent();
                        res.json({
                            success: {
                                data: findSubCategories,
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
    subCategoryController.prototype.update = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, subcategoryId, newSubCategoryName, iconPicture, findSubCategory, awsS3, deletePreviousIcon, iconImage, updateSubCategory, updateSubCategory, error_3;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 8, , 9]);
                        _b = req.body, subcategoryId = _b.subcategoryId, newSubCategoryName = _b.newSubCategoryName;
                        if (!subcategoryId)
                            throw new http_errors_1.BadRequest(resultMessage_1.subCategoryMessage.error.allField);
                        iconPicture = (_a = req === null || req === void 0 ? void 0 : req.files) === null || _a === void 0 ? void 0 : _a.icon;
                        return [4, models_1.SubCategorySchema.findById(subcategoryId)];
                    case 1:
                        findSubCategory = _c.sent();
                        if (!iconPicture) return [3, 5];
                        awsS3 = new services_1.AwsS3Services();
                        return [4, awsS3.delete(findSubCategory === null || findSubCategory === void 0 ? void 0 : findSubCategory.iconFile, "subCategory")];
                    case 2:
                        deletePreviousIcon = _c.sent();
                        if (!deletePreviousIcon)
                            throw new http_errors_1.InternalServerError(resultMessage_1.subCategoryMessage.error.iconImageDeleteFail);
                        return [4, awsS3.upload(iconPicture, "subCategory")];
                    case 3:
                        iconImage = _c.sent();
                        return [4, models_1.SubCategorySchema.findByIdAndUpdate(subcategoryId, {
                                title: newSubCategoryName !== null && newSubCategoryName !== void 0 ? newSubCategoryName : findSubCategory === null || findSubCategory === void 0 ? void 0 : findSubCategory.title,
                                iconUrl: iconImage === null || iconImage === void 0 ? void 0 : iconImage.Location,
                                iconFile: iconImage === null || iconImage === void 0 ? void 0 : iconImage.key,
                            }, { new: true })];
                    case 4:
                        updateSubCategory = _c.sent();
                        if (!updateSubCategory)
                            throw new http_errors_1.NotAcceptable(resultMessage_1.subCategoryMessage.error.notUpdated);
                        return [2, res.json({
                                success: {
                                    message: resultMessage_1.subCategoryMessage.success.updated,
                                },
                            })];
                    case 5: return [4, models_1.SubCategorySchema.findByIdAndUpdate(subcategoryId, { title: newSubCategoryName !== null && newSubCategoryName !== void 0 ? newSubCategoryName : findSubCategory === null || findSubCategory === void 0 ? void 0 : findSubCategory.title }, { new: true })];
                    case 6:
                        updateSubCategory = _c.sent();
                        if (!updateSubCategory)
                            throw new http_errors_1.NotAcceptable(resultMessage_1.subCategoryMessage.error.notUpdated);
                        res.json({
                            success: {
                                message: resultMessage_1.subCategoryMessage.success.updated,
                            },
                        });
                        _c.label = 7;
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
    subCategoryController.prototype.delete = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var ids, awsS3, findSubCategories, genresArray, findGenres, _i, findGenres_1, item, deleteGenre, _b, removeSubCategoryFromCategory, deleteGenres, deleteFromUser, deleteIcon, deleteSubCategory, removeSubCategoryFromUser, removeSubCategoryFromCategory, deleteSubCategory, deleteIcon, error_4;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 22, , 23]);
                        ids = req.body.id;
                        if (!ids)
                            throw new http_errors_1.BadRequest(resultMessage_1.subCategoryMessage.error.allField);
                        awsS3 = new services_1.AwsS3Services();
                        return [4, models_1.SubCategorySchema.findOne({ _id: ids })];
                    case 1:
                        findSubCategories = _c.sent();
                        if (!findSubCategories)
                            throw new http_errors_1.NotAcceptable(resultMessage_1.subCategoryMessage.error.noSubCategory);
                        genresArray = (_a = findSubCategories === null || findSubCategories === void 0 ? void 0 : findSubCategories.genres) !== null && _a !== void 0 ? _a : [];
                        if (!genresArray.length) return [3, 15];
                        return [4, models_1.GenresSchema.find({
                                _id: { $in: genresArray },
                            })];
                    case 2:
                        findGenres = _c.sent();
                        _i = 0, findGenres_1 = findGenres;
                        _c.label = 3;
                    case 3:
                        if (!(_i < findGenres_1.length)) return [3, 8];
                        item = findGenres_1[_i];
                        if (!item.iconFile) return [3, 5];
                        return [4, awsS3.delete(item.iconFile, "subCategory")];
                    case 4:
                        _b = _c.sent();
                        return [3, 6];
                    case 5:
                        _b = "";
                        _c.label = 6;
                    case 6:
                        deleteGenre = _b;
                        _c.label = 7;
                    case 7:
                        _i++;
                        return [3, 3];
                    case 8: return [4, models_1.CategorySchema.updateOne({ subcategories: findSubCategories === null || findSubCategories === void 0 ? void 0 : findSubCategories._id }, { $pull: { subcategories: findSubCategories === null || findSubCategories === void 0 ? void 0 : findSubCategories._id } })];
                    case 9:
                        removeSubCategoryFromCategory = _c.sent();
                        return [4, models_1.GenresSchema.deleteMany({
                                _id: { $in: genresArray },
                            })];
                    case 10:
                        deleteGenres = _c.sent();
                        return [4, models_1.UserSchema.updateMany({
                                genres: { $in: genresArray },
                                subcategories: findSubCategories === null || findSubCategories === void 0 ? void 0 : findSubCategories._id,
                            }, {
                                $pull: {
                                    genres: { $in: genresArray },
                                    subcategories: findSubCategories === null || findSubCategories === void 0 ? void 0 : findSubCategories._id,
                                },
                            })];
                    case 11:
                        deleteFromUser = _c.sent();
                        if (!(findSubCategories === null || findSubCategories === void 0 ? void 0 : findSubCategories.iconFile)) return [3, 13];
                        return [4, awsS3.delete(findSubCategories.iconFile, "subCategory")];
                    case 12:
                        deleteIcon = _c.sent();
                        _c.label = 13;
                    case 13: return [4, models_1.SubCategorySchema.findByIdAndDelete(ids)];
                    case 14:
                        deleteSubCategory = _c.sent();
                        if (!deleteSubCategory)
                            throw new http_errors_1.NotAcceptable(resultMessage_1.subCategoryMessage.error.notDeleted);
                        res.json({
                            success: {
                                message: resultMessage_1.subCategoryMessage.success.deleted,
                            },
                        });
                        return [3, 21];
                    case 15: return [4, models_1.UserSchema.updateMany({ subcategories: ids }, { $pull: { subcategories: ids } })];
                    case 16:
                        removeSubCategoryFromUser = _c.sent();
                        return [4, models_1.CategorySchema.updateMany({ subcategories: ids }, { $pull: { subcategories: ids } })];
                    case 17:
                        removeSubCategoryFromCategory = _c.sent();
                        return [4, models_1.SubCategorySchema.findByIdAndDelete(ids)];
                    case 18:
                        deleteSubCategory = _c.sent();
                        if (!(findSubCategories === null || findSubCategories === void 0 ? void 0 : findSubCategories.iconFile)) return [3, 20];
                        return [4, awsS3.delete(findSubCategories.iconFile, "subCategory")];
                    case 19:
                        deleteIcon = _c.sent();
                        _c.label = 20;
                    case 20:
                        if (!deleteSubCategory)
                            throw new http_errors_1.NotAcceptable(resultMessage_1.subCategoryMessage.error.notDeleted);
                        res.json({
                            success: {
                                message: resultMessage_1.subCategoryMessage.success.deleted,
                            },
                        });
                        _c.label = 21;
                    case 21: return [3, 23];
                    case 22:
                        error_4 = _c.sent();
                        next(error_4);
                        return [3, 23];
                    case 23: return [2];
                }
            });
        });
    };
    return subCategoryController;
}());
exports.default = subCategoryController;
//# sourceMappingURL=subCategory.controller.js.map
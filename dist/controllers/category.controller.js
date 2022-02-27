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
var models_1 = require("../models");
var resultMessage_1 = require("../resultMessage");
var services_1 = require("../services");
var CategoryController = (function () {
    function CategoryController() {
        this.dir = "category";
    }
    CategoryController.prototype.create = function (req, res, next) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var categoryName, iconPicture, imagePicture, awsS3, iconImage, image, saveCategory, error_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 4, , 5]);
                        categoryName = req.body.categoryName;
                        iconPicture = (_a = req === null || req === void 0 ? void 0 : req.files) === null || _a === void 0 ? void 0 : _a.icon;
                        imagePicture = (_b = req === null || req === void 0 ? void 0 : req.files) === null || _b === void 0 ? void 0 : _b.image;
                        if (!categoryName || !iconPicture || !imagePicture)
                            throw new http_errors_1.BadRequest(resultMessage_1.categoryMessage.error.allField);
                        awsS3 = new services_1.AwsS3Services();
                        return [4, awsS3.upload(iconPicture, "category")];
                    case 1:
                        iconImage = _c.sent();
                        return [4, awsS3.upload(imagePicture, "category")];
                    case 2:
                        image = _c.sent();
                        if (!iconImage)
                            throw new http_errors_1.NotAcceptable(resultMessage_1.categoryMessage.error.iconImageUploadFail);
                        return [4, models_1.CategorySchema.create({
                                title: categoryName,
                                iconUrl: iconImage === null || iconImage === void 0 ? void 0 : iconImage.Location,
                                iconFile: iconImage === null || iconImage === void 0 ? void 0 : iconImage.key,
                                imageFile: image.key,
                                imageUrl: image.Location,
                            })];
                    case 3:
                        saveCategory = _c.sent();
                        if (!saveCategory)
                            throw new http_errors_1.NotAcceptable(resultMessage_1.categoryMessage.error.notCreated);
                        res.json({
                            success: {
                                message: resultMessage_1.categoryMessage.success.categoryCreates,
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
    CategoryController.prototype.getAllCategory = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var categoryList, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, models_1.CategorySchema.find().populate({
                                path: "subcategories",
                                populate: {
                                    path: "genres",
                                    model: "Genres",
                                },
                            })];
                    case 1:
                        categoryList = _a.sent();
                        res.json({
                            success: {
                                data: categoryList,
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
    CategoryController.prototype.getOne = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var categoryId, category, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        categoryId = req.params.categoryId;
                        if (!categoryId)
                            throw new http_errors_1.BadRequest(resultMessage_1.categoryMessage.error.allField);
                        return [4, models_1.CategorySchema.findById(categoryId).populate({
                                path: "subcategories",
                                populate: {
                                    path: "genres",
                                    model: "Genres",
                                },
                            })];
                    case 1:
                        category = _a.sent();
                        if (!category)
                            throw new http_errors_1.NotAcceptable(resultMessage_1.categoryMessage.error.dataNotFound);
                        res.json({
                            success: {
                                data: category,
                            },
                        });
                        return [3, 3];
                    case 2:
                        error_3 = _a.sent();
                        next(error_3);
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    CategoryController.prototype.update = function (req, res, next) {
        var _a, _b, _c, _d, _e, _f;
        return __awaiter(this, void 0, void 0, function () {
            var _g, categoryId, categoryName, iconPicture, imagePicture, imageData, iconData, findCategory, awsS3, deleteOlder, deleteOlder, updateCategory, error_4;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0:
                        _h.trys.push([0, 9, , 10]);
                        _g = req.body, categoryId = _g.categoryId, categoryName = _g.categoryName;
                        if (!categoryId)
                            throw new http_errors_1.BadRequest(resultMessage_1.categoryMessage.error.allField);
                        iconPicture = (_a = req === null || req === void 0 ? void 0 : req.files) === null || _a === void 0 ? void 0 : _a.icon;
                        imagePicture = (_b = req === null || req === void 0 ? void 0 : req.files) === null || _b === void 0 ? void 0 : _b.image;
                        imageData = void 0;
                        iconData = void 0;
                        return [4, models_1.CategorySchema.findById(categoryId)];
                    case 1:
                        findCategory = _h.sent();
                        if (!findCategory)
                            throw new http_errors_1.NotFound(resultMessage_1.categoryMessage.error.dataNotFound);
                        awsS3 = new services_1.AwsS3Services();
                        if (!imagePicture) return [3, 4];
                        return [4, awsS3.delete(findCategory === null || findCategory === void 0 ? void 0 : findCategory.imageFile, "category")];
                    case 2:
                        deleteOlder = _h.sent();
                        return [4, awsS3.upload(imagePicture, "category")];
                    case 3:
                        imageData = _h.sent();
                        if (!imageData)
                            throw new http_errors_1.NotAcceptable(resultMessage_1.categoryMessage.error.imageUploadFail);
                        _h.label = 4;
                    case 4:
                        if (!iconPicture) return [3, 7];
                        return [4, awsS3.delete(findCategory === null || findCategory === void 0 ? void 0 : findCategory.iconFile, "category")];
                    case 5:
                        deleteOlder = _h.sent();
                        return [4, awsS3.upload(iconPicture, "category")];
                    case 6:
                        iconData = _h.sent();
                        if (!iconData)
                            throw new http_errors_1.NotAcceptable(resultMessage_1.categoryMessage.error.iconImageUploadFail);
                        _h.label = 7;
                    case 7: return [4, models_1.CategorySchema.findByIdAndUpdate(categoryId, {
                            title: categoryName,
                            imageFile: (_c = imageData === null || imageData === void 0 ? void 0 : imageData.key) !== null && _c !== void 0 ? _c : findCategory === null || findCategory === void 0 ? void 0 : findCategory.imageFile,
                            imageUrl: (_d = imageData === null || imageData === void 0 ? void 0 : imageData.Location) !== null && _d !== void 0 ? _d : findCategory === null || findCategory === void 0 ? void 0 : findCategory.imageUrl,
                            iconFile: (_e = iconData === null || iconData === void 0 ? void 0 : iconData.key) !== null && _e !== void 0 ? _e : findCategory === null || findCategory === void 0 ? void 0 : findCategory.iconFile,
                            iconUrl: (_f = iconData === null || iconData === void 0 ? void 0 : iconData.Location) !== null && _f !== void 0 ? _f : findCategory === null || findCategory === void 0 ? void 0 : findCategory.iconUrl,
                        }, { new: true })];
                    case 8:
                        updateCategory = _h.sent();
                        if (!updateCategory)
                            throw new http_errors_1.NotAcceptable(resultMessage_1.categoryMessage.error.notUpdated);
                        res.json({
                            success: {
                                message: resultMessage_1.categoryMessage.success.categoryUpdated,
                            },
                        });
                        return [3, 10];
                    case 9:
                        error_4 = _h.sent();
                        next(error_4);
                        return [3, 10];
                    case 10: return [2];
                }
            });
        });
    };
    CategoryController.prototype.delete = function (req, res, next) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var id, findCategory, awsS3, findSubcategories, genresUnArrange, genresArray, genreData, _i, genreData_1, element, deleteGenreIcon, _c, deleteGenre, _d, findSubcategories_1, element, deleteGenreIcon, _e, deleteSubCategory, deleteIcon, _f, deleteImage, _g, cleanUser, deleteIcon, _h, deleteImage, _j, cleanUser, deleteCategory, error_5;
            return __generator(this, function (_k) {
                switch (_k.label) {
                    case 0:
                        _k.trys.push([0, 35, , 36]);
                        id = req.body.id;
                        if (!id)
                            throw new http_errors_1.BadRequest(resultMessage_1.categoryMessage.error.allField);
                        return [4, models_1.CategorySchema.findById(id)];
                    case 1:
                        findCategory = _k.sent();
                        if (!findCategory)
                            throw new http_errors_1.NotFound(resultMessage_1.categoryMessage.error.noDataFoundForDelete);
                        awsS3 = new services_1.AwsS3Services();
                        if (!(findCategory === null || findCategory === void 0 ? void 0 : findCategory.subcategories.length)) return [3, 25];
                        return [4, models_1.SubCategorySchema.find({ parentId: id })];
                    case 2:
                        findSubcategories = (_a = (_k.sent())) !== null && _a !== void 0 ? _a : [];
                        genresUnArrange = findSubcategories.map(function (subcategory) { var _a; return (_a = subcategory === null || subcategory === void 0 ? void 0 : subcategory.genres) !== null && _a !== void 0 ? _a : []; });
                        genresArray = genresUnArrange.flat();
                        return [4, models_1.GenresSchema.find({ _id: { $in: genresArray } })];
                    case 3:
                        genreData = (_b = (_k.sent())) !== null && _b !== void 0 ? _b : [];
                        _i = 0, genreData_1 = genreData;
                        _k.label = 4;
                    case 4:
                        if (!(_i < genreData_1.length)) return [3, 9];
                        element = genreData_1[_i];
                        if (!(element === null || element === void 0 ? void 0 : element.iconFile)) return [3, 6];
                        return [4, awsS3.delete(element === null || element === void 0 ? void 0 : element.iconFile, "category")];
                    case 5:
                        _c = _k.sent();
                        return [3, 7];
                    case 6:
                        _c = "";
                        _k.label = 7;
                    case 7:
                        deleteGenreIcon = _c;
                        _k.label = 8;
                    case 8:
                        _i++;
                        return [3, 4];
                    case 9: return [4, models_1.GenresSchema.deleteMany({
                            _id: { $in: genresArray },
                        })];
                    case 10:
                        deleteGenre = _k.sent();
                        _d = 0, findSubcategories_1 = findSubcategories;
                        _k.label = 11;
                    case 11:
                        if (!(_d < findSubcategories_1.length)) return [3, 16];
                        element = findSubcategories_1[_d];
                        if (!(element === null || element === void 0 ? void 0 : element.iconFile)) return [3, 13];
                        return [4, awsS3.delete(element === null || element === void 0 ? void 0 : element.iconFile, "category")];
                    case 12:
                        _e = _k.sent();
                        return [3, 14];
                    case 13:
                        _e = "";
                        _k.label = 14;
                    case 14:
                        deleteGenreIcon = _e;
                        _k.label = 15;
                    case 15:
                        _d++;
                        return [3, 11];
                    case 16: return [4, models_1.SubCategorySchema.deleteMany({
                            parentId: id,
                        })];
                    case 17:
                        deleteSubCategory = _k.sent();
                        if (!(findCategory === null || findCategory === void 0 ? void 0 : findCategory.iconFile)) return [3, 19];
                        return [4, awsS3.delete(findCategory === null || findCategory === void 0 ? void 0 : findCategory.iconFile, "category")];
                    case 18:
                        _f = _k.sent();
                        return [3, 20];
                    case 19:
                        _f = "";
                        _k.label = 20;
                    case 20:
                        deleteIcon = _f;
                        if (!(findCategory === null || findCategory === void 0 ? void 0 : findCategory.imageFile)) return [3, 22];
                        return [4, awsS3.delete(findCategory === null || findCategory === void 0 ? void 0 : findCategory.imageFile, "category")];
                    case 21:
                        _g = _k.sent();
                        return [3, 23];
                    case 22:
                        _g = "";
                        _k.label = 23;
                    case 23:
                        deleteImage = _g;
                        return [4, models_1.UserSchema.updateMany({ category: findCategory._id }, {
                                category: null,
                                subcategories: [],
                                genres: [],
                            })];
                    case 24:
                        cleanUser = _k.sent();
                        return [3, 33];
                    case 25:
                        if (!(findCategory === null || findCategory === void 0 ? void 0 : findCategory.iconFile)) return [3, 27];
                        return [4, awsS3.delete(findCategory === null || findCategory === void 0 ? void 0 : findCategory.iconFile, "category")];
                    case 26:
                        _h = _k.sent();
                        return [3, 28];
                    case 27:
                        _h = "";
                        _k.label = 28;
                    case 28:
                        deleteIcon = _h;
                        if (!(findCategory === null || findCategory === void 0 ? void 0 : findCategory.imageFile)) return [3, 30];
                        return [4, awsS3.delete(findCategory === null || findCategory === void 0 ? void 0 : findCategory.imageFile, "category")];
                    case 29:
                        _j = _k.sent();
                        return [3, 31];
                    case 30:
                        _j = "";
                        _k.label = 31;
                    case 31:
                        deleteImage = _j;
                        return [4, models_1.UserSchema.updateMany({ category: findCategory._id }, {
                                category: null,
                                subcategories: [],
                                genres: [],
                            })];
                    case 32:
                        cleanUser = _k.sent();
                        _k.label = 33;
                    case 33: return [4, models_1.CategorySchema.findByIdAndDelete(id)];
                    case 34:
                        deleteCategory = _k.sent();
                        res.json({
                            success: {
                                message: resultMessage_1.categoryMessage.success.categoryDeleted,
                            },
                        });
                        return [3, 36];
                    case 35:
                        error_5 = _k.sent();
                        next(error_5);
                        return [3, 36];
                    case 36: return [2];
                }
            });
        });
    };
    return CategoryController;
}());
exports.default = CategoryController;
//# sourceMappingURL=category.controller.js.map
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManagementService = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const managementDepartment_model_1 = require("./managementDepartment.model");
const managementDepartment_constant_1 = require("./managementDepartment.constant");
const createManagement = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield managementDepartment_model_1.Management.create(payload);
    return result;
});
const getAllManagement = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: managementDepartment_constant_1.managementSearchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield managementDepartment_model_1.Management.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield managementDepartment_model_1.Management.countDocuments();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleManagement = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield managementDepartment_model_1.Management.findById(id);
    return result;
});
const updateManagement = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield managementDepartment_model_1.Management.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
const deleteManagement = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield managementDepartment_model_1.Management.findByIdAndDelete(id);
    return result;
});
exports.ManagementService = {
    createManagement,
    getAllManagement,
    getSingleManagement,
    updateManagement,
    deleteManagement,
};

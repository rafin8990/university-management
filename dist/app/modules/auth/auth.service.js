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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const user_model_1 = require("../user/user.model");
const jwtHelper_1 = require("../../../helpers/jwtHelper");
const config_1 = __importDefault(require("../../../config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, password } = payload;
    const user = new user_model_1.User();
    const isUserExist = yield user.isUserExist(id);
    user.isUserExist;
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    const passwordMatched = user.isPasswordMatched(password, isUserExist.password);
    if ((isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.password) && !passwordMatched) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Password did not matched');
    }
    // create a access and refresh token
    const accessToken = jwtHelper_1.jwtHelpers.createToken({ id: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.id, role: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.role }, config_1.default.jwt_secret, config_1.default.jwt_expires_in);
    const { needsPasswordChange } = isUserExist;
    const refreshToken = jwtHelper_1.jwtHelpers.createToken({ id: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.id, role: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.role }, config_1.default.jwt_refresh_secret, config_1.default.jwt_refresh_expires_in);
    return {
        accessToken,
        refreshToken,
        needsPasswordChange: needsPasswordChange,
    };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new user_model_1.User();
    let verifiedToken = null;
    try {
        verifiedToken = jwtHelper_1.jwtHelpers.verifyToken(token, config_1.default.jwt_refresh_secret);
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'invalid refresh token');
    }
    // checking deleted users refresh token
    const { id } = verifiedToken;
    const isUserExist = yield user.isUserExist(id);
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    // generate new token
    const newAccessToken = jwtHelper_1.jwtHelpers.createToken({ id: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.id, role: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.role }, config_1.default.jwt_secret, config_1.default.jwt_expires_in);
    return {
        accessToken: newAccessToken,
    };
});
const changePassword = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { oldPassword, newPassword } = payload;
    const users = new user_model_1.User();
    const isUserExist = yield users.isUserExist(user === null || user === void 0 ? void 0 : user.userId);
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    // checking old pass
    const passwordMatched = users.isPasswordMatched(oldPassword, isUserExist.password);
    if ((isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.password) && !passwordMatched) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Old Password did not matched');
    }
    // hash pass
    const newHashPassword = yield bcrypt_1.default.hash(newPassword, Number(config_1.default.bycrypt_sault_round));
    const updatedData = {
        password: newHashPassword,
        needsPasswordChange: false,
        passwordChangedAt: new Date(),
    };
    // update password
    yield user_model_1.User.findOneAndUpdate({ id: user === null || user === void 0 ? void 0 : user.userId }, updatedData);
});
exports.AuthService = {
    loginUser,
    refreshToken,
    changePassword,
};

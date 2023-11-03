import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { User } from '../user/user.model';
import {
  IChangePassword,
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface';
import { jwtHelpers } from '../../../helpers/jwtHelper';
import config from '../../../config';
import { JwtPayload, Secret } from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { id, password } = payload;

  const user = new User();

  const isUserExist = await user.isUserExist(id);
  user.isUserExist;
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  const passwordMatched = user.isPasswordMatched(
    password,
    isUserExist.password as string,
  );
  if (isUserExist?.password && !passwordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password did not matched');
  }

  // create a access and refresh token
  const accessToken = jwtHelpers.createToken(
    { id: isUserExist?.id, role: isUserExist?.role },
    config.jwt_secret as Secret,
    config.jwt_expires_in as string,
  );

  const { needsPasswordChange } = isUserExist;

  const refreshToken = jwtHelpers.createToken(
    { id: isUserExist?.id, role: isUserExist?.role },
    config.jwt_refresh_secret as Secret,
    config.jwt_refresh_expires_in as string,
  );
  return {
    accessToken,
    refreshToken,
    needsPasswordChange: needsPasswordChange,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  const user = new User();
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt_refresh_secret as Secret,
    );
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'invalid refresh token');
  }

  // checking deleted users refresh token
  const { id } = verifiedToken;
  const isUserExist = await user.isUserExist(id);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }
  // generate new token
  const newAccessToken = jwtHelpers.createToken(
    { id: isUserExist?.id, role: isUserExist?.role },
    config.jwt_secret as Secret,
    config.jwt_expires_in as string,
  );

  return {
    accessToken: newAccessToken,
  };
};

const changePassword = async (
  user: JwtPayload | null,
  payload: IChangePassword,
): Promise<void> => {
  const { oldPassword, newPassword } = payload;
  const users = new User();
  const isUserExist = await users.isUserExist(user?.userId);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }
  // checking old pass
  const passwordMatched = users.isPasswordMatched(
    oldPassword,
    isUserExist.password as string,
  );
  if (isUserExist?.password && !passwordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Old Password did not matched');
  }

  // hash pass
  const newHashPassword = await bcrypt.hash(
    newPassword,
    Number(config.bycrypt_sault_round),
  );

  const updatedData = {
    password: newHashPassword,
    needsPasswordChange: false,
    passwordChangedAt: new Date(),
  };
  // update password
  await User.findOneAndUpdate({ id: user?.userId }, updatedData);
};

export const AuthService = {
  loginUser,
  refreshToken,
  changePassword,
};

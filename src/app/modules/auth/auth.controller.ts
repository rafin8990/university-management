import { Request, RequestHandler, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { AuthService } from './auth.service';
import config from '../../../config';
import { IRefreshTokenResponse } from './auth.interface';

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await AuthService.loginUser(loginData);

  const { refreshToken, ...others } = result;

  // set refresh token into the cookie

  const cookieOption = {
    secure: config.env === 'production' ? true : false,
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOption);

  // delete refresh token
  if ('refreshToken' in result) {
    delete result.refreshToken;
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User login Successfully',
    data: others,
  });
});

const refreshToken: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { refreshToken } = req.cookies;
    const result = await AuthService.refreshToken(refreshToken);

    // set refresh token into the cookie

    const cookieOption = {
      secure: config.env === 'production' ? true : false,
      httpOnly: true,
    };

    res.cookie('refreshToken', refreshToken, cookieOption);

    sendResponse<IRefreshTokenResponse>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User Login Successfully',
      data: result,
    });
  },
);
export const AuthController = {
  loginUser,
  refreshToken,
};

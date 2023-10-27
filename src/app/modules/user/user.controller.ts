import { Request, Response } from 'express';
import { userService } from './user.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import { IUser } from './user.interface';

const createStudent = catchAsync(async (req: Request, res: Response) => {
  const { student, ...userData } = req.body;
  const result = await userService.createStudent(student, userData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Student created successfully',
    success: true,
    data: result,
  });
});

const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const { faculty, ...userData } = req.body;
  const result = await userService.createFaculty(faculty, userData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'faculty created successfully',
    success: true,
    data: result,
  });
});

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const { admin, ...AdminData } = req.body;
  const result = await userService.createAdmin(admin, AdminData);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin created successfully!',
    data: result,
  });
});

export const userController = {
  createStudent,
  createFaculty,
  createAdmin,
};

import { Request, Response } from 'express';
import { userService } from './user.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student, ...userData } = req.body;
    const result = await userService.createStudent(student, userData);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Student created successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'failed to create Student',
    });
  }
};

export const userController = {
  createStudent,
};

import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { ManagementService } from './managementDepartment.service';
import { IManagement } from './managementDepartment.interface';
import { managementFilterableFields } from './managementDepartment.constant';

const createManagement = catchAsync(async (req: Request, res: Response) => {
  const { ...managementData } = req.body;
  const result = await ManagementService.createManagement(managementData);

  sendResponse<IManagement>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Management created successfully!',
    data: result,
  });
});

const getAllManagements = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, managementFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await ManagementService.getAllManagement(
    filters,
    paginationOptions,
  );

  sendResponse<IManagement[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Management retrieved successfully !',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleManagement = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await ManagementService.getSingleManagement(id);

  sendResponse<IManagement>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Management retrieved successfully !',
    data: result,
  });
});

const updateManagement = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await ManagementService.updateManagement(id, updatedData);

  sendResponse<IManagement>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Management updated successfully !',
    data: result,
  });
});
const deleteManagement = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await ManagementService.deleteManagement(id);

  sendResponse<IManagement>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Management deleted successfully !',
    data: result,
  });
});

export const ManagementController = {
  createManagement,
  getAllManagements,
  getSingleManagement,
  updateManagement,
  deleteManagement,
};

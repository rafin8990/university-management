import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { IFaculty, IFacultyFilter } from './faculty.interface';
import { facultyFilterableFields } from './faculty.constants';

const getAllFaculties = catchAsync(async (req: Request, res: Response) => {
  const filters: IFacultyFilter = {
    ...pick(req.query, facultyFilterableFields),
    searchTerm: req.query.searchTerm as string,
  };
  const paginationOptions = pick(req.query, paginationFields);

  const result = await FacultyService.getAllStudents(
    filters,
    paginationOptions,
  );

  sendResponse<IFaculty[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty retrieved successfully !',
    meta: result.meta,
    data: result.data,
  });
});

const getSinglefaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await FacultyService.getSingleStudent(id);

  sendResponse<IFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'faculty retrieved successfully !',
    data: result,
  });
});

const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await FacultyService.updateStudent(id, updatedData);

  sendResponse<IFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty updated successfully !',
    data: result,
  });
});
const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await FacultyService.deleteStudent(id);

  sendResponse<IFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty deleted successfully !',
    data: result,
  });
});

export const FacultyController = {
  getAllFaculties,
  getSinglefaculty,
  updateFaculty,
  deleteFaculty,
};

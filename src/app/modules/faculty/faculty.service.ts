/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

import { IFaculty, IFacultyFilter } from './faculty.interface';
import { facultySearchableFields } from './faculty.constants';
import { Faculty } from './faculty.model';
import { User } from '../user/user.model';

const getAllFaculties = async (
  filters: IFacultyFilter,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IFaculty[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      $or: facultySearchableFields.map((field: any) => ({
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

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Faculty.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Faculty.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleFaculties = async (id: string): Promise<IFaculty | null> => {
  const result = await Faculty.findById(id);
  return result;
};

const updateFaculties = async (
  id: string,
  payload: Partial<IFaculty>,
): Promise<IFaculty | null> => {
  const isExist = await Faculty.findOne({ id });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Faculty Does not exist');
  }

  const { name, ...facultyData } = payload;

  const updatedFacultyData: Partial<IFaculty> = { ...facultyData };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IFaculty>;
      (updatedFacultyData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  const result = await Faculty.findOneAndUpdate(
    { id: id },
    updatedFacultyData,
    {
      new: true,
    },
  );
  return result;
};

const deleteFaculty = async (
  id: string,
): Promise<IFaculty | null | undefined> => {
  const session = await Faculty.startSession();
  session.startTransaction();
  try {
    const facultyResult = await Faculty.findByIdAndDelete(id).session(session);

    if (!facultyResult) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Faculty Does not exist');
    }
    const userResult = await User.findByIdAndDelete(id).session(session);
    if (facultyResult && userResult) {
      await session.commitTransaction();
    } else {
      await session.abortTransaction();
    }
    return facultyResult;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

export const FacultyService = {
  getAllFaculties,
  getSingleFaculties,
  updateFaculties,
  deleteFaculty,
};

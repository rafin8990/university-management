import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import {
  IManagement,
  IManagementFilter,
} from './managementDepartment.interface';
import { Management } from './managementDepartment.model';
import { managementSearchableFields } from './managementDepartment.constant';

const createManagement = async (payload: IManagement): Promise<IManagement> => {
  const result = await Management.create(payload);
  return result;
};

const getAllManagement = async (
  filters: IManagementFilter,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IManagement[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: managementSearchableFields.map(field => ({
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

  const result = await Management.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Management.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleManagement = async (id: string): Promise<IManagement | null> => {
  const result = await Management.findById(id);
  return result;
};

const updateManagement = async (
  id: string,
  payload: Partial<IManagement>,
): Promise<IManagement | null> => {
  const result = await Management.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteManagement = async (id: string): Promise<IManagement | null> => {
  const result = await Management.findByIdAndDelete(id);
  return result;
};

export const ManagementService = {
  createManagement,
  getAllManagement,
  getSingleManagement,
  updateManagement,
  deleteManagement,
};

import { Schema, model } from 'mongoose';
import { IManagement, ManagementModel } from './managementDepartment.interface';

export const managementSchema = new Schema<IManagement, ManagementModel>(
  {
    title: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const Management = model<IManagement, ManagementModel>(
  'Management',
  managementSchema,
);

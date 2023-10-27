import { Model, Types } from 'mongoose';
import { IAcademicDepartment } from '../academicDepartment/academicDepartment.interfaces';
import { IAcademicFaculty } from '../academicFaculty/academicFaculty.interface';

export type IFaculty = {
  id: string;
  name: {
    firstName: string;
    middleName?: string;
    lastName: string;
  };
  dateOfBirth: string;
  gender: 'male' | 'female';
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  profileImage?: string;
  designation: string;
  academicFaculty: Types.ObjectId | IAcademicFaculty;
  academicDepartment: Types.ObjectId | IAcademicDepartment;
};

export type FacultyModel = Model<IFaculty, Record<string, unknown>>;

export type IFacultyFilter = {
  searchTerm: string;
  id?: string;
  bloodGroup?: string;
  email?: string;
  contactNo?: string;
  emergencyContactNo?: string;
};

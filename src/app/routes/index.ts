import express from 'express'
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route'
import { userRoutes } from '../modules/user/user.route'
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.routes'

const router = express.Router()

const moduleRoutes = [
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoutes,
  },
  {
    path: '/academic-faculties',
    route: AcademicFacultyRoutes,
  },
  // {
  //   path: '/academic-departments',
  //   route: AcademicDepartmentRoutes,
  // },
  // {
  //   path: '/students',
  //   route: StudentRoutes,
  // },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))
export default router

import { createBrowserRouter } from "react-router-dom";
import ProductList from "./pages/product/Home";

import AboutPage from "./pages/About/AboutPage";
import LoginPage from "./pages/login/LoginPage";
import App from "./App";
import NotFound from "./shared/NotFound";

import RegisterPage from "./pages/Register/RegisterPage";
import Courses from "./pages/Courses/Courses";
import CourseInfo from "./pages/product/CourseInfo";
import ManageCourses from "./pages/ManageCourses/ManageCourses";
import AddCourse from "./pages/ManageCourses/AddCourse";
import UpdateCourse from "./pages/ManageCourses/UpdateCourse";
import ManageInstructors from "./pages/ManageInstructors/ManageInstructors";
import AddInstructor from "./pages/ManageInstructors/AddInstructor";
import RemoveInstructor from "./pages/ManageInstructors/UpdateInstructor";
import UpdateInstructor from "./pages/ManageInstructors/UpdateInstructor";
import MyCourses from "./pages/Courses/MyCourses";
import Guest from "./middleware/Guest";
import Admin from "./middleware/Admin";
import CoursesGrade from "./pages/Courses/CoursesGrade";
import AvailableCourses from "./pages/Courses/AvailableCourses";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <ProductList />,
      },
      {
        path: "/course-details/:id",
        element: <CourseInfo />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },

      {
        path: "/all-courses",
        element: <Courses />,
      },

      {
        path: "/my-courses",
        element: <MyCourses />,
      },
      {
        path: "/available-courses",
        element: <AvailableCourses />,
      },
      {
        element: <Guest />,
        children: [
          {
            path: "/login",
            element: <LoginPage />,
          },
          {
            path: "/register",
            element: <RegisterPage />,
          },
        ],
      },

      {
        path: "/manage-courses",
        element: <Admin />,
        children: [
          {
            path: "",
            element: <ManageCourses />,
          },
          {
            path: "add",
            element: <AddCourse />,
          },
          {
            path: "update",
            element: <UpdateCourse />,
          },
        ],
      },
      {
        path: "/courses-grade",
        element: <CoursesGrade />,
      },
      {
        path: "/manage-instructors",
        children: [
          {
            path: "",
            element: <ManageInstructors />,
          },
          {
            path: "add-instructor",
            element: <AddInstructor />,
          },
          {
            path: "update/:id",
            element: <UpdateInstructor />,
          },
        ],
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

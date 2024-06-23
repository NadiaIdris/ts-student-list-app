import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthContextProvider } from "./context/AuthContext";
import { LogInPage, action as logInAction } from "./pages/LogInPage";
import { StudentsPage, loader as studentsLoader } from "./pages/StudentsPage";
import { SignUpPage, action as signUpAction } from "./pages/SignUpPage";
import { StudentPanel, loader as studentLoader } from "./pages/StudentPanel";
import { StudentEditPanel, action as editStudentAction } from "./pages/StudentPanel/StudentEditPanel";
import { AddStudentModal, action as addStudentAction } from "./pages/AddStudentModal";

const router = createBrowserRouter([
  // {
  //   path: "/",
  //   element: (
  //     <ProtectedRoute>
  //       <StudentsPage />
  //     </ProtectedRoute>
  //   ),
  //   loader: studentsLoader,
  //   children: [
  //     {
  //       path: "/students/:studentId",
  //       element: <StudentPanel />,
  //       loader: studentLoader,
  //     },
  //     {
  //       path: "/students/:studentId/edit",
  //       element: <StudentEditPanel />,
  //       loader: studentLoader,
  //       // action: editStudentAction,
  //     },
  //   ],
  // },
  {
    path: "/students/",
    element: (
      <ProtectedRoute>
        <StudentsPage />
      </ProtectedRoute>
    ),
    loader: studentsLoader,
    children: [
      {
        path: ":studentId",
        element: <StudentPanel />,
        loader: studentLoader,
      },
      {
        path: ":studentId/edit",
        element: <StudentEditPanel />,
        loader: studentLoader,
        action: editStudentAction,
      },
      {
        path: "add",
        element: (
          <AddStudentModal />
        ),
        loader: studentLoader,
        action: addStudentAction,
      },
    ],
  },
  
  {
    path: "/login",
    element: <LogInPage />,
    action: logInAction,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
    action: signUpAction,
  },
  {
    path: "*",
    element: <div>404 Not Found</div>,
  },
]);

const App = () => {
  return (
    <React.StrictMode>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </React.StrictMode>
  );
};

export default App;

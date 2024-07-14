import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthContextProvider } from "./context/AuthContext";
import { AddStudentModal, action as addStudentAction } from "./pages/AddStudentModal";
import { DeleteStudentModal, action as deleteStudentAction } from "./pages/DeleteStudentModal";
import { LogInPage, action as logInAction } from "./pages/LogInPage";
import { SignUpPage, action as signUpAction } from "./pages/SignUpPage";
import { StudentEditPanel, action as editStudentAction } from "./pages/StudentEditPanel";
import { StudentPanel, loader as studentLoader } from "./pages/StudentPanel";
import { StudentsPage, loader as studentsLoader } from "./pages/StudentsPage";
import { DeleteUserModal, action as deleteUserAction } from "./pages/DeleteUserModal";
import { ErrorBoundary } from "./error-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <StudentsPage />
      </ProtectedRoute>
    ),
    loader: studentsLoader,
    errorElement: <ErrorBoundary />,
  },
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
        path: ":studentId/delete",
        element: <DeleteStudentModal />,
        loader: studentLoader,
        action: deleteStudentAction,
      },
      {
        path: "add",
        element: <AddStudentModal />,
        action: addStudentAction,
      },
      {
        path: ":userId/delete-user",
        element: <DeleteUserModal />,
        action: deleteUserAction,
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

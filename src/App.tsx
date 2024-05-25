import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthContextProvider } from "./context/AuthContext";
import { LogInPage, action as logInAction } from "./pages/LogInPage";
import { StudentsPage } from "./pages/StudentsPage";
import { SignUpPage, action as signUpAction } from "./pages/SignUpPage";
import { StudentPage } from "./pages/StudentPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <StudentsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/students/",
    element: (
      <ProtectedRoute>
        <StudentsPage />
      </ProtectedRoute>
    ),
    children: [
      {
        path: ":studentId",
        element: <StudentPage />,
      },
    ],
  },
  {
    path: "/students/add-student",
    element: (
      <ProtectedRoute>
        <StudentsPage />
      </ProtectedRoute>
    ),
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

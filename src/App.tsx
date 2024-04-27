import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthContextProvider } from "./context/AuthContext";
import { LogInPage } from "./pages/LogInPage";
import { StudentsPage } from "./pages/StudentsPage";

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
        path: "add-student",
        element: <StudentsPage />,
      },
      {
        path: ":id",
        element: <StudentsPage />,
      },
      {
        path: ":id/edit",
        element: <StudentsPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LogInPage />,
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

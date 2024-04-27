import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthContextProvider } from "./context/AuthContext";
import { LogInPage } from "./pages/LogInPage";
import { StudentsPage } from "./pages/StudentsPage";
import { LogInWrapper } from "./components/LogInWrapper";

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
    element: <LogInWrapper><LogInPage /></LogInWrapper>,
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

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route
//           path="/"
//           element={
//             <ProtectedRoute>
//               <Suspense fallback={<LoadingSpinner />}>
//                 <StudentsPage />
//               </Suspense>
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/students"
//           element={
//             <ProtectedRoute>
//               <Suspense fallback={<LoadingSpinner />}>
//                 <StudentsPage />
//               </Suspense>
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/login"
//           element={
//             <ProtectedRoute>
//               <Suspense fallback={<LoadingSpinner />}>
//                 <StudentsPage />
//               </Suspense>
//             </ProtectedRoute>
//           }
//         />
//         {/* <Route path="/signup" element={<SignUp />} /> */}
//         {/* <Route path="/students/add-student" element={<AddStudent />} /> */}
//         {/* <Route path="/students/:id" element={<Student />} /> */}
//         {/* <Route path="/students/:id/edit" element={<Student />} /> */}
//       </Routes>
//     </BrowserRouter>
//   );
// }

export default App;

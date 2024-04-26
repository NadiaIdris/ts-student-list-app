import React, { Suspense } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { AuthContextProvider } from "./context/AuthContext";
import { StudentsPage } from "./pages/StudentsPage";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Suspense fallback={<LoadingSpinner />}>
                  <StudentsPage />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="/students"
            element={
              <ProtectedRoute>
                <Suspense fallback={<LoadingSpinner />}>
                  <StudentsPage />
                </Suspense>
              </ProtectedRoute>
            }
          />
          {/* <Route path="/signup" element={<SignUp />} /> */}
          {/* <Route path="/students/add-student" element={<AddStudent />} /> */}
          {/* <Route path="/students/:id" element={<Student />} /> */}
          {/* <Route path="/students/:id/edit" element={<Student />} /> */}
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;

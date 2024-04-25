import React, { Suspense } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { AuthContextProvider } from "./context/AuthContext";
const LogInPage = React.lazy(() =>
  import("./pages/LogInPage").then((exp) => ({ default: exp.LogInPage }))
);

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <LogInPage />
              </Suspense>
            }
          />
          <Route
            path="/login"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <LogInPage />
              </Suspense>
            }
          />
          {/* <Route path="/signup" element={<SignUp />} /> */}
          {/* <Route path="/students" element={<Students />} /> */}
          {/* <Route path="/students/add-student" element={<AddStudent />} /> */}
          {/* <Route path="/students/:id" element={<Student />} /> */}
          {/* <Route path="/students/:id/edit" element={<Student />} /> */}
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;

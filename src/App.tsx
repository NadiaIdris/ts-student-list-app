import React, { Suspense } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoadingSpinner } from "./components/LoadingSpinner/LoadingSpinner";
const LogInPage = React.lazy(() => import("./pages/LogInPage").then(exp => ({default: exp.LogInPage})));

function App() {
  return (
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
        {/* <Route path="/login" element={<LogIn />} /> */}
        {/* <Route path="/signup" element={<SignUp />} /> */}
        {/* <Route path="/students" element={<Students />} /> */}
        {/* <Route path="/students/add-student" element={<AddStudent />} /> */}
        {/* <Route path="/students/:id" element={<Student />} /> */}
        {/* <Route path="/students/:id/edit" element={<Student />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

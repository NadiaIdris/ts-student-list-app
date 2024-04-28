import { useAuthContext } from "../../hooks/useAuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

type ProtectedRouteProps = { children: JSX.Element };

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuthenticated = useAuthContext().user?.isAuthenticated;
  const navigate = useNavigate();
  const location = useLocation();
  const endpoint = location.pathname;

  /*
   * If user is trying to access a protected route, save the endpoint in case they log in
   * successfully and need to be redirected back to the endpoint they were trying to access
   */
  if (!isAuthenticated) {
    localStorage.setItem("endpoint", location.pathname);
  }

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", {
        replace: true,
        state: { from: endpoint },
      });
    }
    // Add code to fetch data from the server
  }, [navigate, isAuthenticated, endpoint]);

  return children;
};

export { ProtectedRoute };

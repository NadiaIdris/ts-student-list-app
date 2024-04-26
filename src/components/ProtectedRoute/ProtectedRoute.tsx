import { Route } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { LogInPage } from "../../pages/LogInPage";

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuthenticated = useAuthContext().user?.isAuthenticated;

  if (!isAuthenticated) {
    return <LogInPage />;
  }

  return children;
};

export { ProtectedRoute };

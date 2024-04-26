import { useAuthContext } from "../../hooks/useAuthContext";
import { LogInPage } from "../LogInPage";

const StudentsPage = () => {
  const { user } = useAuthContext();
  
  return !user?.isAuthenticated ? <LogInPage /> : <div>Students page</div>;
};

export { StudentsPage };

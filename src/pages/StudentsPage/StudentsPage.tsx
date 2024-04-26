import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { LogInPage } from "../LogInPage";
import { useEffect } from "react";

const StudentsPage = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.isAuthenticated) {
      console.log("User is not authenticated, redirecting to login page");
      navigate("/login");
    }
  }, [ navigate, user?.isAuthenticated ]);
  
  return <div>Students page</div>;
};

export { StudentsPage };

import { useAuthContext } from "../../hooks/useAuthContext";

const StudentsPage = () => {
  const { user } = useAuthContext();
  
  if (!user?.isAuthenticated) {
    return <div>Not authenticated</div>;
  }

  return <div>Students page</div>;
};

export { StudentsPage };

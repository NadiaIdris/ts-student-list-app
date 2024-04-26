import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

const StudentsPage = () => {
  const { logOut } = useAuthContext();
  const navigate = useNavigate();

  const handleLogOut = () => {
    logOut();
    navigate("/login", { replace: true });
  };

  return (
    <div>
      Students page
      <button onClick={handleLogOut}>Log out</button>
    </div>
  );
};

export { StudentsPage };

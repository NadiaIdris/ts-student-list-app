import { createContext, useState } from "react";

interface UserType {
  isAuthenticated: boolean;
  token: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface AuthContextType {
  user?: UserType;
  logIn?: (user: UserType) => Promise<void>;
  logOut?: () => void;
}

const AuthContext = createContext<AuthContextType>({});

const AuthContextProvider = ({ children }: { children: JSX.Element }) => {
  const localStorageUser = localStorage.getItem("user");
  const [user, setUser] = useState<UserType | undefined>(
    localStorageUser ? JSON.parse(localStorageUser) : null
  );

  const logIn = async (user: UserType) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const logOut = () => {
    setUser(undefined);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };

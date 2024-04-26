import { createContext, useState } from "react";

export interface UserType {
  isAuthenticated: boolean;
  token: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface AuthContextType {
  user: UserType | null;
  logIn: (user: UserType) => void;
  logOut: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  logIn: (user) => {},
  logOut: () => {},
});

const AuthContextProvider = ({ children }: { children: JSX.Element }) => {
  const localStorageUser = localStorage.getItem("user");
  const [user, setUser] = useState<UserType | null>(
    localStorageUser ? JSON.parse(localStorageUser) : null
  );

  const logIn = (user: UserType) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const logOut = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };

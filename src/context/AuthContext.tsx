import { createContext, useState } from "react";

export interface IUser {
  isAuthenticated: boolean;
  token: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface IAuthContext {
  user: IUser | null;
  logIn: (user: IUser) => void;
  logOut: () => void;
}

const AuthContext = createContext<IAuthContext>({
  user: null,
  logIn: (user) => {},
  logOut: () => {},
});

type AuthContextProviderProps = { children: JSX.Element };

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const localStorageUser = localStorage.getItem("user");
  const [user, setUser] = useState<IUser | null>(
    localStorageUser ? JSON.parse(localStorageUser) : null
  );

  const logIn = (user: IUser) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const logOut = () => {
    setUser(null);
    localStorage.clear()
  };

  return (
    <AuthContext.Provider value={{ user, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };

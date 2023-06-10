import { createContext, useContext, useEffect, useState } from "react";
import { User } from "../types";
import { useNavigate } from "react-router-dom";

const authContext = createContext<AuthMethods>({
  user: {},
  setUser: undefined,
});

export function AuthProvider({ children }: any) {
  const user = useAuthProvider();

  return <authContext.Provider value={user}>{children}</authContext.Provider>;
}

export const useAuthContext = () => useContext(authContext);
export const globalNavigate = () => useNavigate();

interface AuthMethods {
  user: User;
  setUser: any;
}

function useAuthProvider() {
  const [user, setUser] = useState<User | {}>({});

  useEffect(() => {
    let profile: User;
    if (localStorage.getItem("profile")) {
      const data = localStorage.getItem("profile");
      if (data !== null) {
        profile = JSON.parse(data);
        setUser(profile);
      }
    }
  }, []);

  return {
    user,
    setUser,
  };
}

import { createContext } from "react";

export const AuthContext = createContext({
  isAuth: false,
  user: {},
  login: () => {},
  logout: () => {},
  updateUser: () => {},
});

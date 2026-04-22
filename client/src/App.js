import React, { useEffect, useMemo, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import SiteHeader from "./components/site-header";
import SiteFooter from "./components/site-footer";
import { AuthContext } from "./context/AuthContext";
import {
  clearSession,
  getSavedSession,
  saveSession,
  updateRegisteredUser,
} from "./utils/auth-storage";
import "./styles/app.css";

const initialAuthState = {
  isAuth: false,
  user: {
    accountEmail: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    birthDate: "",
    gender: "male",
  },
};

const App = () => {
  const [authState, setAuthState] = useState(() => getSavedSession() || initialAuthState);

  useEffect(() => {
    if (authState.isAuth) {
      saveSession(authState);
      return;
    }

    clearSession();
  }, [authState]);

  const authValue = useMemo(
    () => ({
      ...authState,
      login: (userData) => {
        const { password, ...safeUserData } = userData;
        setAuthState({
          isAuth: true,
          user: {
            ...initialAuthState.user,
            ...safeUserData,
          },
        });
      },
      logout: () => {
        setAuthState(initialAuthState);
      },
      updateUser: (userData) => {
        setAuthState((current) => ({
          ...current,
          user: (() => {
            const nextUser = {
              ...current.user,
              ...userData,
            };

            updateRegisteredUser(current.user.accountEmail, nextUser);
            return nextUser;
          })(),
        }))
      },
    }),
    [authState]
  );

  return (
    <BrowserRouter>
      <AuthContext.Provider value={authValue}>
        <div className="app">
          <SiteHeader />
          <main className="app__main">
            <AppRouter />
          </main>
          <SiteFooter />
        </div>
      </AuthContext.Provider>
    </BrowserRouter>
  );
};

export default App;

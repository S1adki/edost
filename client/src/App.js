import React, { useEffect, useMemo, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import SiteHeader from "./components/site-header";
import SiteFooter from "./components/site-footer";
import { AuthContext } from "./context/AuthContext";
import "./styles/app.css";

const AUTH_STORAGE_KEY = "edostavka-auth";

const initialAuthState = {
  isAuth: false,
  user: {
    name: "",
    email: "",
    phone: "",
    address: "",
    birthDate: "",
    gender: "male",
  },
};

const App = () => {
  const [authState, setAuthState] = useState(() => {
    const savedAuthState = localStorage.getItem(AUTH_STORAGE_KEY);

    if (!savedAuthState) {
      return initialAuthState;
    }

    try {
      return JSON.parse(savedAuthState);
    } catch (error) {
      return initialAuthState;
    }
  });

  useEffect(() => {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authState));
  }, [authState]);

  const authValue = useMemo(
    () => ({
      ...authState,
      login: (userData) => {
        setAuthState({
          isAuth: true,
          user: {
            ...initialAuthState.user,
            ...userData,
          },
        });
      },
      logout: () => {
        setAuthState(initialAuthState);
      },
      updateUser: (userData) => {
        setAuthState((current) => ({
          ...current,
          user: {
            ...current.user,
            ...userData,
          },
        }));
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

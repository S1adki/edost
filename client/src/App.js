import React, { useMemo, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import SiteHeader from "./components/site-header";
import SiteFooter from "./components/site-footer";
import { AuthContext } from "./context/AuthContext";
import "./styles/app.css";

const App = () => {
  const [authState] = useState({
    isAuth: false,
    user: {
      email: "",
      name: "",
    },
  });

  const authValue = useMemo(() => authState, [authState]);

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

import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { UsercontextProvider } from "./contexts/UserContext";
import Homepage from "./pages/homepage";
import Login from "./pages/Login";

function App() {
  const [user, setUser] = useState({
    isLoggedIn: false,
    token: "",
    username: "",
  });

  useEffect(() => {
    let localStorageVal = null;
    if (localStorage.getItem("loggedInUserDetails")) {
      localStorageVal = JSON.parse(localStorage.getItem("loggedInUserDetails"));
      setUser((user) => ({
        ...user,
        isLoggedIn: localStorageVal.isLoggedIn,
        username: localStorageVal.username,
        token: localStorageVal.token,
      }));
    }
  }, []);

  return (
    <BrowserRouter>
      <UsercontextProvider value={{ user: user, setUser: setUser }}>
        <Switch>
          <Route exact path={"/"} component={Homepage} />
          <Route exact path={"/login"} component={Login} />
        </Switch>
      </UsercontextProvider>
    </BrowserRouter>
  );
}

export default App;

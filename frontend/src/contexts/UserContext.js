import React, { createContext } from "react";

const UserContext = createContext({
  user: {
    isLoggedIn: false,
    token: null,
    username: null,
  },
  setUser: () => {},
});

const { Provider } = UserContext;

export const UsercontextProvider = ({ children, ...props }) => {
  return <Provider {...props}>{children}</Provider>;
};

export default UserContext;

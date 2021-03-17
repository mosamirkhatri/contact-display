import React, { useContext, useState } from "react";
import { Redirect } from "react-router";
import Header from "../components/Header";
import UserContext from "../contexts/UserContext";

const Login = () => {
  const { user, setUser } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (username === "") {
      setError("Please Enter Username");
      return;
    }
    if (password === "") {
      setError("Please Enter Password");
      return;
    }
    fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ username: username, password: password }),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.token) {
          let newUser = {
            isLoggedIn: true,
            username: username,
            token: json.token,
          };
          localStorage.setItem("loggedInUserDetails", JSON.stringify(newUser));
          setUser(newUser);
        } else {
          setError("An Error Occured. Please Check Username/Password!");
        }
      })
      .catch((err) =>
        setError("An Error Occured. Please Check Username/Password!")
      );
  };

  if (user.isLoggedIn) return <Redirect to="/" />;

  return (
    <div
      style={{
        maxWidth: 1200,
        margin: "auto",
        textAlign: "center",
        fontFamily: "Open Sans",
      }}
    >
      <Header parent={"login"} />
      <div
        style={{
          margin: "150px auto",
          width: 350,
          height: 350,
          padding: 15,
          backgroundColor: "#007580",
        }}
      >
        <h1 style={{ color: "#d8ebe4", fontFamily: "Syne Mono" }}>Login</h1>
        <form onSubmit={onSubmit} style={{ textAlign: "left" }}>
          <label
            style={{
              display: "block",
              fontSize: 20,
              marginTop: 15,
              marginLeft: 10,
              color: "#fed049",
            }}
          >
            Username
          </label>
          <input
            type={"text"}
            style={{
              display: "block",
              width: "100%",
              marginTop: 10,
              border: "none",
              outline: "none",
              padding: "5px 15px",
              boxSizing: "border-box",
              borderRadius: 15,
              color: "#007580",
            }}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <label
            style={{
              display: "block",
              fontSize: 20,
              marginLeft: 10,
              color: "#fed049",
            }}
          >
            Password
          </label>
          <input
            type={"password"}
            style={{
              display: "block",
              width: "100%",
              marginTop: 10,
              border: "none",
              outline: "none",
              padding: "5px 15px",
              boxSizing: "border-box",
              borderRadius: 15,
              color: "#007580",
            }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          {error && (
            <p
              style={{
                color: "#810000",
                margin: "0 auto",
                display: "block",
                textAlign: "center",
              }}
            >
              {error}
            </p>
          )}
          <input
            style={{
              margin: "15px auto 0",
              display: "block",
              border: "none",
              outline: "none",
              padding: "5px 20px",
              fontFamily: "Open Sans",
              fontSize: 16,
              color: "#007580",
              backgroundColor: "#282846",
              borderRadius: 15,
              cursor: "pointer",
            }}
            type={"submit"}
            value={"Login"}
          />
        </form>
      </div>
    </div>
  );
};

export default Login;

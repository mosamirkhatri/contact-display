import React, { useContext } from "react";
import UserContext from "../contexts/UserContext";
import { useHistory } from "react-router-dom";

const Header = ({
  showSearchBar,
  searchText,
  setSearchText,
  parent,
  ...props
}) => {
  const { user, setUser } = useContext(UserContext);
  const history = useHistory();
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#282846",
        boxSizing: "border-box",
        padding: 10,
      }}
      {...props}
    >
      <h1 style={{ margin: 0, color: "#d8ebe4", fontFamily: "Syne Mono" }}>
        Hello {user.isLoggedIn ? user.username : "Friend"}
      </h1>
      {showSearchBar && (
        <div
          style={{
            width: "70%",
            backgroundColor: "#FFF",
            borderRadius: 15,
            display: "flex",
            padding: "5px 15px",
            boxShadow: "0 0 5px 5px #d8ebe4",
          }}
        >
          <input
            style={{
              width: "100%",
              border: "none",
              outline: "none",
              fontSize: 16,
              color: "#007580",
            }}
            disabled={!user.isLoggedIn}
            value={searchText}
            placeholder={"Search"}
            type={"text"}
            onChange={(e) => {
              let newValue = e.target.value;
              if (newValue === "" || /^[A-Za-z ]+$/.test(newValue)) {
                setSearchText(newValue);
              }
            }}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="23"
            viewBox="0 0 28.117 27.325"
          >
            <g id="search" transform="translate(0)">
              <path
                id="Path_10"
                data-name="Path 10"
                d="M42.379,41.478,34.34,33.4a11.09,11.09,0,1,0-8.752,4.277,11.184,11.184,0,0,0,7.683-3.089l8,8a.766.766,0,0,0,1.109,0A.766.766,0,0,0,42.379,41.478ZM25.588,36.093a9.5,9.5,0,1,1,9.5-9.5A9.532,9.532,0,0,1,25.588,36.093Z"
                transform="translate(-14.5 -15.5)"
                fill="#282846"
              />
            </g>
          </svg>
        </div>
      )}
      {parent !== "login" ? (
        <button
          style={{
            outline: "none",
            backgroundColor: "#fed049",
            color: "#007580",
            fontWeight: "bold",
            paddingTop: "5px 15px",
            border: "2px solid #fed049",
            borderRadius: 5,
            cursor: "pointer",
            fontSize: 16,
            fontFamily: "Open Sans",
          }}
          onClick={() => {
            if (user.isLoggedIn) {
              setUser({ isLoggedIn: false, token: "", username: "" });
              localStorage.clear();
            } else {
              history.push("/login");
            }
          }}
        >
          {user.isLoggedIn ? "Logout" : "Login"}
        </button>
      ) : null}
    </header>
  );
};

export default Header;

import React, { useEffect, useState, useContext } from "react";
import Header from "../components/Header";
import UserContext from "../contexts/UserContext";

const Homepage = () => {
  const [contactDetails, setContactDetails] = useState([]);
  const [searchText, setSearchText] = useState("");
  const { user } = useContext(UserContext);

  useEffect(() => {
    fetch("/api/")
      .then((data) => data.json())
      .then((res) => setContactDetails(res));
  }, []);

  return (
    <div
      style={{
        maxWidth: 1200,
        margin: "auto",
        textAlign: "center",
        fontFamily: "Open Sans",
      }}
    >
      <Header
        showSearchBar
        searchText={searchText}
        setSearchText={setSearchText}
      />
      {contactDetails.length > 0 ? (
        <table
          style={{
            tableLayout: "fixed",
            width: 600,
            borderCollapse: "separate",
            borderSpacing: "0 10px",
            margin: "20px auto",
            color: "#007580",
            border: "1px solid #007580",
          }}
        >
          <thead
            style={{
              fontWeight: "bold",
              color: "#282846",
            }}
          >
            <tr>
              <td>Id</td>
              <td>Name</td>
              <td>Number</td>
            </tr>
          </thead>
          <tbody>
            {contactDetails
              .filter((contact) =>
                new RegExp(".*" + searchText + ".*", "gi").test(contact.name)
              )
              .map((contact) => (
                <tr key={contact.id}>
                  <td>{contact.id}</td>
                  <td>{contact.name}</td>
                  <td>{contact.number}</td>
                </tr>
              ))}
          </tbody>
        </table>
      ) : (
        <p style={{ marginTop: 30, color: "#007580", fontSize: 24 }}>
          No Contact Data Found!
        </p>
      )}
    </div>
  );
};

export default Homepage;

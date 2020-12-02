import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import Search from "./Search";
import AdminList from "./AdminList";
import UserContext from "../context/UserContext";

const Admin = () => {
  const { userData } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    if (userData.user) {
      if (userData.user.role !== "admin") {
        history.push("/");
      }
    }
  }, [history, userData.user]);

  return (
    <div>
      <h2>Search for a user or post to delete it from the database</h2>
      <Search />
      <AdminList />
    </div>
  );
};

export default Admin;

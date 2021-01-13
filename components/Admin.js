import React, { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Search from "./Search";
import AdminList from "./AdminList";
import UserContext from "../context/UserContext";

const Admin = () => {
  const { userData } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (userData.user) {
      if (userData.user.role !== "admin") {
        router.push("/");
      }
    }
  }, [router, userData.user]);

  return (
    <div>
      <h2>Search for a user or post to delete it from the database</h2>
      <Search />
      <AdminList />
    </div>
  );
};

export default Admin;

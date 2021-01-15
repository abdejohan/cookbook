import React, { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Search from "../components/Search";
import AdminList from "../components/AdminList";
import UserContext from "../context/UserContext";

const Admin = () => {
  const { userData } = useContext(UserContext);
  const { user } = userData;
  const router = useRouter();

  useEffect(() => {
    if (user === undefined) {
      router.push("/");
    } else if (user.role !== "admin") {
      router.push("/");
    }
  }, [router, user]);

  return (
    <div>
      <h2>Search for a user or post to delete it from the database</h2>
      <Search />
      <AdminList />
    </div>
  );
};

export default Admin;

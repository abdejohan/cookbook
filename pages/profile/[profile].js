import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import UserContext from "../../context/UserContext";
import Library from "../../components/Library";
import User from "../[user]";

const Profile = () => {
  const { userData } = useContext(UserContext);
  const router = useRouter();
  const { profile } = router.query;

  useEffect(() => {
    if (userData.user) {
      if (userData.user.role === "admin") {
        router.push("/admin");
      }
    }
  }, [router, userData.user]);

  return (
    <>
      {userData.token ? (
        <>
          <User loggedInUserId={profile} />
          <Library />
        </>
      ) : (
        <p>
          there is nothing here right now..{" "}
          <span role="img" aria-label="sad-smilie">
            {" "}
            😞{" "}
          </span>{" "}
          try logging in!
        </p>
      )}
    </>
  );
};

export default Profile;

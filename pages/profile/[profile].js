import React, { useContext, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
// import Note from "./Note";
import UserContext from "../../context/UserContext";
import Library from "../../components/Library";
import Settings from "../settings";
import UserProfileView from "../../components/UserProfileView";

const useStyles = makeStyles(() => ({
  routerContainer: {
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "center",
  },
  navigationContainer: {
    width: "100%",
    padding: "20px",
  },
  navigationList: {
    display: "flex",
    flexFlow: "row wrap",
    listStyleType: "none",
  },
  navigationButton: {
    marginRight: "20px",
  },
  navigationLink: {
    fontSize: "20px",
  },
}));

const Profile = () => {
  const classes = useStyles();
  const { userData } = useContext(UserContext);
  const router = useRouter();
  const { id } = userData.user;
  console.log(id);

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
        <section style={{paddingTop: "200px"}} className={classes.navigationContainer}>
          <UserProfileView userId={id}/>
          <Library/>
        </section>
      ) : (
        <p>there is nothing here right now.. :disappointed: try logging in!</p>
      )}
    </>
  );
};

export default Profile;

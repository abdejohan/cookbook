import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import UserContext from "../../context/UserContext";
import Library from "../../components/Library";
import UserProfileView from "../../components/UserProfileView";

const useStyles = makeStyles(() => ({
  navigationContainer: {
    width: "100%",
    padding: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexFlow: "column nowrap",
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
  const { id, userName } = userData.user;

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
        <section className={classes.navigationContainer}>
          <Typography variant="h6" className="page-header">
            Hi there <span className={classes.userName}>{userName}</span>!
          </Typography>
          <UserProfileView userId={id} />
          <Library />
        </section>
      ) : (
        <p>there is nothing here right now.. :disappointed: try logging in!</p>
      )}
    </>
  );
};

export default Profile;

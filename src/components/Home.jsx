import React, { useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import UserContext from "../context/UserContext";
import Note from "./Note";
import Login from "./Login";
import Search from "./Search";
import UserProfileView from "./profilePages/UserProfileView";
import mobileImage from "../media/mobileImage.jpg";

// Images
// import record from "../media/record.svg";
// import notes from "../media/notes.svg";
// import merge from "../media/merge.svg";
// import share from "../media/share.svg";
// import baking from "../media/baking.svg";

const useStyles = makeStyles(() => ({
  contentContainer: {
    display: "flex",
    flexFlow: "column nowrap",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: "20px",
    borderRadius: "30px",
    position: "relative",
  },
  ulList: {
    listStyleType: "none",
    display: "flex",
    flexFlow: "row wrap",
    alignItems: "center",
    justifyContent: "space-around",
  },
  components: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  frontPageImg: {
    width: "100%",
    height: "300px",
    backgroundImage: `url(${mobileImage})`,
    backgroundAttachment: "fixed",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
}));

const Home = () => {
  const { userData } = useContext(UserContext);
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    if (userData.user) {
      if (userData.user.role === "admin") {
        history.push("/admin");
      }
    }
  }, [history, userData.token, userData.user]);

  return (
    <>
      <div className={classes.frontPageImg} />
      <section className={classes.contentContainer}>
        <Search />
        <div className={classes.components}>
          {userData.token && <UserProfileView />}
          {!userData.token && <Login />}
          <Note />
        </div>
      </section>
    </>
  );
};

export default Home;

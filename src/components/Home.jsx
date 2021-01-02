import React, { useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import UserContext from "../context/UserContext";
import Note from "./Note";
import Login from "./Login";
import Search from "./Search";
import SideNotes from "./SideNotes";
import UserProfileView from "./profilePages/UserProfileView";
import "../App.css";

// import mobileImage from "../media/mobileImage.jpg";
// backgroundImage: `url(${mobileImage})`,

const useStyles = makeStyles(() => ({
  contentContainer: {
    display: "flex",
    flexFlow: "column nowrap",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
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
    flexFlow: "column nowrap",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  frontPageImg: {
    width: "100%",
    height: "300px",
    backgroundColor: "grey",
    backgroundAttachment: "fixed",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  sideways: {
    padding: "20px",
    width: "100%",
    display: "flex",
    flexFlow: "row wrap",
    marginBottom: "50px",
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
          <div className={classes.sideways}>
            <Note />
            <SideNotes />
          </div>
          {!userData.token && <Login />}
        </div>
      </section>
    </>
  );
};

export default Home;

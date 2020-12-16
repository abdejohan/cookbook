import React, { useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import UserContext from "../context/UserContext";
import Note from "./Note";
import Login from "./Login";
import Search from "./Search";
import UserProfileView from "./profilePages/UserProfileView";

// Images
// import frontpageBackground from "../media/frontpageBackground.jpg";
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
    backgroundColor: "white",
    width: "100%",
    padding: "20px",
    borderRadius: "30px",
    top: "-50px",
    position: "relative",
  },
  newUserInfo: {
    zIndex: "-2",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#BB4430",
    backgroundAttachment: "fixed",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "500px",
  },
  article: {
    visibility: "hidden",
    padding: "20px",
    display: "flex",
    justifyContent: "center",
    alignItem: "center",
    flexFlow: "column nowrap",
    width: "90%",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    marginBottom: "50px",
    borderRadius: "3px",
    color: "#25252",
    fontSize: "1rem",
    fontStyle: "italic",
  },
  articleSubText: {
    padding: "0px",
    margin: "0px",
  },
  iconContainer: {
    padding: "20px 0px",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "space-between",
    width: "100%",
  },
  icons: {
    width: "50px",
    height: "50px",
  },
  icon2text: {
    display: "flex",
    alignItems: "center",
    flexFlow: "column nowrap",
  },
  ulList: {
    listStyleType: "none",
    display: "flex",
    flexFlow: "row wrap",
    alignItems: "center",
    justifyContent: "space-around",
  },
  listImg: {
    width: "20px",
    height: "20px",
    marginRight: "20px",
  },
  hr: {
    marginTop: "100px",
    width: "100%",
    height: "30px",
    borderStyle: "solid",
    borderColor: "#095484",
    borderWidth: "1px 0 0 0",
    borderRadius: "20px",
  },
  hr2: {
    display: "block",
    content: "",
    height: "30px",
    width: "100%",
    marginTop: "20px",
    borderStyle: "solid",
    borderColor: "#095484",
    borderWidth: "0 0 1px 0",
    borderRadius: "20px",
  },
  components: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
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
      <div className={classes.newUserInfo} />
      <section className={classes.contentContainer}>
        <Search />
        <hr className={classes.hr} />
        <div className={classes.components}>
          {userData.token && <UserProfileView />}
          {!userData.token && <Login />}
          <Note />
        </div>
        <hr className={classes.hr2} />
      </section>
    </>
  );
};

export default Home;

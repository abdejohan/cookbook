/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { useHistory } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import UserContext from "../context/UserContext";
import Note from "./Note";
import Login from "./Login";
import UserProfile from "./UserProfile";

// tab stuff starts here -----------------------------------------------------------------------------------
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}
// tab stuff ends here -----------------------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
  searchField: {
    marginBottom: "20px",
  },
}));

const Home = () => {
  const [filter, setFilter] = useState("");
  const { userData } = useContext(UserContext);
  const history = useHistory();
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [inputValue, setInputValue] = useState("");

  const handleSearchChange = async (e) => {
    const searchResponse = e.target.value;
    console.log(searchResponse);
    try {
      const searchRequest = await axios.get(
        `http://localhost:5000/search?term=${e.target.value}`
      );
      searchRequest.data.forEach((element) => {
        console.log(element);
      });
    } catch (error) {
      console.log(`THIS MESSAGE:${error}`);
    }
  };

  // useEffect(() => {
  //    if (!userData.user) {
  //      history.push("/login");
  //    }
  //  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div>
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="Home" {...a11yProps(0)} />
            <Tab label="Profile" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <section>
              <div className={classes.searchField}>
                <label htmlFor="search">
                  Search for User or Recipe
                  <input
                    id="search"
                    type="text"
                    placeholder="Search"
                    onChange={handleSearchChange}
                  />
                </label>
              </div>
              <Note />
            </section>
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            {!userData.user ? <Login /> : <UserProfile />}
          </TabPanel>
        </SwipeableViews>
      </div>
    </div>
  );
};

export default Home;

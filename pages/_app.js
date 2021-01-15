/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from "react";
import Head from "next/head";
import CssBaseline from "@material-ui/core/CssBaseline";
import Footer from "../components/Footer";
import "../styles/globals.css";
import UserContext from "../context/UserContext";
import Header from "../components/Header";

const App = (props) => {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });
  // eslint-disable-next-line react/prop-types
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>CookingNotes - YOUR VIRTUAL COOKBOOK</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <UserContext.Provider value={{ userData, setUserData }}>
        <Header />
        <div className="siteContainer">
          <Component {...pageProps} />
        </div>
        <Footer />
      </UserContext.Provider>
    </>
  );
};

export default App;

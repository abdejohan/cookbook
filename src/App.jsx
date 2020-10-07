import React from "react";
// eslint-disable-next-line no-unused-vars
import { withRoute, Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
// import Note from "./components/Note";

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" render={(props) => <Home props={props} />} />
        <Route
          exact
          path="/login"
          render={(props) => <Login props={props} />}
        />
        <Route
          exact
          path="/register"
          render={(props) => <Register props={props} />}
        />
      </Switch>
    </div>
  );
}

export default App;

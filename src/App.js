import React, { Component, useEffect, useState } from "react";
import ClippedAppBar from "./components/ClippedAppBar";
import TopAppBar from "./components/TopAppBar";
import Main from "./components/main";

import { withStyles } from "@material-ui/core";

const styles = theme => ({
  root:{
    width: "100%",
  },
  main:{

  }
});

export default function App() {
  //const classes = props;
  const classes = styles();

  return (
    <div className="App">
      <TopAppBar/>
      <Main className="main"/>
      
    </div>
  );
}

//export default withStyles(styles)(App);

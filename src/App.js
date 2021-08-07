import React, { Component, useEffect, useState } from "react";
import TopAppBar from "./components/TopAppBar";
import CalendarAnt from "./components/Calendar_Ant";

import { withStyles } from "@material-ui/core";

const styles = theme => ({
  root:{
    width: "100%",
  },
});

export default function App() {
  //const classes = props;
  const classes = styles();

  return (
    <div className="App">
      <TopAppBar/>
      <CalendarAnt/>
      
    </div>
  );
}

//export default withStyles(styles)(App);

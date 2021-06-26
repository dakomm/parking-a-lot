import React, { Component, useEffect, useState } from "react";
import ClippedAppBar from "./components/ClippedAppBar";
// import Main from "./components/main";

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
      <ClippedAppBar/>
      {/* <Main/> */}
      
    </div>
  );
}

//export default withStyles(styles)(App);

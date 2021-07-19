import React,{ useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button, IconButton, } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { green } from '@material-ui/core/colors';
import { Alert, Divider, Space, Select, Col, Row, message} from 'antd';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  AppBar: {
    backgroundColor : "green",
  },
  menuButton: {
    color: '#ffb10a',
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: '#ffb10a',
    fontWeight: 'bold',
  },
}));

const TopAppBar = () => {
  const classes = useStyles();
  const [user, setUser] = useState('DK');
  const [logIO, setLogIO] = useState('log in')

  const logInButtonClick = () => {
    console.log("HI")
    return; // 로그인창 띄우기
  }
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.AppBar}>
        <Toolbar >
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
          PARKING a LOT
          </Typography>
          <Button color="inherit" onClick={logInButtonClick}>{logIO}</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default (TopAppBar);
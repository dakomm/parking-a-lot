import React,{ useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import store from 'store';
import { AppBar, Toolbar, Typography, Button, IconButton, Snackbar, Grid, Slide } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import MuiAlert from '@material-ui/lab/Alert';
import { Modal, Input, Radio, Divider, Space, Select, Col, Row, message} from 'antd';
import { Button as ButtonA } from 'antd';
import { UserOutlined, EyeInvisibleOutlined, GoogleOutlined } from '@ant-design/icons';
import { authService, firebaseInstance } from "fbase";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function SlideTransition(props) {
  return <Slide {...props} direction="down"/>;
}

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
  onLogInButton: {
    color: '#ffb10a',
    borderColor: '#ffb10a',
    marginLeft: theme.spacing(1),
    padding : theme.spacing(1)
  }
}));

const TopAppBar = () => {
  const classes = useStyles();
  // const [user, setUser] = useState('');
  const [userName, setUserName] = useState('');
  const [userID, setUserID] = useState('');
  // const [logIO, setLogIO] = useState('log in');
  const [isLogInModalVisible, setIsLogInModalVisible] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openErrSnackbar, setOpenErrSnackbar] = useState(false);
  const [snackbarContent, setSnackbarContent] = useState('');
  const [errSnackbarContent, setErrSnackbarContent] = useState('');
  const [isOpenHistory, setIsOpenHistory] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isNewAccount, setIsNewAccount] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fbaseInit, setFbaseInit] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [radioValue, setRadioValue] = useState('Google');
  const [userObj, setUserObj] = useState(null)
  // let baseUrl = "http://localhost:8000"

  useEffect(()=> {
    authService.onAuthStateChanged((user) => {
      if(user){
        setIsLoggedIn(true);
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
        })
        store.dispatch({
          type: 'changeuser',
          user: user.displayName,
        });
      } else{
        setIsLoggedIn(false);
        setUserObj(null);
      }
      setFbaseInit(true); // TODO:firebase initializing ????????? true??? ??????. false??? ???????????? ??????????????? ???????????? ??????
    })
  },[])

  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
    });
    store.dispatch({
      type: 'changeuser',
      user: user.displayName,
    });
  };

  const onLogInButton = () => {
    if(isLoggedIn){
      // setUser(''); 
      setUserID('');
      authService.signOut();
      store.dispatch({
        type: 'changeuser',
        user: '',
      });
      setIsLogInModalVisible(false);
      setSnackbarContent('Logged Out!'); 
      setOpenSnackbar(true);
      setTimeout(()=>{setOpenSnackbar(false)},1800);
    }else {
      setIsLogInModalVisible(true);
    }
  }

  const onModalLogInButton = async(e) => {
    try{
      if(e === 'google'){
        await authService.signInWithPopup(new firebaseInstance.auth.GoogleAuthProvider());
        if(isNewAccount & userName !== null){
          await authService.currentUser.updateProfile({displayName: userName,});
        }
      } else if(e === 'email'){
          if(isNewAccount & userName !== null){
            await authService.createUserWithEmailAndPassword(email, password);
            await authService.currentUser.updateProfile({displayName: userName,});
          
          } else{
            await authService.signInWithEmailAndPassword(email, password);
          }
          // var chkUserResult = await ChkUserInfo(userID) // user ?????? ?????? false ??????
          // if(chkUserResult !== false){  // user ?????? ?????? ???
            // store.dispatch({
            //   type: 'changeuser',
            //   user: chkUserResult,
            // });
          // }else{                        // user ?????? ????????? ???
          //   setopenErrSnackbar(true);
          //   setErrSnackbarContent('Log In Failed : ?????? ????????? ???????????????. ??????:????????? ??????');
          //   setTimeout(()=>{setopenErrSnackbar(false)},6000);
          //   console.log("failed",chkUserResult, userID)
          // }
      }
      refreshUser();
      setIsLoggedIn(true);
      setIsLogInModalVisible(false);
      setSnackbarContent(authService.currentUser.displayName+'???, Welcome!');  
      setOpenSnackbar(true);
      setTimeout(()=>{setOpenSnackbar(false)},1800);
    }catch(error){
      setOpenErrSnackbar(true)
      setErrSnackbarContent(error.message); 
      setTimeout(()=>{setOpenErrSnackbar(false)},6000);
    }
  }

  const onInputChange = (e) => {
    const {target: {name, value}} = e
    if(name === "eMail"){
      setEmail(value);
    } else if(name === "password"){
      setPassword(value);
    } else if(name === "userName"){
      setUserName(value);
    }
  }
  const toggleModalLoginButton = () => setIsNewAccount((prev) => !prev);

  // const ChkUserInfo = async (id) => {
  //   const dbResult = await axios.post(baseUrl+'/api/membersinfo/chkuserinfo',
  //   {id: id}
  //   );
  //   console.log(dbResult.data)
  //   if(dbResult.data !== false){    // user ?????? ?????? ???
  //     return dbResult.data;
  //   }else{
  //     return false;
  //   }
  // }
  const radioOptions = [
    {label: 'Google', value: 'Google'},
    {label: 'E-Mail', value: 'eMail'},
  ];

  const LogInModalContent = () => {
    if(radioValue === 'Google'){return(
      <Grid container direction="column" alignItems="center">
        {isNewAccount? <Input placeholder="??????" value={userName} name="userName" onChange={onInputChange}required allowClear/> : null }<br/>
        <ButtonA name="google" onClick={()=>{onModalLogInButton('google')}} size="large" type="primary">{isNewAccount ? "Google??? ????????????" : "Google Log in"}</ButtonA>
      </Grid>
    )} else if(radioValue === 'eMail'){return(
      <Space direction="vertical">
        {isNewAccount? <Input placeholder="??????" value={userName} name="userName" onChange={onInputChange}required allowClear/> : null }
        <Input placeholder="E-Mail" value={email} name="eMail" onChange={onInputChange} prefix={<UserOutlined/>} required allowClear/>
        <Input.Password placeholder="????????????" value={password} name="password" onChange={onInputChange} onPressEnter={()=>{onModalLogInButton('email')}} prefix={<UserOutlined/>} required allowClear/>
      </Space>
    )}
  }
  const LogInModalFooter = () => {
    if(radioValue === 'eMail'){return([
      <Grid container direction="column" alignItems="center">
        <Button variant="outlined" autoFocus onClick={()=>{onModalLogInButton('email')}}>{isNewAccount ? "????????????" : "E-mail??? ?????????"}</Button>
        <Button size="small" onClick={()=>{toggleModalLoginButton()}}>{isNewAccount ? "??????????????? ??????" : "???????????????"}</Button>
      </Grid>
    ])} else if(radioValue === 'Google'){return([
      <Grid container direction="column" alignItems="center">
        <Button size="small" onClick={()=>{toggleModalLoginButton()}}>{isNewAccount ? "??????????????? ??????" : "???????????????"}</Button>
      </Grid>

    ])

    }else return null;
  }

  const createAccount = () => {

  }

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.AppBar}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
          PARKING a LOT
          </Typography>
          {userObj!==null ? <Button color="inherit">{userObj.displayName}</Button> : null}
          <Button variant="outlined" className={classes.onLogInButton} onClick={()=>{onLogInButton()}}>{isLoggedIn? "LOG OUT" : "LOG IN"}</Button>
        </Toolbar>
      </AppBar>

      <Modal 
        visible={isLogInModalVisible & !isLoggedIn} 
        onCancel={() => {setIsLogInModalVisible(false);}}
        width={'300px'}
        closable
        title={<Radio.Group options={radioOptions} onChange={(e)=>{setRadioValue(e.target.value)}} value={radioValue} optionType="button"/>}
        footer={LogInModalFooter()}
      >
        {LogInModalContent()}
      </Modal>

      <Snackbar open={openSnackbar}>
        <Alert severity="success" TransitionComponent={SlideTransition}>{snackbarContent}</Alert>
      </Snackbar>
      <Snackbar open={openErrSnackbar}>
        <Alert severity="success" TransitionComponent={SlideTransition}>{errSnackbarContent}</Alert>
      </Snackbar>
    </div>
  );
}

export default TopAppBar;
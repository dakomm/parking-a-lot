import React,{ useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button, IconButton, Snackbar, Grid, Slide } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import MuiAlert from '@material-ui/lab/Alert';
// import { green } from '@material-ui/core/colors';
import { Modal, Input, Divider, Space, Select, Col, Row, message} from 'antd';
import { UserOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

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
  logInButton: {
    color: '#ffb10a',
    borderColor: '#ffb10a',
    marginLeft: theme.spacing(1),
    padding : theme.spacing(1)
  }
}));

const TopAppBar = () => {
  const classes = useStyles();
  const [user, setUser] = useState('');
  const [userName, setUserName] = useState('');
  const [userID, setUserID] = useState('');
  const [logIO, setLogIO] = useState('log in');
  const [isLogInModalVisible, setIsLogInModalVisible] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openFailSnackbar, setOpenFailSnackbar] = useState(false);
  const [snackbarContent, setSnackbarContent] = useState('');
  const [isOpenHistory, setIsOpenHistory] = useState(false);

  // let baseUrl = "http://localhost:8000"

  const logInButton = () => {
    if(logIO === 'log in') setIsLogInModalVisible(true);
    if(logIO === 'log out') {
      setLogIO('log in');
      setUser(''); 
      setUserID('');
      // store.dispatch({
      //   type: 'changeuser',
      //   user: '',
      // });
      setOpenSnackbar(true);
      setTimeout(()=>{setOpenSnackbar(false)},1800);
      setSnackbarContent('Logged Out!');  
    }
  }
  const modalLogInButton = async () => {  // 로그인 창에서 login 버튼 클릭 시
    // var chkUserResult = await ChkUserInfo(userID) // user 이름 또는 false 리턴
    // if(chkUserResult !== false){  // user 정보 일치 시
      // store.dispatch({
      //   type: 'changeuser',
      //   user: chkUserResult,
      // });
      setIsLogInModalVisible(false);
      setLogIO('log out');
      // setSnackbarContent(chkUserResult+'님, Welcome!');  
      setOpenSnackbar(true);
      setTimeout(()=>{setOpenSnackbar(false)},1800);
    // }else{                        // user 정보 불일치 시
    //   setOpenFailSnackbar(true);
    //   setTimeout(()=>{setOpenFailSnackbar(false)},6000);
    //   console.log("failed",chkUserResult, userID)
    // }
  }

  const onNameChange = (e) => {
    setUserName(e.target.value)
  }
  const onIDChange = (e) => {
    setUserID(e.target.value)
  }

  // const ChkUserInfo = async (id) => {
  //   const dbResult = await axios.post(baseUrl+'/api/membersinfo/chkuserinfo',
  //   {id: id}
  //   );
  //   console.log(dbResult.data)
  //   if(dbResult.data !== false){    // user 정보 일치 시
  //     return dbResult.data;
  //   }else{
  //     return false;
  //   }
  // }

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.AppBar}>
        <Toolbar >
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
          PARKING a LOT
          </Typography>
          <Button color="inherit">{user}</Button>
          <Button variant="outlined" className={classes.logInButton} onClick={()=>{logInButton()}}>{logIO}</Button>
        </Toolbar>
      </AppBar>

      <Modal 
        visible={isLogInModalVisible & (logIO === 'log in')} 
        onCancel={() => {setIsLogInModalVisible(false);}}
        width={'250px'}
        closable
        footer={[
          <Grid container direction="column" alignItems="center">
            <Button type="primary" autoFocus onClick={()=>{modalLogInButton()}}>Log In</Button>
          </Grid>
          ]}
      >
        <Space direction="vertical"><br/>
          <Input placeholder="이름" value={userName} onChange={onNameChange} prefix={<UserOutlined/>} required allowClear/>
          <Input.Password placeholder="사번" value={userID} onChange={onIDChange} onPressEnter={()=>{modalLogInButton()}} prefix={<UserOutlined/>} required allowClear/>
        </Space>
      </Modal>

      <Snackbar open={openSnackbar}>
        <Alert severity="success" TransitionComponent={SlideTransition}>{snackbarContent}</Alert>
      </Snackbar>
      <Snackbar open={openFailSnackbar}>
        <Alert severity="success" TransitionComponent={SlideTransition}>Log In Failed : 입력 정보를 확인하세요. 문의:김다경 연구</Alert>
      </Snackbar>
    </div>
  );
}

export default (TopAppBar);
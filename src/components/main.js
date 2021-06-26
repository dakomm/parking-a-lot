import React, { Component, useEffect, useState } from "react";
import { withStyles } from "@material-ui/core";
import {
    Button, InputAdornment , Grid, TextField, Fab,
    Dialog, DialogActions, DialogContent, DialogTitle,
  } from "@material-ui/core";
import MaterialUIPickers from "./DatePicker";
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import { Calendar, momentLocalizer } from 'react-big-calendar'
//import BigCalendar from 'react-big-calendar';
import moment from 'moment'
import events from './events';

//import DatePicker, { registerLocale } from "react-datepicker";
// registerLocale("ko", ko);
// import getYear from "date-fns/getYear";
// import getMonth from "date-fns/getMonth";

moment.locale('ko');
const localizer = momentLocalizer(moment)

const styles = theme => ({
    root:{
        position: "relative",
      width: "100%",
      marginTop: "20px",
      marginLeft:"240px",
    },
    BigCalendar:{

    },


});

const Main = (props) => {
    const {classes} = props;

    useEffect(() => {

    }, []);

    return(
      <main>

        <Toolbar />
        {/* <Drawer variant="permanent" className="fakeDrawer" classes={{paper: classes.drawerPaper,}}/> */}
        <Typography paragraph>
          ▶ 초록색 날짜를 클릭하여 주차권을 찜하세요!
        </Typography>


        <Calendar
        className="BigCalendar"
        localizer={localizer}
        events= {events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        />
        {/* TODO : <DatePicker/> */}
        {/* TODO : 하루만 체크박스 */}
        {/* TODO : 확정/취소/에러 시 alert 추가 */}
      </main>
    );
}

export default withStyles(styles)(Main);
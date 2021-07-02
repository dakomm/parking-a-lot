import React, { Component, useEffect, useState } from "react";

import CalendarAnt from "./Calendar_Ant";

import { withStyles } from "@material-ui/core";
import {
    Button, InputAdornment , Grid, TextField, Fab,
    Dialog, DialogActions, DialogContent, DialogTitle,
  } from "@material-ui/core";
import MaterialUIPickers from "./DatePicker";
import Typography from '@material-ui/core/Typography';

import { Calendar, momentLocalizer } from 'react-big-calendar'
import BigCalendar from 'react-big-calendar';
import moment from 'moment'
import events from './events';
import "react-big-calendar/lib/css/react-big-calendar.css";


// import 'antd/dist/antd.css';
// import { Calendar, Badge } from 'antd';

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
    events: {
          margin: 0,
          padding: 0,
          listStyle: 'none',
    },
    badge: {
          width: '100%',
          overflow: 'hidden',
          fontSize: '12px',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
    }

});

const Main = (props) => {
    const {classes} = props;

    useEffect(() => {

    }, []);

    return(
      <main>
        

        {/* <Calendar
        className="BigCalendar"
        localizer={localizer}
        events= {events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        /> */}

        <CalendarAnt/>

{/* 
        <Calendar dateCellRender={dateCellRender} />,
        document.getElementById('container'), */}

{/* https://fullcalendar.io/docs/month-view */}

        {/* TODO : <DatePicker/> */}
        {/* TODO : 하루만 체크박스 */}
        {/* TODO : 확정/취소/에러 시 alert 추가 */}
      </main>
    );
}

export default withStyles(styles)(Main);

// function getListData(value) {
//     let listData;
//     switch (value.date()) {
//         case 8:
//         listData = [
            
//             { type: 'success', content: 'This is usual event.' },
//         ];
//         break;
//         case 10:
//         listData = [
            
//             { type: 'success', content: 'This is usual event.' },
//             { type: 'error', content: 'This is error event.' },
//         ];
//         break;
//         case 15:
//         listData = [
//             { type: 'warning', content: 'This is warning event' },
            
//         ];
//         break;
//         default:
//     }
//     return listData || [];
//     }

//     function dateCellRender(value) {
//     const listData = getListData(value);
//     return (
//         <ul className="events">
//         {listData.map(item => (
//             <li key={item.content}>
//             <Badge className="badge" status={item.type} text={item.content} />
//             </li>
//         ))}
//         </ul>
//     );
//     }
import React, { Component, useEffect, useState } from "react";
import { makeStyles, fade, rgbToHex } from '@material-ui/core/styles';
import { Calendar, Alert, List, Layout, Select, Radio, Col, Row, Typography, Button, Badge} from 'antd';
import moment from 'moment';
import 'moment/locale/ko';
import './Calendar_Ant.css'
import 'antd/dist/antd.css';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    }
}));


const CalendarAnt = () => {
    const classes = useStyles();
    const [date, setDate] = useState(moment());
    const [event, setEvent] = useState('');
    const [badgeType, setBadgeType] = useState('');

    useEffect(() => {
    
    },[]);

    const changeDate = (value)=>{   //onSelect
        setDate(value);
        // 2017-01-25처럼 표시 : selectedValue && selectedValue.format('YYYY-MM-DD')
    }
    
    function dateCellRender(value) {
        const listData = getListData(value);
        for(let i=0; i<listData.length; i++){
            if( listData[i].date === value.format('YYYY-MM-DD') ){
                if(listData[i].getter === ''){
                    return <Button type="primary" shape="round" size="small">
                            {listData[i].giver}</Button> 
                }
                else{ return <Button type="dashed" shape="round" size="small" disabled>
                            {listData[i].giver}→{listData[i].getter}</Button>};
                // if 화면 size small -> return (<Badge status={'success'}/>) ;
                // setBadgeType('success');    // 초기화하는 로직 추가 필요
                // cardLeft = true;
            } 
        }
        return;
      };

      const getListData = (value) => {
        let listData;
        listData = [
            {id:'0', date: '2021-07-21', giver: 'DK', getter: ''},
            {id:'1', date: '2021-07-01', giver: 'AA', getter: 'BBB'},
        ];
        // <List
        //     className="getListData"
        //     // loading={initLoading}
        //     itemLayout="horizontal"
        //     bordered
        //     // loadMore={loadMore}
        //     dataSource={listData}
        //     renderItem={item => 
                
                
        //         <List.Item actions={[<a key="give">Give</a>, <a key="get">Get</a>]}>
        //            {/* <List.Item.Meta title={<a>{item.giver}</a>}/> */}
        //            {item}
        //         </List.Item>
        //     }
        // />
        return (listData || []);
      }

    return(
        <div className="site-calendar-customize-header-wrapper">
        <Calendar
          fullscreen={true}
          headerRender={({ value, type, onChange, onTypeChange }) => {
            const start = 0;
            const end = 11;
            const monthOptions = [];
    
            const current = value.clone();
            const localeData = value.localeData();
            const months = [];
            for (let i = 0; i < 12; i++) {
              current.month(i);
              months.push(localeData.monthsShort(current));
            }
    
            for (let index = start; index < end; index++) {
              monthOptions.push(
                <Select.Option className="month-item" key={`${index}`}>
                  {months[index]}
                </Select.Option>,
              );
            }
            const month = value.month();
            const year = value.year();
            const options = [];
            for (let i = year - 10; i < year + 10; i += 1) {
              options.push(
                <Select.Option key={i} value={i} className="year-item">
                  {i}
                </Select.Option>,
              );
            }
            
            return (
              <div style={{ padding: 8 }}>
                <Row gutter={8}>    {/* Year, Month Row의 Padding값(px) */}
                  <Col>
                    <Select
                      size="small"
                      dropdownMatchSelectWidth={false}
                      className="my-year-select"
                      onChange={newYear => {
                        const now = value.clone().year(newYear);
                        onChange(now);
                      }}
                      value={String(year)}
                    >
                      {options}
                    </Select>
                  </Col>
                  <Col>
                    <Select
                      size="small"
                      dropdownMatchSelectWidth={false}
                      value={String(month)}
                      onChange={selectedMonth => {
                        const newValue = value.clone();
                        newValue.month(parseInt(selectedMonth, 10));
                        onChange(newValue);
                      }}
                    >
                      {monthOptions}
                    </Select>
                  </Col>
                  <Col>
                    <Button ghost
                        type="primary" 
                        size="small"
                        onClick={()=>{changeDate(moment());}} // selectable calendar 참고
                    >
                        Today
                    </Button>
                  </Col>
                </Row>
              </div>
            );
          }}
          
          value={moment(date)} 
          onSelect={changeDate}
          dateCellRender={dateCellRender}

        />
      </div>
    )

}

export default (CalendarAnt);

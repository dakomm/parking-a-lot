import React, { Component, useEffect, useState } from "react";
import { makeStyles, fade, rgbToHex } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { Calendar, Modal, Alert, List, Divider, Space, Select, Radio, Col, Row, Typography, Button, Badge, Popover} from 'antd';
import moment from 'moment';
import 'moment/locale/ko';
import './Calendar_Ant.css'
import 'antd/dist/antd.css';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}));


const CalendarAnt = () => {
    const classes = useStyles();
    const [user, setUser] = useState('DK');
    const [date, setDate] = useState(moment());
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [buttonClicked, setButtonClicked] = useState(false);
    const [dateClicked, setDateClicked] = useState();
    const [listData, setListData] = useState([
        {id:0, date: '2021-07-21', giver: 'DK', getter: ''},
        {id:1, date: '2021-07-01', giver: 'AA', getter: 'BBB'},
        {id:2, date: '2021-07-05', giver: 'CC', getter: ''},
    ]);

    useEffect(() => {
       
       console.log('click')
    },onclick);

    async function onDateSelect  (value){   //onSelect
        setDate(value);  // 2017-01-25처럼 표시 : selectedValue && selectedValue.format('YYYY-MM-DD')
        console.log('현재 t/f?',{buttonClicked})
        await setButtonClicked;
        console.log('현재 t/f?',{buttonClicked})
        if (buttonClicked === true){
            console.log('buttonClicked');
            setButtonClicked(false);
        }
        else if(buttonClicked === false){
            console.log('dateSelected')
            setIsModalVisible(true);
        }
    }

    //TODO: 
    //1. popOver 말고 버튼 툴팁으로 DK에게 빌려주려면 더블클릭 이라고 띄우는 방법
    //2. 셀 클릭 시 모달 띄우기...셀은 더블클릭 감지할 수 없음..
    //3. 정 안되면 등록 모드 만들기

    const handleCancel = () => {setIsModalVisible(false);};

    const handleGet = (date) => {
        setIsModalVisible(false);   //빌려주세요 버튼 클릭 시 모달 닫기
        setListData([...listData, {id:listData.length, date:date, giver:'',getter:user}]);
        
    };
    const handleGive = (date) => {
        setIsModalVisible(false);
        setListData([...listData, {id:listData.length, date:date, giver:user, getter:''}]);
    };

    function dateCellRender(value) {
        // const listData = getListData(value);
        for(let i=0; i<listData.length; i++){
            if( listData[i].date === value.format('YYYY-MM-DD') ){
                if(listData[i].getter === ''){
                    let onClickMsg = "From : " + listData[i].giver;
                    return  <Popover 
                                title={onClickMsg}  
                                content={<Grid container direction="column" alignItems="center">
                                    <Button shape="round">받기</Button>
                                </Grid>}
                                overlayStyle={{width: "120px"}}
                            >
                                <Button type="primary" shape="round" size="small">{listData[i].giver}</Button> 
                            </Popover>
                }
                else if(listData[i].giver === ''){
                    let onClickMsg = "To : " + listData[i].getter;
                    return  <Popover 
                                // style={{pointerEvents: "none", cursor: "none"}}
                                title={onClickMsg}  
                                content={<Grid container direction="column" alignItems="center">
                                    <Button shape="round" onClick={()=>{setButtonClicked(true);console.log('set true')}}>주기</Button>
                                </Grid>}
                                overlayStyle={{width: "120px"}}
                            >
                                <Button type="primary" shape="round" size="small" danger onClick={()=>{setButtonClicked(true)}}>{listData[i].getter}</Button> 
                            </Popover>
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
                        onClick={()=>{setDate(moment());}} // selectable calendar 참고
                    >
                        Today
                    </Button>
                  </Col>
                </Row>
              </div>
            );
          }}
          value={moment(date)} 
          onSelect={(value)=>{onDateSelect(value); console.log('onSelect 됨')}}
          dateCellRender={dateCellRender}
          zIndex={0}
        />

        <Modal 
            // title={date.format('YYYY-MM-DD')}
            visible={isModalVisible} 
            // onOk={handleOk} 
            onCancel={handleCancel}
            width={'250px'}
            closable
            footer={[
                <Grid container justify="space-around">
                <Button key="get" type="primary" danger onClick={()=>{handleGet(date.format('YYYY-MM-DD'))}}>
                    빌려주세요
                </Button>
               <Button key="give" type="primary" onClick={()=>{handleGive(date.format('YYYY-MM-DD'))}}>
                    빌려주기
                </Button>
                </Grid>
              ]}
        >{date.format('YYYY-MM-DD')}</Modal>


      </div>
    )
}

export default (CalendarAnt);

import React, { Component, useEffect, useState } from "react";
import { makeStyles, fade, rgbToHex } from '@material-ui/core/styles';
import { Grid, GridList, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText} from '@material-ui/core';
import { Calendar, Modal, Alert, List, Divider, Space, Select, Radio, Col, Row, Typography, Button, Badge, Popover, message} from 'antd';
import moment from 'moment';
import 'moment/locale/ko';
import './Calendar_Ant.css'
import 'antd/dist/antd.css';
import userEvent from "@testing-library/user-event";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));


const CalendarAnt = () => {
  const classes = useStyles();
  const [user, setUser] = useState('KDK'); //로그인 user state
  const [date, setDate] = useState(moment());
  const [isModalVisible, setIsModalVisible] = useState(false); //더블 클릭 시 Modal 띄우기, 닫기
  const [dialogOpen, setDialogOpen] = useState(false); // 받기/주기 popover 클릭 시 confirm 창 띄우기
  const [dateClicked, setDateClicked] = useState(false); //더블 클릭 시 Modal 띄우기 위해
  const [dialogMsg, setDialogMsg] = useState(''); // 받기/주기 popover 클릭 시 confirm용 메시지
  const [selectedID, setSelectedID] = useState(); // 받기/주기 popover 클릭 시 해당 ID state
  const [listData, setListData] = useState([
    {id:0, date: '2021-07-21', giver: 'DK', getter: ''},
    {id:1, date: '2021-07-01', giver: 'AA', getter: 'BBB'},
    {id:2, date: '2021-07-05', giver: 'CC', getter: ''},
    {id:3, date: '2021-07-05', giver: 'DD', getter: ''},
  ]);

  useEffect(() => {
    console.log(listData);
  },[listData]);

  function onDateSelect  (value){   //onSelect
    setDate(value);  // 2017-01-25처럼 표시 : selectedValue && selectedValue.format('YYYY-MM-DD')        
    if(dateClicked){
      setIsModalVisible(true);
      setDateClicked(false);
    } 
    setDateClicked(true);
    setTimeout(() => setDateClicked(false), 200);
  }

  const handleGet = (date) => {
    setIsModalVisible(false);   //빌려주세요 버튼 클릭 시 모달 닫기
    setListData([...listData, {id:listData.length, date:date, giver:'',getter:user}]);
  };
  const handleGive = (date) => {
    setIsModalVisible(false);
    setListData([...listData, {id:listData.length, date:date, giver:user, getter:''}]);
  };

  const handleMatch = (id)=> {
      if(listData[id].getter === ''){
        setDialogMsg(listData[id].giver + "님의 주차권을 빌리실래요?");
        setSelectedID(id);
        // setListData(listData.map(item=> item.id === id ? ({...item, getter : user}): item))
      }
      else if(listData[id].giver === ''){
        setDialogMsg(listData[id].getter + "님에게 주차권을 빌려주실래요?");
        setSelectedID(id);
      }
  };

  const dateFilteredList = (date) => {
    return listData.filter((e => e.date === date));
  }

  function dateCellRender(value) {
    // const listData = getListData(value);

    //TODO: 한 셀에 여러 버튼 생성 시 맨처음 한개만 생성되는 문제 해결
    let onHoverMsg = ''
    let GiveOrGet = ''
    let buttonType = ''

    for(let i=0; i<listData.length; i++){
      
      if( listData[i].date === value.format('YYYY-MM-DD')){
        
        if(listData[i].getter === ''){
          onHoverMsg = "From : " + listData[i].giver;
          GiveOrGet = '받기';
          buttonType = <Button type="primary" shape="round" size="small" style={{margin:3}}>{listData[i].giver}</Button>;
        }
        else if(listData[i].giver === ''){
          onHoverMsg = "To : " + listData[i].getter;
          GiveOrGet = '주기';
          buttonType = <Button type="primary" shape="round" size="small" danger style={{margin:3}}>{listData[i].getter}</Button>;
          // return<Popover 
          //         // style={{pointerEvents: "none", cursor: "none"}}
          //         title={onHoverMsg}  
          //         content={<Grid container direction="column" alignItems="center">
          //           <Button shape="round" onClick={()=>{setDialogOpen(true); handleMatch(listData[i].id);}}>{GiveOrGet}</Button>
          //         </Grid>}
          //         overlayStyle={{width: "120px"}}
          //       >
          //         {buttonType}
          //       </Popover>
        }
        else{ 
          buttonType = <Button type="dashed" shape="round" size="small" disabled style={{margin:3}}>
                        {listData[i].giver}→{listData[i].getter}</Button>};

        return(<ul style={{listStyle:"none", paddingLeft:"0px"}}>{dateFilteredList(listData[i].date).map(item => (
          <li key={item.id}>
            <Popover 
              title={onHoverMsg}  
              content={<Grid container direction="column" alignItems="center">
                <Button shape="round" onClick={()=>{setDialogOpen(true);handleMatch(listData[i].id);}}>{GiveOrGet}</Button>
              </Grid>}
              overlayStyle={{width: "120px"}}
            >
              {buttonType}
            </Popover>
          </li>))}
        </ul>)

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
      title={date.format('YYYY-MM-DD')}
      visible={isModalVisible} 
      onCancel={() => {setIsModalVisible(false);}}
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
    >
      {listData.map(e=>{
        if( e.date === date.format('YYYY-MM-DD') ){
          if(e.getter === ''){
            let onHoverMsg = "From : " + e.giver;
            return<Popover 
                    title={onHoverMsg}  
                    content={<Grid container direction="column" alignItems="center">
                      <Button shape="round" onClick={()=>{setDialogOpen(true);handleMatch(e.id);}}>받기</Button>
                    </Grid>}
                    overlayStyle={{width: "120px"}}
                  >
                    <Button type="primary" shape="round" size="small" style={{margin:3}}>{e.giver}</Button>
                  </Popover>
          }
          else if(e.giver === ''){
            let onHoverMsg = "To : " + e.getter;
            return<Popover 
                    // style={{pointerEvents: "none", cursor: "none"}}
                    title={onHoverMsg}  
                    content={<Grid container direction="column" alignItems="center">
                      <Button shape="round" onClick={()=>{setDialogOpen(true); handleMatch(e.id);}}>주기</Button>
                    </Grid>}
                    overlayStyle={{width: "120px"}}
                  >
                    <Button type="primary" shape="round" size="small" danger style={{margin:3}}>{e.getter}</Button> 
                  </Popover>
          }
          else{ return <Button type="dashed" shape="round" size="small" disabled>
                      {e.giver}→{e.getter}</Button>};
          // if 화면 size small -> return (<Badge status={'success'}/>) ;
          // setBadgeType('success');    // 초기화하는 로직 추가 필요
          // cardLeft = true;
        }
      })}
    </Modal>

    <Dialog open={dialogOpen} onClose={()=>{setDialogOpen(false)}} aria-describedby="alert-dialog-description" aria-labelledby="alert-dialog-title">
      <DialogTitle id="alert-dialog-title">{dialogMsg}</DialogTitle>
      <DialogActions>
        <Button color="primary" autoFocus
          onClick={()=>{
            setDialogOpen(false); 
            if(listData[selectedID].getter === ''){
              setListData(listData.map(item=> item.id === selectedID ? ({...item, getter : user}): item))
            }
            else if(listData[selectedID].giver === ''){
              setListData(listData.map(item=> item.id === selectedID ? ({...item, giver : user}): item))
            }
          }}
        > 네! </Button>
        <Button onClick={()=>{setDialogOpen(false)}}>됐어요</Button>
      </DialogActions>
    </Dialog>
    </div>
  )
}

export default (CalendarAnt);

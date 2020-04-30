import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Box } from '@material-ui/core';
import { clothesdetailjsx } from '../css/useStyles';

import 'react-alice-carousel/lib/alice-carousel.css';
import Carousel from '../components/Carousel';
import { Redirect } from 'react-router-dom';

export default function ClothesDetail(props) {
  const styles = clothesdetailjsx();
  const [subscribe, setSubscribe] = useState([]);
  const [nextSubscribe, setNextSubscribe] = useState([]);

  useEffect(() => {
    const url = process.env.REACT_APP_URL + '/clothes-resv'
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.token,
      }
    };
    axios.get(url, config).then((res) => {
      console.log(res.data, '1, clothes_item_id, 예약된 날짜!');
      const thisData = [];
      const nextData = [];
      const thisWeek = new Date();
      const nextWeek = new Date();
      thisWeek.setDate(thisWeek.getDate() - thisWeek.getDay())
      nextWeek.setDate(nextWeek.getDate() + 7 - nextWeek.getDay())

      res.data.forEach((data)=> {
        const curWeek  = new Date(data.reserved_date);
        // console.log(data.reserved_date, curWeek)
        if (curWeek.getFullYear() == thisWeek.getFullYear() && curWeek.getMonth() == thisWeek.getMonth() && curWeek.getDate() == thisWeek.getDate()){
          thisData.push(data)
        } else if (curWeek.getFullYear() == nextWeek.getFullYear() && curWeek.getMonth() == nextWeek.getMonth() && curWeek.getDate() == nextWeek.getDate()){
          nextData.push(data)
        }
      })
      console.log("thisData", thisData, "nextData", nextData )
      setSubscribe(thisData);
      setNextSubscribe(nextData);
    })
  }, [])

  return (
    <Card className={styles.root}>
      <Box border={2} borderRadius={5} className={styles.paper}>
      <p style={{ fontSize: 30, marginTop: 10, marginLeft: 10 }}>구독 중인 목록</p>
        {subscribe.length > 0 ? <Carousel imgList={subscribe}></Carousel> : null}
      </Box>
      <Box border={2} borderRadius={5} className={styles.paper}>
      <p style={{ fontSize: 30, marginTop: 10, marginLeft: 10 }}>구독 할 목록</p>
        {nextSubscribe.length > 0 ? <Carousel imgList={nextSubscribe}></Carousel> : null}
      </Box>
    </Card>
  );
}
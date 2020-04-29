import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Box } from '@material-ui/core';
import { clothesdetailjsx } from '../css/useStyles';

import 'react-alice-carousel/lib/alice-carousel.css';
import Carousel from '../components/Carousel';

export default function ClothesDetail(props) {
  const styles = clothesdetailjsx();
  const [subscribe, setSubscribe] = useState([]);

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
      setSubscribe(res.data);
    })
  }, [])

  return (
    <Card className={styles.root}>
      <Box border={2} borderRadius={5} className={styles.paper}>
      <p style={{ fontSize: 30, marginTop: 10, marginLeft: 10 }}>구독 중인 목록</p>
        <Carousel imgList={subscribe}></Carousel>
      </Box>
    </Card>
  );
}
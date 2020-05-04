import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import {
  Card, Box, GridList, GridListTile } from '@material-ui/core';
import { clothesdetailjsx } from '../css/useStyles'
import QueueArim from 'rc-queue-anim';
import LoyaltyIcon from '@material-ui/icons/Loyalty';

const baseURL = process.env.REACT_APP_URL
const baseAIUrl = process.env.REACT_APP_AI_URL

export default function ClothesDetail(props) {
  const styles = clothesdetailjsx();

  const [recommend, setRecommend] = useState([]);
  const [neighborList, setNeighborList] = useState([]);
  const [totalList, setTotalList] = useState([]);

  useEffect(() => {
    const url = baseURL + '/clothes/wish-list'
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.token,
      }
    };
    axios.get(url, config).then((res) => {
      console.log(res.data, '위시결과데이터');
      setRecommend(res.data);
    })
  }, [])

  useEffect(() => {
    const url = baseAIUrl + '/recommand/user'
    axios.post(url, {
      "user_email": localStorage.email
    }).then((res) => {
      const NRI = res.data.neighbor_recommand_images;
      const resNeighborList = Object.keys(NRI).map((key) => ({
        id: key,
        img: NRI[key]
      }));

      const TRI = res.data.total_recommand_images;
      const resTotalList = Object.keys(TRI).map((key) => ({
        id: key,
        img: TRI[key]
      }))

      setNeighborList(resNeighborList)
      setTotalList(resTotalList)
    })
  }, [])


  return (
    <Card className={styles.root}>
      <QueueArim type={['right', 'left']} interval={[200, 300]}
          delay={[0, 1000]} duration={[3000, 5000]}
          ease={['easeOutBack', 'easeInOutCirc']} leaveReverse>
      <Box key="1" border={2} borderRadius={5} className={styles.paper}>
        <p style={{ fontSize: 30, marginTop: 10, marginLeft: 10, marginBottom: 20 }}>위시리스트</p>
        <Box border={2} borderRadius={5} className={styles.paper} style={{ marginBottom: 50 }}>
          <GridList className={styles.gridList} cols={4} cellHeight={250}>
            {recommend && (recommend.map((item, i) => (
              <GridListTile key={i} height="300px">
                <Link to={`/clothesdetail/?clothes_item_id=${item.clothes_item_id}`}>
                  <img alt="" src={item.img} width='100%' />
                </Link>
              </GridListTile>
            )))}
          </GridList>
        </Box>
        <p style={{ fontSize: 30, marginTop: 10, marginLeft: 10, marginBottom: 20 }}>팔로잉 유저 추천</p>
        <Box key="2" border={2} borderRadius={5} className={styles.paper} style={{ marginBottom: 50 }}>
          <GridList className={styles.gridList} cols={4} cellHeight={250}>
            {neighborList && (neighborList.map((item, i) => (
              <GridListTile key={i} height="300px" style={{position:'relative'}}>
                <Link to={`/clothesdetail/?clothes_item_id=${item.id}`}>
                  <img alt="" className="imgCard" src={item.img} height="100%" />
                  <span className="similarTag" 
                  style={{position:'absolute', top:'0', left:'0', color:'violet'}}>
                  <LoyaltyIcon></LoyaltyIcon></span>
                </Link>
              </GridListTile>
            )))}
          </GridList>
        </Box>
        <p style={{ fontSize: 30, marginTop: 10, marginLeft: 10, marginBottom: 20 }}>AI 맞춤 추천</p>
        <Box key="3" border={2} borderRadius={5} className={styles.paper}>
        <GridList className={styles.gridList} cols={4} cellHeight={250}>
            {totalList && (totalList.map((item, i) => (
              <GridListTile key={i} height="300px">
                <Link to={`/clothesdetail/?clothes_item_id=${item.id}`}>
                  <img alt="" src={item.img} height="100%" />
                </Link>
              </GridListTile>
            )))}
          </GridList>
        </Box>
      </Box>
      </QueueArim>
    </Card >
  );
}
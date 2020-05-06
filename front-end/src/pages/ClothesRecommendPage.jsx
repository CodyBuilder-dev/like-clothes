import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios'
import {
  Card, Box, GridList, GridListTile } from '@material-ui/core';
  import LoyaltyIcon from '@material-ui/icons/Loyalty';
import { clothesdetailjsx } from '../css/useStyles'
import QueueArim from 'rc-queue-anim';
import { HashLoader } from "react-spinners";
import { css } from "@emotion/core";

const override = css`
  display: block:
  margin: 0 auto:
  border-color: red:
  `;

const baseURL = process.env.REACT_APP_URL
const baseAIUrl = process.env.REACT_APP_AI_URL

export default function ClothesDetail() {
  const styles = clothesdetailjsx();

  const [recommend, setRecommend] = useState([]);
  const [totalList, setTotalList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const url = baseURL + '/clothes/wish-list'
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.token,
      }
    };
    axios.get(url, config).then((res) => {
      if (res.data === "You\'re not logged in") {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        localStorage.removeItem('nickname');
        localStorage.removeItem('isAuthenticated');
        alert('로그인 해 주세욧 >_');
        window.location.href="/"
      }
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
      return {resNeighborList, resTotalList};
    }).then((res) => {
      const tagList = taggingList(res.resNeighborList);
      const mapList = mappingList(res.resTotalList);
      const totalList = tagList.concat(mapList);
      const lastList = shuffle(totalList);
      setTotalList(lastList);
      setIsLoading(false);
    })
  }, [])

  const taggingList = (neighborList) => (
    neighborList.map((item, i) => (
      <span to={`/clothesdetail/?clothes_item_id=${item.id}`} key={i} style={{position:'relative'}}>
        <img alt="" src={item.img} height="300px" width="300px" style={{margin: '5px'}} />
        <span className="similarTag" 
          style={{position:'absolute', top:'-290px', left:'7px', color:'violet'}}>
        <LoyaltyIcon></LoyaltyIcon></span>
      </span>
    ))
  )

  const mappingList = (totalList) => (
    totalList && (totalList.map((item, i) => (
        <span key={i} to={`/clothesdetail/?clothes_item_id=${item.id}`}>
          <img alt="" src={item.img} height="300px" width="260px" style={{margin: '5px'}} />
        </span>
    )))
  )

  const shuffle = (arr) => {
    var i,
        j,
        temp;
    for (i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr;
  }

  return (
    <Card className={styles.root}>
      <QueueArim type={['right', 'left']} interval={[200, 300]}
          delay={[0, 1000]} duration={[3000, 5000]}
          ease={['easeOutBack', 'easeInOutCirc']} leaveReverse>
      <Box key="1" border={2} borderRadius={5} className={styles.paper}>
        <p style={{ fontSize: 30, marginTop: 10, marginLeft: 10, marginBottom: 20 }}>내 위시리스트 ♡</p>
        <Box border={2} borderRadius={5} className={styles.paper} style={{ marginBottom: 50 }}>
          <GridList className={styles.gridList} cols={4} cellHeight={250}>
            {recommend && (recommend.map((item, i) => (
              <GridListTile key={i} height="300px">
                <NavLink to={`/clothesdetail/?clothes_item_id=${item.clothes_item_id}`}>
                  <img alt="" src={item.img} width='100%' />
                </NavLink>
              </GridListTile>
            )))}
          </GridList>
        </Box>
        <p style={{ fontSize: 30, marginTop: 10, marginLeft: 10, marginBottom: 20 }}>욧's Pick! 당신을 위한 맞춤 추천</p>
        <Box border={2} borderRadius={5} className={styles.paper} style={{ marginBottom: 50 }}>
          {isLoading ? <div style={{margin: '50px 45%'}}><HashLoader css={override} size={100} color={"red"} loading={isLoading}></HashLoader></div>
          :
          <div>
            <div style={{textAlign:'right', margin:'5px'}}>
            <span style={{color:"violet", marginBottom:'10px'}}><LoyaltyIcon style={{ height:'20px', width:'20px', marginRight:'5px' }}></LoyaltyIcon></span> 
            표시가 있는 옷은 나와 성향이 비슷한 사람들이 관심 가지던 옷이에요</div>
            <span height={300}>
              {totalList && (totalList.map((item) => (
                item
              )))}
            </span>
          </div>
          }
        </Box>
      </Box>
      </QueueArim>
    </Card >
  );
}
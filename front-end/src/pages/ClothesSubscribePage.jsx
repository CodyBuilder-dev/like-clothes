import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Box } from '@material-ui/core';
import { clothesdetailjsx } from '../css/useStyles';

import 'react-alice-carousel/lib/alice-carousel.css';
import Carousel from '../components/Carousel';
import QueueArim from 'rc-queue-anim';

const Subs = '/assets/Subs.png'

const url = process.env.REACT_APP_URL + '/clothes-resv'
// const config = {
//   headers: {
//     "Content-Type": "application/json",
//     "Authorization": localStorage.token,
//   }
// };

export default function ClothesDetail(props) {
  const styles = clothesdetailjsx();
  const [subscribe, setSubscribe] = useState([]);
  const [nextSubscribe, setNextSubscribe] = useState([]);

  const [update, setUpdate] = useState(false);

  useEffect(() => {
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
      const thisData = [];
      const nextData = [];
      const thisWeek = new Date();
      const nextWeek = new Date();
      thisWeek.setDate(thisWeek.getDate() - thisWeek.getDay())
      nextWeek.setDate(nextWeek.getDate() + 7 - nextWeek.getDay())

      res.data.forEach((data) => {
        const curWeek = new Date(data.reserved_date);
        if (curWeek.getFullYear() === thisWeek.getFullYear() && curWeek.getMonth() === thisWeek.getMonth() && curWeek.getDate() === thisWeek.getDate()) {
          thisData.push(data)
        } else if (curWeek.getFullYear() === nextWeek.getFullYear() && curWeek.getMonth() === nextWeek.getMonth() && curWeek.getDate() === nextWeek.getDate()) {
          nextData.push(data)
        }
      })
      setSubscribe(thisData);
      setNextSubscribe(nextData);
    })
  }, [update])

  const handleImgDelete = (i) => {
    const params = { 'user_reservation_id': nextSubscribe[i].id }
    const headers = {
      "Authorization": localStorage.token,
    }
    axios.delete(url, { params, headers, data: params })
      .then((res) => {
        setUpdate(!update);
        setNextSubscribe([]);
      })
  }

  function formatDate(date) {
    var mymonth = date.getMonth() + 1;
    var myweekday = date.getDate();
    return (mymonth + "/" + myweekday);
  }

  function printWeek(flag) {
    var now = new Date();
    if (!flag) {
      var dayOfMonth = now.getDate();
      now.setDate(dayOfMonth + 7);
    }
    var nowDayOfWeek = now.getDay();
    var nowDay = now.getDate();
    var nowMonth = now.getMonth();
    var nowYear = now.getYear();
    nowYear += (nowYear < 2000) ? 1900 : 0;
    var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek);
    var weekEndDate = new Date(nowYear, nowMonth, nowDay + (6 - nowDayOfWeek));
    return ("(" + formatDate(weekStartDate) + " ~ " + formatDate(weekEndDate) + ")");
  }

  return (
    <Card className={styles.root}>
      <QueueArim type={['right', 'left']} interval={[200, 300]}
        delay={[0, 1000]} duration={[3000, 5000]}
        ease={['easeOutBack', 'easeInOutCirc']} leaveReverse>
        <Box key='1' border={2} borderRadius={5} className={styles.paper}>
          <p style={{ fontSize: 30, marginTop: 10, marginLeft: 10, marginBottom: 20 }}>구독 중인 목록 <span style={{ fontSize: 20, color: 'red' }}>{printWeek(true)}</span></p>
          <Box border={2} borderRadius={5} className={styles.paper} style={{ marginBottom: 50, paddingBottom: 0 }}>
            {!!subscribe && subscribe.length > 0 ? <Carousel imgList={subscribe} ></Carousel> :
              <div style={{ width: '100%', textAlign: 'left', position: 'relative' }}>
                <div style={{ display: 'inline-block', marginLeft: '30%' }}>
                  <img alt="" src={Subs} width='120' height='100' />
                  <span style={{
                    fontSize: 50, textAlign: 'center', display: 'inline',
                    position: 'absolute', top: '13px'
                  }}>정보가 없습니다...</span>
                </div>
              </div>}
          </Box>
          <p style={{ fontSize: 30, marginTop: 10, marginLeft: 10, marginBottom: 20 }}>구독 예정 목록 <span style={{ fontSize: 20, color: 'red' }}>{printWeek(false)}</span></p>
          <Box key='2' border={2} borderRadius={5} className={styles.paper} style={{ paddingBottom: 0 }}>
            {!!nextSubscribe && nextSubscribe.length > 0 ? <Carousel imgList={nextSubscribe} deleteBtn={handleImgDelete} type='delete'></Carousel> :
              <div style={{ width: '100%', textAlign: 'left', position: 'relative' }}>
                <div style={{ display: 'inline-block', marginLeft: '30%' }}>
                  <img alt="" src={Subs} width='120' height='100' />
                  <span style={{
                    fontSize: 50, textAlign: 'center', display: 'inline',
                    position: 'absolute', top: '13px'
                  }}>정보가 없습니다...</span>
                </div>
              </div>}
          </Box>
        </Box>
      </QueueArim>
    </Card>
  );
}
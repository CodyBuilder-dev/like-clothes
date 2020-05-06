import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import {
  Card, CardContent, Box, Grid, Divider, ListItem, ListItemAvatar,
  Button, Avatar, Table, TableCell, TableContainer, TableHead, TableRow,
} from '@material-ui/core';
import { LocalShipping, FavoriteRounded } from '@material-ui/icons'
import Carousel from '../components/Carousel';
import { clothesdetailjsx } from '../css/useStyles'
import QueueArim from 'rc-queue-anim';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const baseUrl = process.env.REACT_APP_URL
const baseAIUrl = process.env.REACT_APP_AI_URL
const config = { "headers": { "Authorization": localStorage.token } }
const headers = { "Authorization": localStorage.token }

export default function ClothesDetail(props) {
  // 현재페이지 옷 id 가져오기
  const search = props.location.search;
  const params = new URLSearchParams(search);
  const item_id = params.get('clothes_item_id');

  // 구독 날짜 관련
  const today = new Date();
  today.setDate(today.getDate() + 7 - today.getDay())
  const year = today.getFullYear();
  let month = today.getMonth() + 1;
  month = month < 10 ? '0' + month : month;
  let date = today.getDate();
  date = date < 10 ? '0' + date : date;
  const nowDate = `${year}-${month}-${date}`


  const styles = clothesdetailjsx();
  const [item, setItem] = useState({});
  const [recommendImg, setRecommendImg] = useState([]);
  const [bestImg, setBestImg] = useState([]);
  const [worstImg, setWorstImg] = useState([]);

  useEffect(() => {
    const url = baseUrl + `/clothes/clothes-item?clothes_item_id=${item_id}`;
    axios.get(url, config).then((res) => {
      if (!!res.data.clothes_info) {
        setItem(res.data);
      } else {
        alert('미안해욧ㅠㅠ 메인페이지로 이동해욧');
        window.location.href="/";
      }
      return res.data;
    })
      .then((res) => {
        const setUrl = baseAIUrl + '/recommand/set';
        axios.post(setUrl, {
          "img_url": res.clothes_info[0].img,
          "img_id": res.clothes_info[0].clothes_id
        }).then((res) => {
          const recomImg = Object.keys(res.data.best_images).map((key) => ({
            id: key,
            img: res.data.best_images[key]
          }))
          setRecommendImg(recomImg);
        })

        const featureUrl = baseAIUrl + '/recommand/feature';
        axios.post(featureUrl, {
          "img_url": res.clothes_info[0].img,
          "img_id": res.clothes_info[0].clothes_id
        }).then((res) => {
          const bestImg = Object.keys(res.data.best_images).map((key) => ({
            id: key,
            img: res.data.best_images[key]
          }))
          const worstImg = Object.keys(res.data.worst_images).map((key) => ({
            id: key,
            img: res.data.worst_images[key]
          }))
          setBestImg(bestImg);
          setWorstImg(worstImg);
        })
      })
  }, [item_id])

  const subscriptButtonClick = () => {
    const url = baseUrl + '/clothes-resv'
    const params = { "clothes_item_id": item_id, "reserved_date": nowDate }
    axios.post(url, params, config)
      .then((res) => {
        if (res.data === 'You\'re not logged in') {
          alert('로그인 해주세요 >_')
        } else if (res.data === 'success') {
          alert('구독하셨어욧')
          props.history.replace(`?clothes_item_id=${item_id}`)
        }
      })
  }

  const wishButtonClick = () => {
    const url = baseUrl + '/clothes/wish-list'
    const params = { "clothes_item_id": item_id }
    axios.post(url, params, config)
      .then((res) => {
        if (res.data === 'You\'re not logged in') {
          alert('로그인 해주세요 >_')
        } else if (res.data.status === 'success') {
          alert('위시리스트에 추가되었어욧')
          // props.history.replace(`?clothes_item_id=${item_id}`)
          window.location.reload();
        }
      })
  }

  const wishDeleteButtonClick = () => {
    const url = baseUrl + '/clothes/wish-list'
    const params = { "clothes_item_id": item_id }
    axios.delete(url, { headers, data: params })
      .then((res) => {
        if (res.data === 'You\'re not logged in') {
          alert('로그인 해주세요 >_')
        } else if (res.data.state === 'success') {
          alert('위시리스트에서 제거되었어욧')
          window.location.reload();
        }
      })
  }

  return (
    <Card className={styles.root}>
      <QueueArim type={['right', 'left']} interval={[200, 300]}
        delay={[0, 1000]} duration={[3000, 5000]}
        ease={['easeOutBack', 'easeInOutCirc']} leaveReverse>
        <Box key='1' border={2} borderRadius={5} className={styles.paper}>
          <Grid container spacing={1}>
            <Grid item md={5} sm={12}>
              {item.clothes_info && <img alt="" src={item.clothes_info[0].img} width="100%" />}
              <CardContent>
                <p style={{ color: 'black' }}>상품명</p>
                <p style={{ color: 'black' }}><Box fontWeight="fontWightBold" fontSize={25}>
                  {item.clothes_info && item.clothes_info[0].brand} {item.clothes_info && item.clothes_info[0].code_name}
                </Box></p>
                <p><Box fontWeight="fontWightBold" fontSize={13}>
                  {item.clothes_info && `${item.clothes_info[0].major} > ${item.clothes_info[0].middle} > ${item.clothes_info[0].minor}`}
                </Box></p>
              </CardContent>
            </Grid>
            <Divider orientation="vertical" flexItem style={{ margin: 30 }} />
            <Grid item md={6} sm={12} justify="center">
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <p style={{ color: 'black' }}><Box fontWeight="fontWightBold" fontSize={30} style={{ marginTop: 10 }}>
                    상품 정보
                    </Box></p>
                  <Divider style={{ margin: 20, marginLeft: 0, marginRight: 0 }} />
                  <p style={{ color: 'black' }}>상품 태그</p>
                  <p>
                    {item.clothes_tags &&
                      (item.clothes_tags[0].tag === null ? '이 옷에는 아직 태그가 없어욧' :
                        item.clothes_tags.map((clothes_tag) => {
                          return clothes_tag.tag + ' '
                        }))}
                  </p>
                  <Divider style={{ margin: 20, marginLeft: 0, marginRight: 0 }} />
                  <p style={{ color: 'black' }}>
                    상품 상세정보
                  </p>
                  <TableContainer style={{ padding: 0, marginBottom: 10 }}>
                    <Table className={styles.table} size="small">
                      <TableHead>
                        <TableRow>
                          <StyledTableCell align="left">Brand</StyledTableCell>
                          <StyledTableCell align="left">CodeName</StyledTableCell>
                          <StyledTableCell align="left">Color</StyledTableCell>
                          <StyledTableCell align="left">Season</StyledTableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell align="left">{item.clothes_info && item.clothes_info[0].brand}</TableCell>
                          <TableCell align="left">{item.clothes_info && item.clothes_info[0].code_name}</TableCell>
                          <TableCell align="left">{item.clothes_info && item.clothes_info[0].color}</TableCell>
                          <TableCell align="left">{item.clothes_info && item.clothes_info[0].season}</TableCell>
                        </TableRow>
                      </TableHead>
                    </Table>
                  </TableContainer>
                  <p style={{ color: 'black' }}>
                    상품 사이즈
                  </p>
                  <TableContainer style={{ padding: 0, marginBottom: 10 }}>
                    <Table className={styles.table} size="small">
                      <TableHead>
                        <TableRow>
                          <StyledTableCell>사이즈(Size)</StyledTableCell>
                          <StyledTableCell>총장(Length)</StyledTableCell>
                          <StyledTableCell>어깨(Shoulder)</StyledTableCell>
                          <StyledTableCell>허리(Waist)</StyledTableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell align="left">{item.clothes_info && item.clothes_info[0].size}</TableCell>
                          <TableCell align="center">{item.clothes_info && item.clothes_info[0].length}</TableCell>
                          <TableCell align="center">{item.clothes_info && item.clothes_info[0].shoulder}</TableCell>
                          <TableCell align="center">{item.clothes_info && item.clothes_info[0].waist}</TableCell>
                        </TableRow>
                      </TableHead>
                    </Table>
                  </TableContainer>
                  <p style={{ color: 'black' }}>
                    상세 설명
                  </p>
                  <p style={{ marginLeft: 10 }}>
                    {item.clothes_info &&
                      item.clothes_info[0].description ? item.clothes_info[0].description : '이 옷의 상세 설명이 없어욧'}
                  </p>
                  <Divider style={{ margin: 20, marginLeft: 0, marginRight: 0 }} />
                  <p style={{ color: 'black' }}>
                    판매자 정보
                  </p>
                  <Box style={{ marginLeft: 0 }}>
                    {item.clothes_info &&
                      <NavLink to={`/closet?user_email=${item.clothes_info[0].owner_email}`}
                        style={{ textDecoration: 'none' }}>
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar src={item.clothes_info[0].profile_img}>
                            </Avatar>
                          </ListItemAvatar>
                          <span>{item.clothes_info[0].nickname}</span>
                        </ListItem>
                      </NavLink>}
                  </Box>
                  <Divider style={{ margin: 20, marginLeft: 0, marginRight: 0 }} />
                  <Grid container spacing={1}>
                    <Grid item sm={6} xs={12}>
                      {item.clothes_info &&
                        <Button variant="contained" size="medium" color="primary" className={styles.button}
                          onClick={subscriptButtonClick}>
                          <LocalShipping style={{ marginRight: 20 }} />
                          구독해욧
                        </Button>}
                    </Grid>
                    <Grid item sm={6} xs={12}>
                      {item.clothes_info &&
                        <Button variant="contained" size="medium" color={item.clothes_info[0].in_wishlist === "true" ? "grey" : "secondary"} className={styles.button}
                          onClick={item.clothes_info[0].in_wishlist === "true" ? wishDeleteButtonClick : wishButtonClick}>
                          <FavoriteRounded style={{ marginRight: 20 }} />
                          {item.clothes_info[0].in_wishlist === "true" ? '안 좋아욧' : '좋아욧'}
                        </Button>}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Divider style={{ marginTop: 50, marginBottom: 30, marginLeft: 0, marginRight: 0 }} />
          <p style={{ color: 'black' }}><Box fontWeight="fontWightBold" fontSize={30} style={{ marginBottom: 40 }}>
            추천 서비스
                    </Box></p>

          <Box border={2} borderRadius={5} className={styles.paper} style={{ marginBottom: 20, paddingBottom: 0 }}>
            <p style={{ fontSize: 25, marginTop: 10, marginLeft: 10 }}>이 옷과 유사한 욧's 추천!</p>
            {bestImg.length > 0 ? <Carousel imgList={bestImg}></Carousel> : null}
          </Box>
          <Box border={2} borderRadius={5} className={styles.paper} style={{ marginBottom: 20, paddingBottom: 0 }}>
            <p style={{ fontSize: 25, marginTop: 10, marginLeft: 10 }}>이 옷이랑 코디 어때요?</p>
            {recommendImg.length > 0 ? <Carousel imgList={recommendImg}></Carousel> : null}
          </Box>
          <Box border={2} borderRadius={5} className={styles.paper} style={{ paddingBottom: 0 }}>
            <p style={{ fontSize: 25, marginTop: 10, marginLeft: 10 }}>혹시.. 이런 스타일은 어떠신지..</p>
            {worstImg.length > 0 ? <Carousel imgList={worstImg}></Carousel> : null}
          </Box>
        </Box>
      </QueueArim>
    </Card >
  );
}